import { Faq } from '@src/entities';
import { FaqDTO } from '@src/DTO/faq/faq.dto';

export interface IFaqInteractor {
	createFaq(data: Partial<Faq>): Promise<Faq>;
	updateFaq(id: number, data: Partial<Faq>): Promise<Faq>;
	getFaqs(
		limit: number,
		offset: number,
		search?: string
	): Promise<{ faqs: Faq[]; totalCount: number }>;
	getByIdFaq(id: number): Promise<Faq | null>;
	getFeaturedFaqs(limit: number, offset: number): Promise<FaqDTO[]>;
	getByCategory(
		categoryId: number,
		limit: number,
		offset: number
	): Promise<Faq[]>;
}
