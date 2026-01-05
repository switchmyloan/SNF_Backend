import { Router } from 'express';
import { container } from 'container/index';
import { uploader } from '@src/middleware/uploader';
import { INTERFACE_TYPE } from '@src/types';
import { BannerController } from '@src/controller';

const upload = uploader('banner', ['image/jpeg', 'image/png']);

const adminRoutes = Router();

const bannerController = container.get<BannerController>(
	INTERFACE_TYPE.BannerController
);

adminRoutes
	.route('/')
	.post(
		upload.fields([
			{ name: 'bannerImage', maxCount: 1 },
			{ name: 'mobileBanner', maxCount: 1 },
		]),
		bannerController.create.bind(bannerController)
	)
	.get(bannerController.getBanners.bind(bannerController));

adminRoutes
	.route('/:id')
	.get(bannerController.getBannerById.bind(bannerController))
	.patch(
		upload.fields([
			{ name: 'bannerImage', maxCount: 1 },
			{ name: 'mobileBanner', maxCount: 1 },
		]),
		bannerController.updateBanner.bind(bannerController)
	)
	.delete(bannerController.deleteBanner.bind(bannerController));

export default adminRoutes;
