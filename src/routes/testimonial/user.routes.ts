import { Router } from 'express';
import { INTERFACE_TYPE } from '@src/types';
import { container } from 'container/index';
import { TestimonialController } from '@src/controller';

const userRoutes = Router();

const testimonialController = container.get<TestimonialController>(
	INTERFACE_TYPE.TestimonialController
);

userRoutes
	.route('/')
	.get(testimonialController.getAll.bind(testimonialController));

export default userRoutes;
