import { Testimonial } from '@src/entities/master/testimonial.entity';

export interface ITestimonialInteractor {
	findAll(
		limit: number,
		offset: number
	): Promise<{ testimonial: Testimonial[]; totalCount: number }>;
	findById(id: number): Promise<Testimonial | null>;
	create(
		testimonial: Partial<Testimonial>,
		file?: Express.Multer.File
	): Promise<Testimonial>;
	update(
		id: number,
		testimonial: Partial<Testimonial>,
		file?: Express.Multer.File
	): Promise<Testimonial | null>;
	delete(id: number): Promise<boolean>;
}
