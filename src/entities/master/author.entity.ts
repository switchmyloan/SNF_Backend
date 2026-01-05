import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

@Entity({ name: 'authors' })
export class Author extends BaseEntity {
	@Index({ unique: true }) // enforce unique author name
	@Column({ type: 'varchar', length: 150 })
	name!: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	profileImageUrl?: string;

	@Column({ type: 'varchar', length: 100, nullable: true })
	designation?: string;

	@Column({ type: 'text', nullable: true })
	socialLink?: string;

	@Column({ type: 'text', nullable: true })
	description?: string;
}
