import { Router } from 'express';
import { container } from 'container/index';
import { CategoryController } from '@src/controller';
import { INTERFACE_TYPE } from '@src/types';

const userRoutes = Router();

const categoryController = container.get<CategoryController>(
	INTERFACE_TYPE.CategoryController
);

userRoutes
	.route('/')
	.get(categoryController.getCategories.bind(categoryController));

export default userRoutes;
