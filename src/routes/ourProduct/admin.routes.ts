import { Router } from 'express';
import { container } from 'container/index';
import { OurProductController } from '@src/controller';
import { INTERFACE_TYPE } from '@src/types';

const adminRoutes = Router();

const ourProductController = container.get<OurProductController>(
	INTERFACE_TYPE.OurProductController
);

adminRoutes
	.route('/')
	.post(ourProductController.create.bind(ourProductController))
	.get(ourProductController.getProduct.bind(ourProductController))


    
adminRoutes
	.route('/:id')
	.get(ourProductController.getProductById.bind(ourProductController))
	.patch(ourProductController.updateProduct.bind(ourProductController));

export default adminRoutes;
