import { Column, Entity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { AppDataSource } from '@src/config/data-source';

export enum BannerStatus {
	DRAFT = 'draft',
	REVIEW = 'review',
	PUBLISHED = 'published',
	ARCHIVED = 'archived',
}

@Entity({ name: 'banners' })
export class Banner extends BaseEntity {
	@Column({ type: 'varchar', length: 255 })
	bannerImage!: string;


	@Column({ type: 'varchar', length: 255, nullable: true })
	mobileBanner?: string;

	@Column({ type: 'varchar', length: 150 })
	bannerTitle!: string;

	@Column({ type: 'text', nullable: true })
	bannerDescription?: string;

	@Column({ type: 'varchar', length: 100, nullable: true })
	bannerBtn?: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	bannerLink?: string;

	@Column({ type: 'enum', enum: BannerStatus, default: BannerStatus.DRAFT })
	status!: BannerStatus;

	@Column({ type: 'int' })
	order!: number;

	@BeforeInsert()
	@BeforeUpdate()
	async handleOrder(): Promise<void> {
		const repo = AppDataSource.getRepository(Banner);

		if (!this.order) {
			const maxOrder = await repo
				.createQueryBuilder('banner')
				.select('MAX(banner.order)', 'max')
				.getRawOne();

			this.order = (maxOrder?.max ?? 0) + 1;
			return;
		}

		const existingBanner = await repo.findOne({ where: { order: this.order } });

		if (existingBanner && existingBanner.id !== this.id) {
			await repo
				.createQueryBuilder()
				.update(Banner)
				.set({ order: () => `"order" + 1` })
				.where('"order" >= :order', { order: this.order })
				.execute();
		}
	}
}
