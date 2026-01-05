import { Router } from 'express';
import { container } from 'container/index';
import { OurProductController } from '@src/controller';
import { INTERFACE_TYPE } from '@src/types';

const userRoutes = Router();

const ourProductController = container.get<OurProductController>(
	INTERFACE_TYPE.OurProductController
);

userRoutes
	.route('/')
	.get(ourProductController.getProduct.bind(ourProductController));

userRoutes
	.route('/:id')
	.get(ourProductController.getUserProductById.bind(ourProductController))

export default userRoutes;
