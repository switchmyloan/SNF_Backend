import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Lender } from './lender.entity';

@Entity({ name: 'lender_features' })
export class LenderFeature extends BaseEntity {
	@Column({ length: 255 })
	title!: string;

	@Column({ name: 'lender_xid', nullable: false })
	lender_xid!: number;

	@ManyToOne(() => Lender, { nullable: false, onDelete: 'CASCADE' })
	@JoinColumn({ name: 'lender_xid' })
	lender!: Lender;
}
