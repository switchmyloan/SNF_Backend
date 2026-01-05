import { Router } from 'express';
import { INTERFACE_TYPE } from '@src/types';
import { container } from 'container/index';
import { uploader } from '@src/middleware/uploader';
import { TestimonialController } from '@src/controller';

const upload = uploader('testimonial', ['image/jpeg', 'image/png']);

const adminRoutes = Router();

const testimonialController = container.get<TestimonialController>(
	INTERFACE_TYPE.TestimonialController
);

adminRoutes
	.route('/')
	.get(testimonialController.getAll.bind(testimonialController))
	.post(
		upload.single('image'),
		testimonialController.create.bind(testimonialController)
	);

adminRoutes
	.route('/:id')
	.get(testimonialController.getById.bind(testimonialController))
	.put(
		upload.single('image'),
		testimonialController.update.bind(testimonialController)
	)
	.delete(testimonialController.delete.bind(testimonialController));

export default adminRoutes;
