import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { AsyncHandler } from '../../utils/handler/async.handler';
import ApiResponse from '../../utils/helper/ApiResponse';
import { INTERFACE_TYPE } from '../../types/inversify.types';
import { ITestimonialInteractor } from '../../interfaces/interactor/ITestimonialInteractor';

@injectable()
export class TestimonialController {
	constructor(
		@inject(INTERFACE_TYPE.TestimonialInteractor)
		private testimonialInteractor: ITestimonialInteractor
	) { }

	@AsyncHandler()
	async getAll(req: Request, res: Response): Promise<void> {
		const { perPage = '10', currentPage = '1' } = req.query;

		const limit = Math.max(Number(perPage), 1);
		const page = Math.max(Number(currentPage), 1);
		const offset = (page - 1) * limit;

		const { testimonial, totalCount } =
			await this.testimonialInteractor.findAll(limit, offset);


		if (testimonial && Array.isArray(testimonial)) {
			testimonial.sort((a, b) => {
				// Assuming 'order' is a numeric key
				const orderA = a.order || 0;
				const orderB = b.order || 0;

				if (orderA < orderB) {
					return -1;
				}
				if (orderA > orderB) {
					return 1;
				}
				return 0; // Values are equal
			});
		}

		res.status(200).json(
			new ApiResponse(
				200,
				{
					rows: testimonial,
					pagination: {
						total: totalCount,
						perPage: limit,
						currentPage: page,
						totalPages: Math.ceil(totalCount / limit),
					},
				},
				'Testimonials retrieved successfully'
			)
		);
	}

	@AsyncHandler()
	async getById(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const testimonial = await this.testimonialInteractor.findById(Number(id));
		if (!testimonial) {
			res.status(404).json(new ApiResponse(404, null, 'Testimonial not found'));
			return;
		}
		res
			.status(200)
			.json(
				new ApiResponse(200, testimonial, 'Testimonial retrieved successfully')
			);
	}

	@AsyncHandler()
	async create(req: Request, res: Response): Promise<void> {
		const data = {
			...req.body,
			isActive: req.body.isActive === 'true' || req.body.isActive === true,
		};
		const file = req.file as Express.Multer.File;
		const testimonial = await this.testimonialInteractor.create(data, file);
		res
			.status(201)
			.json(
				new ApiResponse(201, testimonial, 'Testimonial created successfully')
			);
	}

	@AsyncHandler()
	async update(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const data = {
			...req.body,
			isActive: req.body.isActive === 'true' || req.body.isActive === true,
		};

		const file = req.file as Express.Multer.File;
		const updated = await this.testimonialInteractor.update(
			Number(id),
			data,
			file
		);
		if (!updated) {
			res.status(404).json(new ApiResponse(404, null, 'Testimonial not found'));
			return;
		}
		res
			.status(200)
			.json(new ApiResponse(200, updated, 'Testimonial updated successfully'));
	}

	@AsyncHandler()
	async delete(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const success = await this.testimonialInteractor.delete(Number(id));
		if (!success) {
			res.status(404).json(new ApiResponse(404, null, 'Testimonial not found'));
			return;
		}
		res
			.status(204)
			.json(new ApiResponse(204, null, 'Testimonial deleted successfully'));
	}
}
