import { INTERFACE_TYPE } from '@src/types';
import { Router } from 'express';
import { container } from 'container/index';
import { TagController } from '@src/controller';

const userRoutes = Router();

const tagController = container.get<TagController>(
	INTERFACE_TYPE.TagController
);

userRoutes.route('/').get(tagController.getTags.bind(tagController));

export default userRoutes;
