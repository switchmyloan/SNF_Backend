import { Check, Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

@Index(['order'])
@Index(['createdAt'])
@Index(['isActive'])
@Check(`"rating" >= 1 AND "rating" <= 5`)
@Entity({ name: 'testimonials' })
export class Testimonial extends BaseEntity {
	@Column({ type: 'varchar', length: 100, nullable: false })
	name!: string;

	@Column({ type: 'varchar', length: 100, nullable: false })
	designation!: string;

	@Column({ type: 'varchar', length: 100, nullable: false })
	company!: string;

	@Column({ type: 'text', nullable: false })
	testimonial!: string;

	@Column({ type: 'varchar', nullable: false })
	image!: string;

	@Column({ type: 'int', default: 0 })
	order!: number;

	@Column({ type: 'boolean', default: true })
	isActive!: boolean;

	@Column({
		type: 'decimal',
		precision: 2,
		scale: 1,
		nullable: false,
		default: 5.0,
	})
	rating!: number;
}
