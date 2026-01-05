import { Router } from 'express';
import { CategoryController } from '@src/controller';
import { INTERFACE_TYPE } from '@src/types';
import { container } from 'container/index';

const adminRoutes = Router();

const categoryController = container.get<CategoryController>(
	INTERFACE_TYPE.CategoryController
);

adminRoutes
	.route('/')
	.post(categoryController.createCategory.bind(categoryController))
	.get(categoryController.getCategories.bind(categoryController));

adminRoutes
	.route('/:id')
	.get(categoryController.getCategoryById.bind(categoryController))
	.patch(categoryController.updateCategory.bind(categoryController));

adminRoutes
	.route('/name/:name')
	.get(categoryController.getCategoryByName.bind(categoryController));

export default adminRoutes;
