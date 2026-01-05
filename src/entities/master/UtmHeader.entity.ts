import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { LoanApplication } from './loanApplications.entity';

@Entity({ name: 'UTM_Headers' })
export class UtmHeaders extends BaseEntity {
	@Column()
	utm_source!: string;

	@Column({ nullable: true })
	utm_medium!: string;

	@Column({nullable: true})
	utm_campaign!: string;

	@Column({ nullable: true })
	utm_link!: string;

	@Column({nullable: true})
	utm_affid!: string;

	@Column({ nullable: true })
	redirected_url!: string;

	// FK Column
	@Column({ name: 'lender_xid', nullable: true })
	lender_xid!: number;

	@Column({ name: 'channel_xid', nullable: true })
	channel_xid!: number;

	@Column({ name: 'campaign_xid', nullable: true })
	campaign_xid!: number;

	@Column({ name: 'lead_xid', nullable: true })
	lead_xid!: number;

	// Association
	@ManyToOne(() => LoanApplication, { nullable: true })
	@JoinColumn({ name: 'lead_xid' })
	loanApplication!: LoanApplication;

	@BeforeInsert()
	@BeforeUpdate()
	normalize() {
		this.utm_source = this.utm_source?.toLowerCase();
	}
}
