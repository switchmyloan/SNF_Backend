import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { AppDataSource } from '@src/config/data-source';
import { Testimonial } from '@src/entities/master/testimonial.entity';
import { ITestimonialRepository } from '../../interfaces/index';

@injectable()
export class TestimonialRepository implements ITestimonialRepository {
	private readonly repo: Repository<Testimonial>;

	constructor() {
		this.repo = AppDataSource.getRepository(Testimonial);
	}

	async findAll(
		limit?: number,
		offset?: number
	): Promise<{ data: Testimonial[]; totalCount: number }> {
		const [data, totalCount] = await this.repo.findAndCount({
			take: limit,
			skip: offset,
			order: { id: 'DESC' },
		});
		return { data, totalCount };
	}

	async findById(id: number): Promise<Testimonial | null> {
		return this.repo.findOneBy({ id });
	}

	async create(testimonial: Testimonial): Promise<Testimonial> {
		const newTestimonial = this.repo.create(testimonial);
		return this.repo.save(newTestimonial);
	}

	async update(
		id: number,
		testimonial: Partial<Testimonial>
	): Promise<Testimonial | null> {
		await this.repo.update(id, testimonial);
		return this.findById(id);
	}

	async delete(id: number): Promise<boolean> {
		const result = await this.repo.delete(id);
		return result.affected !== 0;
	}
}
