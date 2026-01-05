import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Category } from './category.entity';

@Entity({ name: 'faqs' })
export class Faq extends BaseEntity {
	@Column({ type: 'varchar', length: 255, nullable: false })
	question!: string;

	@Column({ type: 'varchar', length: 300, nullable: false })
	answer!: string;

	@Column({ type: 'boolean', default: false })
	isFeatured!: boolean;

	@Column({ name: 'category_xid', nullable: true })
	category_xid?: number;

	@ManyToOne(() => Category, { nullable: true })
	@JoinColumn({ name: 'category_xid' })
	category!: Category;
}
