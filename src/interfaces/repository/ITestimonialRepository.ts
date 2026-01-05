import { Testimonial } from '@src/entities/master/testimonial.entity';

export interface ITestimonialRepository {
	findAll(
		limit: number,
		offset: number
	): Promise<{ data: Testimonial[]; totalCount: number }>;
	findById(id: number): Promise<Testimonial | null>;
	create(testimonial: Testimonial): Promise<Testimonial>;
	update(
		id: number,
		testimonial: Partial<Testimonial>
	): Promise<Testimonial | null>;
	delete(id: number): Promise<boolean>;
}
