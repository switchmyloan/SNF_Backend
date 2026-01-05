import { Router } from 'express';
import { container } from 'container/index';
import { FaqController } from '@src/controller';
import { INTERFACE_TYPE } from '@src/types';

const userRoutes = Router();

const faqController = container.get<FaqController>(
	INTERFACE_TYPE.FaqController
);

userRoutes.route('/').get(faqController.getFaqs.bind(faqController));

userRoutes
	.route('/featured')
	.get(faqController.getFeaturedFaqs.bind(faqController));

	userRoutes
	.route('/category/:categoryId')
	.get(faqController.getFaqsByCategory.bind(faqController));

export default userRoutes;
