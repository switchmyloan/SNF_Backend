import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Faq } from './faq.entity';
import { Blog } from './blog.entity';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
	@Column({ type: 'varchar', length: 100, nullable: false })
	name!: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	description?: string;

	@OneToMany(() => Faq, (faq) => faq.category_xid, { nullable: true })
	faqs?: Faq[];

	@ManyToMany(() => Blog, (blog) => blog.categories)
	blogs!: Blog[];
}
