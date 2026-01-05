import { AppDataSource } from './../../config/data-source';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { LenderFeature } from './lenderFeatures.entity';

@Entity({ name: 'lenders' })
export class Lender extends BaseEntity {
	@Column({ length: 100 })
	name!: string;

	@Column({ length: 255, nullable: true })
	slug!: string;

	@Column({ nullable: true, length: 255 })
	description!: string;

	@Column({ nullable: true, length: 255 })
	logo!: string;

	@Column({ nullable: true, length: 255 })
	website!: string;

	@Column({ nullable: true, length: 255 })
	playStoreLink!: string;

	@Column({ nullable: true, length: 255 })
	appStoreLink!: string;

	// About lender information
	@Column({ nullable: true, length: 255 })
	startingInterestRate!: string;

	@Column({ nullable: true, length: 255 })
	maximumLoanAmount!: string;

	@Column({ nullable: true, length: 255 })
	minimumLoanAmount!: string;

	@Column({ nullable: true, length: 255 })
	maximumTenure!: string;

	@Column({ nullable: true, length: 255 })
	minimumTenure!: string;

	@Column({ nullable: true, length: 255 })
	processingFee!: string;

	@Column({ nullable: true, length: 255 })
	prepaymentCharges!: string;

	@Column({ nullable: true, length: 255 })
	latePaymentCharges!: string;

	@Column({ nullable: true, length: 255 })
	foreclosureCharges!: string;

	@Column({ nullable: true, length: 255 })
	eligibilityCriteria!: string;

	@Column({ nullable: true, length: 255 })
	customerSupportNumber!: string;

	@Column({ nullable: true, length: 255 })
	customerSupportEmail!: string;

	@Column({ nullable: true, length: 255 })
	termsAndConditionsLink!: string;

	@Column({ nullable: true, length: 255 })
	privacyPolicyLink!: string;

	@Column({ nullable: true, length: 255 })
	faqLink!: string;

	@Column({ nullable: true, length: 255 })
	aboutUsLink!: string;

	// Our Analysis
	@Column({})
	sortedOrder!: number;

	@Column({ default: 0 })
	totalLeads!: number;

	@Column({ default: 0 })
	successLeads!: number;

	@Column({ default: 0 })
	rejectLeads!: number;

	@Column({ default: 0 })
	dedupeLeads!: number;

	@Column({ name: 'product_xid', nullable: true })
	product_xid!: number;

	@Column({ type: 'boolean', default: false })
	status!: boolean;

	@OneToMany(() => LenderFeature, (feature) => feature.lender, {
		cascade: true,
	})
	features?: LenderFeature[];

	@BeforeInsert()
	async handleSortedOrderInsert() {
		const repo = AppDataSource.getRepository(Lender);

		if (this.sortedOrder === undefined || this.sortedOrder === null) {
			// Set to max sortedOrder + 1
			const max = await repo
				.createQueryBuilder('lender')
				.select('MAX(lender.sortedOrder)', 'max')
				.getRawOne();

			this.sortedOrder = (Number(max?.max) || 0) + 1;
		} else {
			// Shift other records (>= sortedOrder) down by 1
			await repo
				.createQueryBuilder()
				.update(Lender)
				.set({ sortedOrder: () => `"sortedOrder" + 1` })
				.where(`"sortedOrder" >= :order`, { order: this.sortedOrder })
				.execute();
		}
	}

	@BeforeInsert()
	async setSlug() {
		if (!this.slug) {
			this.slug = this.name
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-|-$/g, '');
		}
	}

	private oldSortedOrder!: number;

	@BeforeUpdate()
	async handleSortedOrderUpdate() {
		const repo = AppDataSource.getRepository(Lender);

		const existing = await repo.findOneBy({ id: this.id });
		if (!existing) return;

		this.oldSortedOrder = existing.sortedOrder;

		if (this.oldSortedOrder === this.sortedOrder) return;

		if (this.oldSortedOrder < this.sortedOrder) {
			// Moving DOWN → shift others UP
			await repo
				.createQueryBuilder()
				.update(Lender)
				.set({ sortedOrder: () => `"sortedOrder" - 1` })
				.where(`"sortedOrder" > :oldOrder AND "sortedOrder" <= :newOrder`, {
					oldOrder: this.oldSortedOrder,
					newOrder: this.sortedOrder,
				})
				.execute();
		} else {
			// Moving UP → shift others DOWN
			await repo
				.createQueryBuilder()
				.update(Lender)
				.set({ sortedOrder: () => `"sortedOrder" + 1` })
				.where(`"sortedOrder" >= :newOrder AND "sortedOrder" < :oldOrder`, {
					oldOrder: this.oldSortedOrder,
					newOrder: this.sortedOrder,
				})
				.execute();
		}
	}
}
