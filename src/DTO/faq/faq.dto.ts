import { Faq } from '@src/entities';
import { CategoryDTO } from '../category/category.dto';

export class FaqDTO {
	id: number;
	question: string;
	answer: string;
	isFeatured: boolean;
	category: CategoryDTO;

	constructor(faq: Faq) {
		this.id = faq.id;
		this.question = faq.question;
		this.answer = faq.answer;
		this.isFeatured = faq.isFeatured;
		this.category = new CategoryDTO(faq.category);
	}

	static fromEntities(faqs: Faq[]): FaqDTO[] {
		return faqs.map((faq) => new FaqDTO(faq));
	}

	toSummary(): FaqSummaryDTO {
		return new FaqSummaryDTO(this);
	}

	static toSummaries(faqs: FaqDTO[]): FaqSummaryDTO[] {
		return faqs.map((faq) => new FaqSummaryDTO(faq));
	}
}

export class FaqSummaryDTO {
	id: number;
	question: string;
	answer: string;
	isFeatured: boolean;
	category: CategoryDTO;

	constructor(faq: FaqDTO) {
		this.id = faq.id;
		this.question = faq.question;
		this.answer = faq.answer;
		this.isFeatured = faq.isFeatured;
		this.category = faq.category;
	}

	static toSummaries(faqs: FaqDTO[]): FaqSummaryDTO[] {
		return faqs.map((faq) => new FaqSummaryDTO(faq));
	}
}
