import { injectable, inject } from 'inversify';
import { ITestimonialInteractor } from '../../interfaces/interactor/ITestimonialInteractor';
import { ITestimonialRepository } from '../../interfaces/repository/ITestimonialRepository';
import { Testimonial } from '@src/entities/master/testimonial.entity';
import { INTERFACE_TYPE } from '@src/types/inversify.types';

@injectable()
export class TestimonialInteractor implements ITestimonialInteractor {
	constructor(
		@inject(INTERFACE_TYPE.TestimonialRepository)
		private readonly testimonialRepo: ITestimonialRepository
	) {}

	async create(
		testimonial: Testimonial,
		file?: Express.Multer.File
	): Promise<Testimonial> {
		if (file) {
			testimonial.image = `/public/testimonial/${file.filename}`;
		}
		return this.testimonialRepo.create(testimonial);
	}

	async update(
		id: number,
		testimonial: Partial<Testimonial>,
		file?: Express.Multer.File
	): Promise<Testimonial | null> {
		if (file) {
			testimonial.image = `/public/testimonial/${file.filename}`;
		}

		if (!file) {
			const existingTestimonial = await this.testimonialRepo.findById(
				Number(id)
			);
			if (existingTestimonial) {
				testimonial.image = existingTestimonial.image;
			}
		}
		return this.testimonialRepo.update(id, testimonial);
	}

	async delete(id: number): Promise<boolean> {
		return this.testimonialRepo.delete(id);
	}

	async findById(id: number): Promise<Testimonial | null> {
		return this.testimonialRepo.findById(id);
	}

	async findAll(
		limit: number,
		offset: number
	): Promise<{ testimonial: Testimonial[]; totalCount: number }> {
		const { data, totalCount } = await this.testimonialRepo.findAll(
			limit,
			offset
		);
		return { testimonial: data, totalCount };
	}
}
