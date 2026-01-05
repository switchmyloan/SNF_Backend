import { Banner } from "../../entities/master/banner.entity";


export interface IBannerInteractor {
	createBanner(
		data: Partial<Banner>,
		bannerFile?: Express.Multer.File,
		mobileFile?: Express.Multer.File
	): Promise<Banner>;
	updateBanner(
		id: number,
		data: Partial<Banner>,
		bannerFile?: Express.Multer.File,
		mobileFile?: Express.Multer.File
	): Promise<Banner>;
	getBanners(
		limit: number,
		offset: number
	): Promise<{ rows: Banner[]; totalCount: number }>;
	getByIdBanner(id: number): Promise<Banner | null>;
	deleteBanner(id: number): Promise<void>;
	getActiveBanners(): Promise<Banner[]>;
}
