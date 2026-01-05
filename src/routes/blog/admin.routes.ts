import { Router } from 'express';
import { container } from 'container/index';
import { uploader } from '@src/middleware/uploader';
import { BlogController } from '@src/controller';
import { INTERFACE_TYPE } from '@src/types';

const upload = uploader('blogs', ['image/jpeg', 'image/png']);
const adminRouter = Router();

const blogController = container.get<BlogController>(
	INTERFACE_TYPE.BlogController
);

adminRouter
	.route('/')
	.get(blogController.getBlogs.bind(blogController))
	.post(
		upload.single('metaImage'),
		blogController.createBlog.bind(blogController)
	);

adminRouter
	.route('/:id')
	.get(blogController.getByIdBlog.bind(blogController))
	.patch(
		upload.single('metaImage'),
		blogController.updateBlog.bind(blogController)
	)
	.delete(blogController.deleteBlog.bind(blogController));

adminRouter
	.route('/archive/:id')
	.get(blogController.archiveBlog.bind(blogController));

adminRouter
	.route('/archive')
	.post(blogController.getArchivedBlogs.bind(blogController));

adminRouter
	.route('/published')
	.get(blogController.getPublishedBlogs.bind(blogController));

adminRouter
	.route('/published/:slug')
	.get(blogController.getPublishedBlogBySlug.bind(blogController));

export default adminRouter;
