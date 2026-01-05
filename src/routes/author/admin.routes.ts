import { Router } from 'express';
import { container } from 'container/index';
import { uploader } from '@src/middleware/uploader';
import { AuthorController } from '@src/controller';
import { INTERFACE_TYPE } from '@src/types';

const upload = uploader('author', ['image/jpeg', 'image/png']);

const adminRoutes = Router();

const authorController = container.get<AuthorController>(
	INTERFACE_TYPE.AuthorController
);

adminRoutes
	.route('/')
	.post(
		upload.single('profileImageUrl'),
		authorController.createAuthor.bind(authorController)
	)
	.get(authorController.getAuthors.bind(authorController));

adminRoutes
	.route('/:id')
	.get(authorController.getAuthorById.bind(authorController))
	.put(
		upload.single('profileImageUrl'),
		authorController.updateAuthor.bind(authorController)
	);

adminRoutes
	.route('/delete/:id')
	.delete(authorController.deleteAuthor.bind(authorController));

export default adminRoutes;
