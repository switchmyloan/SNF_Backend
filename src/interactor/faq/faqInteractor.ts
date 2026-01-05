import { Faq } from '@src/entities';
import { IFaqInteractor } from '@src/interfaces';
import { IFaqRepository } from '@src/interfaces';
import { injectable, inject } from 'inversify';
import { INTERFACE_TYPE } from '@src/types/inversify.types';
import { ApiError } from '@src/utils';
import { FaqDTO } from '../../DTO/faq/faq.dto';

@injectable()
export class FaqInteractor implements IFaqInteractor {
	private repository: IFaqRepository;

	constructor(
		@inject(INTERFACE_TYPE.FaqRepository)
		repository: IFaqRepository
	) {
		this.repository = repository;
	}

	async createFaq(data: Partial<Faq>): Promise<Faq> {
		const newFaq = await this.repository.create(data);
		return newFaq;
	}

	async updateFaq(id: number, data: Partial<Faq>): Promise<Faq> {
		const updatedFaq = await this.repository.update(id, data);
		if (!updatedFaq) {
			throw new ApiError(404, 'FAQ not found');
		}
		return updatedFaq;
	}

	async getFaqs(
		limit: number,
		offset: number,
		search?: string
	): Promise<{ faqs: Faq[]; totalCount: number }> {
		const { data, totalCount } = await this.repository.findAllWithCount(limit, offset, String(search));
		return { faqs: data, totalCount };
	}

	async getByIdFaq(id: number): Promise<Faq | null> {
		const faq = await this.repository.findById(id);
		if (!faq) {
			throw new ApiError(404, 'FAQ not found');
		}
		return faq;
	}

	async getFeaturedFaqs(limit: number, offset: number): Promise<FaqDTO[]> {
		const featuredFaqs = await this.repository.findFeaturedFaqs(limit, offset);
		return featuredFaqs;
	}

	async getByCategory(
		categoryId: number,
		limit: number,
		offset: number
	): Promise<Faq[]> {
		const faqsByCategory = await this.repository.findByCategory(
			categoryId,
			limit,
			offset
		);
		return faqsByCategory;
	}
}
