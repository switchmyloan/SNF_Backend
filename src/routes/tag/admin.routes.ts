import { Router } from 'express';
import { container } from 'container/index';
import { TagController } from '@src/controller';
import { INTERFACE_TYPE } from '@src/types';

const adminRoutes = Router();

const tagController = container.get<TagController>(
	INTERFACE_TYPE.TagController
);

adminRoutes
	.route('/')
	.post(tagController.createTags.bind(tagController))
	.get(tagController.getTags.bind(tagController));

adminRoutes
	.route('/:id')
	.get(tagController.getTagById.bind(tagController))
	.delete(tagController.deleteTagById.bind(tagController));

adminRoutes
	.route('/name/:name')
	.get(tagController.getTagByName.bind(tagController))
	.delete(tagController.deleteTagByName.bind(tagController));

export default adminRoutes;
