import { Router } from 'express';
import { container } from 'container/index';
import { BlogController } from '@src/controller';
import { INTERFACE_TYPE } from '@src/types';

const userRouter = Router();
const blogController = container.get<BlogController>(
	INTERFACE_TYPE.BlogController
);

userRouter.get('/', blogController.getPublishedBlogs.bind(blogController));
userRouter.get(
	'/:slug',
	blogController.getPublishedBlogBySlug.bind(blogController)
);
userRouter.get(
	'/getbyid/:id',
	blogController.getPublishedBlogById.bind(blogController)
);

export default userRouter;
