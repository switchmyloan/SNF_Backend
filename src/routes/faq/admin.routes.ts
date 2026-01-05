import { Router } from 'express';
import { container } from 'container/index';
import { FaqController } from '@src/controller';
import { INTERFACE_TYPE } from '@src/types';

const adminRoutes = Router();

const faqController = container.get<FaqController>(
	INTERFACE_TYPE.FaqController
);

adminRoutes
	.route('/')
	.post(faqController.create.bind(faqController))
	.get(faqController.getFaqs.bind(faqController));

adminRoutes
	.route('/:id')
	.get(faqController.getFaqById.bind(faqController))
	.patch(faqController.updateFaq.bind(faqController));

adminRoutes
	.route('/featured')
	.get(faqController.getFeaturedFaqs.bind(faqController));

adminRoutes

	.route('/category/:categoryId')
	.get(faqController.getFaqsByCategory.bind(faqController));

export default adminRoutes;
