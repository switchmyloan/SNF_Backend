import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { ApiResponse, AsyncHandler } from '@src/utils';
import { INTERFACE_TYPE } from '@src/types';
import { IBannerInteractor } from '@src/interfaces';

@injectable()
export class BannerController {
	private bannerInteractor: IBannerInteractor;

	constructor(
		@inject(INTERFACE_TYPE.BannerInteractor)
		bannerInteractor: IBannerInteractor
	) {
		this.bannerInteractor = bannerInteractor;
	}

	@AsyncHandler()
	async getBanners(req: Request, res: Response): Promise<void> {
		const { perPage = '10', currentPage = '1' } = req.query;

		const limit = Math.max(Number(perPage), 1);
		const page = Math.max(Number(currentPage), 1);
		const offset = (page - 1) * limit;

		const { rows, totalCount } = await this.bannerInteractor.getBanners(
			limit,
			offset
		);

		res.status(200).json(
			new ApiResponse(
				200,
				{
					rows,
					pagination: {
						total: totalCount,
						perPage: limit,
						currentPage: page,
						totalPages: Math.ceil(totalCount / limit),
					},
				},
				'Bannners retrieved successfully'
			)
		);
	}

	@AsyncHandler()
	async getBannerById(req: Request, res: Response) {
		const { id } = req.params;
		const banner = await this.bannerInteractor.getByIdBanner(Number(id));
		res
			.status(200)
			.json(new ApiResponse(200, banner, 'Banner retrieved successfully'));
	}

	// @AsyncHandler()
	// async create(req: Request, res: Response) {
	// 	const data = req.body;
	// 	const file = req.file as Express.Multer.File;
	// 	const isActive =
	// 		data.isActive === true || String(data.isActive).toLowerCase() === 'true';
	// 	const newBanner = await this.bannerInteractor.createBanner(
	// 		{ ...data, isActive },
	// 		file
	// 	);
	// 	res
	// 		.status(201)
	// 		.json(new ApiResponse(201, newBanner, 'Banner created successfully'));
	// }

	@AsyncHandler()
	async create(req: Request, res: Response) {
		const data = req.body;
		const files = req.files as {
			bannerImage?: Express.Multer.File[];
			mobileBanner?: Express.Multer.File[];
		};

		const bannerFile = files?.bannerImage?.[0];
		const mobileFile = files?.mobileBanner?.[0];

		const newBanner = await this.bannerInteractor.createBanner(
			data,
			bannerFile,
			mobileFile
		);

		res
			.status(201)
			.json(new ApiResponse(201, newBanner, 'Banner created successfully'));
	}

	// @AsyncHandler()
	// async updateBanner(req: Request, res: Response) {
	// 	const { id } = req.params;
	// 	const data = req.body;
	// 	const isActive =
	// 		data.isActive === true || String(data.isActive).toLowerCase() === 'true';

	// 	const file = req.file as Express.Multer.File;
	// 	const updatedBanner = await this.bannerInteractor.updateBanner(
	// 		Number(id),
	// 		{ ...data, isActive },
	// 		file
	// 	);
	// 	res
	// 		.status(200)
	// 		.json(new ApiResponse(200, updatedBanner, 'Author updated successfully'));
	// }

	@AsyncHandler()
	async updateBanner(req: Request, res: Response) {
		const { id } = req.params;
		const data = req.body;
		const files = req.files as {
			bannerImage?: Express.Multer.File[];
			mobileBanner?: Express.Multer.File[];
		};
		if (data.isActive !== undefined) {
			data.isActive =
				data.isActive === true ||
				String(data.isActive).toLowerCase() === 'true';
		}


		const bannerFile = files?.bannerImage?.[0];
		const mobileFile = files?.mobileBanner?.[0];

		const updatedBanner = await this.bannerInteractor.updateBanner(
			Number(id),
			data,
			bannerFile,
			mobileFile
		);

		res
			.status(200)
			.json(new ApiResponse(200, updatedBanner, 'Banner updated successfully'));
	}

	@AsyncHandler()
	async deleteBanner(req: Request, res: Response) {
		const { id } = req.params;
		await this.bannerInteractor.deleteBanner(Number(id));
		res
			.status(200)
			.json(new ApiResponse(200, {}, 'Banner Deleted successfully'));
	}

	@AsyncHandler()
	async getActiveBanners(req: Request, res: Response): Promise<void> {
		const banners = await this.bannerInteractor.getActiveBanners();

		res
			.status(200)
			.json(
				new ApiResponse(200, banners, 'Active banners retrieved successfully')
			);
	}
}
