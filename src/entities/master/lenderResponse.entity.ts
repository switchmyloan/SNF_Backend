import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Lender } from './lender.entity';

@Entity({ name: 'lender_responses' })
export class LenderResponse extends BaseEntity {
	@Column({ type: 'varchar', length: 255, nullable: true })
	message?: string;

	@Column({ type: 'varchar', length: 50, nullable: true })
	status?: string;

	@Column({ type: 'json', nullable: true })
	metadata?: object;

	@Column({ type: 'date', default: () => "CURRENT_DATE + interval '30 days'" })
	expiryDate!: string;

	@Column({ type: 'boolean', default: false })
	isClicked!: boolean;

	@Column({ type: 'varchar', length: 50, nullable: true })
	offerLoan?: string;

	@Column({ type: 'varchar', length: 50, nullable: true })
	tenure?: string;

	@Column({ type: 'varchar', length: 500, nullable: true })
	redirectLink?: string;

	// Foreign keys
	@Column({ name: 'lead_xid', type: 'int', nullable: true })
	lead_xid?: number;

	@Column({ name: 'lender_xid', type: 'int', nullable: true })
	lender_xid?: number;

	@Column({ type: 'boolean', default: false })
	isOffer!: boolean;

	@ManyToOne(() => Lender, { nullable: true })
	@JoinColumn({ name: 'lender_xid' })
	lender?: Lender;
}
