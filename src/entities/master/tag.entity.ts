import { Column, Entity, Index, ManyToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Blog } from './blog.entity';

@Entity({ name: 'tags' })
export class Tag extends BaseEntity {
	@Index({ unique: true })
	@Column({ type: 'varchar', length: 100 })
	name!: string; // clearer than 'tag'

	@Column({ type: 'text', nullable: true })
	description?: string;

	@ManyToMany(() => Blog, (blog) => blog.tags)
	blogs!: Blog[];
}
