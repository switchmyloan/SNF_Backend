import { Router } from 'express';
import { container } from 'container/index';
import { AuthorController } from '@src/controller';
import { INTERFACE_TYPE } from '@src/types';

const userRoutes = Router();

const authorController = container.get<AuthorController>(
	INTERFACE_TYPE.AuthorController
);

userRoutes
	.route('/')
	.get(authorController.getAuthorsForUser.bind(authorController));

export default userRoutes;
