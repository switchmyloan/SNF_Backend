import { Faq } from '../../entities/master/faq.entity';
import { FaqDTO } from '@src/DTO/faq/faq.dto';

export interface IFaqRepository {
	create(data: Partial<Faq>): Promise<Faq>;
	update(id: number, data: Partial<Faq>): Promise<Faq>;
	findAllWithCount(
		limit: number,
		offset: number,
		search: string
	): Promise<{ data: Faq[]; totalCount: number }>;
	findById(id: number): Promise<Faq | null>;
	findFeaturedFaqs(limit: number, offset: number): Promise<FaqDTO[]>;
	findByCategory(
		categoryId: number,
		limit: number,
		offset: number
	): Promise<Faq[]>;
}
