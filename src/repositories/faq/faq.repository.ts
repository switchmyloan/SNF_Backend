import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { AppDataSource } from '@src/config/data-source';
import { ApiError } from '@src/utils';
import { IFaqRepository } from '@src/interfaces';
import { Faq } from '@src/entities';
import { FaqDTO } from '@src/DTO/faq/faq.dto';

@injectable()
export class FaqRepository implements IFaqRepository {
	private readonly faqRepository: Repository<Faq>;

	constructor() {
		this.faqRepository = AppDataSource.getRepository(Faq);
	}

	async create(data: Partial<Faq>): Promise<Faq> {
		const faq = this.faqRepository.create(data);
		return await this.faqRepository.save(faq);
	}

	async update(id: number, data: Partial<Faq>): Promise<Faq> {
		const existingFaq = await this.faqRepository.findOne({ where: { id } });
		if (!existingFaq) {
			throw new ApiError(404, `FAQ with ID ${id} not found`);
		}
		Object.assign(existingFaq, data);
		return await this.faqRepository.save(existingFaq);
	}

	// async findAllWithCount(
	// 	limit?: number,
	// 	offset?: number,
	// ): Promise<{ data: Faq[]; totalCount: number }> {
	// 	const [data, totalCount] = await this.faqRepository.findAndCount({
	// 		take: limit,
	// 		skip: offset,
	// 		order: { id: 'DESC' },
	// 		relations: ['category'],
	// 		select: {
	// 			id: true,
	// 			question: true,
	// 			answer: true,
	// 			isFeatured: true,
	// 			category: {
	// 				id: true,
	// 				name: true,
	// 			},
	// 		},
	// 	});
	// 	return { data, totalCount };
	// }

	async findAllWithCount(
		limit?: number,
		offset?: number,
		search?: string
	): Promise<{ data: Faq[]; totalCount: number }> {
		const query = this.faqRepository
			.createQueryBuilder('faq')
			.leftJoinAndSelect('faq.category', 'category')
			.select([
				'faq.id',
				'faq.question',
				'faq.answer',
				'faq.isFeatured',
				'category.id',
				'category.name',
			])
			.orderBy('faq.id', 'DESC');

		// ✅ Apply search filter only if provided
		if (search && search.trim() !== '') {
			query.where(
				'faq.question ILIKE :search OR faq.answer ILIKE :search OR category.name ILIKE :search',
				{ search: `%${search}%` }
			);
		}

		query.take(limit).skip(offset);

		const [data, totalCount] = await query.getManyAndCount();
		return { data, totalCount };
	}



	async findById(id: number): Promise<Faq | null> {
		return await this.faqRepository.findOne({ where: { id } });
	}

	async findFeaturedFaqs(limit: number, offset: number): Promise<FaqDTO[]> {
		const faqs = await this.faqRepository.find({
			where: { isFeatured: true },
			take: limit,
			skip: offset,
			order: { id: 'DESC' },
			relations: ['category'],
		});
		return FaqDTO.fromEntities(faqs);
	}

	async findByCategory(
		categoryId: number,
		limit: number,
		offset: number
	): Promise<Faq[]> {
		return await this.faqRepository.find({
			where: { category_xid: categoryId },
			take: limit,
			skip: offset,
			order: { id: 'ASC' },
		});
	}
}
