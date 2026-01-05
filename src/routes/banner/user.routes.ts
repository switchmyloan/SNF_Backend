import { INTERFACE_TYPE } from '@src/types/inversify.types';
import { Router } from 'express';
import { container } from 'container/index';
import { BannerController } from '@src/controller';

const userRoutes = Router();

const bannerController = container.get<BannerController>(
	INTERFACE_TYPE.BannerController
);

userRoutes
	.route('/')
	.get(bannerController.getActiveBanners.bind(bannerController));

export default userRoutes;
