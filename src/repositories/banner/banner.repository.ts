import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { AppDataSource } from '@src/config/data-source';
import { ApiError } from '@src/utils';
import { Banner, BannerStatus } from '@src/entities/master/banner.entity';
import { IBannerRepository } from '@src/interfaces/repository/IBannerRepository';

@injectable()
export class BannerRepository implements IBannerRepository {
	private readonly bannerRepository: Repository<Banner>;

	constructor() {
		this.bannerRepository = AppDataSource.getRepository(Banner);
	}

	async create(data: Partial<Banner>): Promise<Banner> {
		const banner = this.bannerRepository.create(data);
		return await this.bannerRepository.save(banner);
	}

	async update(id: number, data: Partial<Banner>): Promise<Banner> {
		const existingBanner = await this.bannerRepository.findOne({
			where: { id },
		});
		if (!existingBanner) {
			throw new ApiError(404, `Banner with ID ${id} not found`);
		}
		Object.assign(existingBanner, data);
		return await this.bannerRepository.save(existingBanner);
	}

	async getById(id: number): Promise<Banner | null> {
		return await this.bannerRepository.findOne({ where: { id } });
	}

	async delete(id: number): Promise<void> {
		const result = await this.bannerRepository.delete(id);
		if (result.affected === 0) {
			throw new ApiError(404, `Banner with ID ${id} not found`);
		}
	}

	async findAll(
		limit?: number,
		offset?: number
	): Promise<{ rows: Banner[]; totalCount: number }> {
		const [rows, totalCount] = await this.bannerRepository.findAndCount({
			take: limit,
			skip: offset,
			order: { id: 'DESC' },
		});
		return { rows, totalCount };
	}

	async count(): Promise<number> {
		return await this.bannerRepository.count();
	}

	async findActive(): Promise<Banner[]> {
		return await this.bannerRepository.find({
			select:{
				bannerImage : true,
				id: true,
				bannerLink: true,
				bannerTitle: true,
				bannerBtn: true,
				mobileBanner: true

			},
			where: {
				isActive: true,
				status: BannerStatus.PUBLISHED,
			},
			order: {
				order: 'ASC',
			},
		});
	}
}
