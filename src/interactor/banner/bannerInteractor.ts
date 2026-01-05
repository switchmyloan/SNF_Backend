import { injectable, inject } from 'inversify';
import { ApiError } from '@src/utils';
import { IBannerInteractor } from '@src/interfaces/interactor/IBannerInteractor';
import { IBannerRepository } from '@src/interfaces/repository/IBannerRepository';
import { Banner } from '@src/entities/master/banner.entity';
import { INTERFACE_TYPE } from '@src/types/inversify.types';

@injectable()
export class BannerInteractor implements IBannerInteractor {
	private repository: IBannerRepository;

	constructor(
		@inject(INTERFACE_TYPE.BannerRepository)
		repository: IBannerRepository
	) {
		this.repository = repository;
	}

	// async createBanner(
	// 	data: Partial<Banner>,
	// 	file?: Express.Multer.File
	// ): Promise<Banner> {
	// 	if (file) {
	// 		data.bannerImage = `/public/banner/${file.filename}`;
	// 	}
	// 	return await this.repository.create(data);
	// }

	async createBanner(
		data: Partial<Banner>,
		bannerFile?: Express.Multer.File,
		mobileFile?: Express.Multer.File
	): Promise<Banner> {
		if (bannerFile) {
			data.bannerImage = `/public/banner/${bannerFile.filename}`;
		}

		if (mobileFile) {
			data.mobileBanner = `/public/banner/${mobileFile.filename}`;
		}

		return await this.repository.create(data);
	}

	// async updateBanner(
	// 	id: number,
	// 	data: Partial<Banner>,
	// 	file?: Express.Multer.File
	// ): Promise<Banner> {
	// 	const existing = await this.repository.getById(id);
	// 	if (!existing) {
	// 		throw new ApiError(200, `Banner with ID ${id} not found`);
	// 	}

	// 	if (file) {
	// 		data.bannerImage = `/public/banner/${file.filename}`;
	// 	} else {
	// 		data.bannerImage = existing.bannerImage;
	// 	}
	// 	return await this.repository.update(id, data);
	// }

	async updateBanner(
		id: number,
		data: Partial<Banner>,
		bannerFile?: Express.Multer.File,
		mobileFile?: Express.Multer.File
	): Promise<Banner> {
		const banner = await this.repository.getById(id);
		if (!banner) {
			throw new ApiError(404, 'Banner not found');
		}

		if (bannerFile) {
			data.bannerImage = `/public/banner/${bannerFile.filename}`;
		}

		if (mobileFile) {
			data.mobileBanner = `/public/banner/${mobileFile.filename}`;
		}

		return await this.repository.update(id, data);
	}

	async getBanners(
		limit: number,
		offset: number
	): Promise<{ rows: Banner[]; totalCount: number }> {
		const { rows, totalCount } = await this.repository.findAll(limit, offset);
		return { rows, totalCount };
	}

	async getByIdBanner(id: number): Promise<Banner | null> {
		return await this.repository.getById(id);
	}

	async deleteBanner(id: number): Promise<void> {
		const banner = await this.repository.getById(id);
		if (!banner) {
			throw new ApiError(404, `Banner with ID ${id} not found`);
		}
		await this.repository.delete(id);
	}

	async getActiveBanners(): Promise<Banner[]> {
		return await this.repository.findActive();
	}
}
