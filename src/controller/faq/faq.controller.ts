import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { AsyncHandler } from '../../utils/handler/async.handler';
import ApiResponse from '../../utils/helper/ApiResponse';
import { INTERFACE_TYPE } from '../../types/inversify.types';
import { IFaqInteractor } from '../../interfaces/interactor/IFaqInteractor';

@injectable()
export class FaqController {
	private faqInteractor: IFaqInteractor;

	constructor(
		@inject(INTERFACE_TYPE.FaqInteractor) faqInteractor: IFaqInteractor
	) {
		this.faqInteractor = faqInteractor;
	}

	@AsyncHandler()
	async getFaqs(req: Request, res: Response): Promise<void> {
		const { perPage = '10', currentPage = '1', search = '' } = req.query;

		const limit = Math.max(Number(perPage), 1);
		const page = Math.max(Number(currentPage), 1);
		const offset = (page - 1) * limit;

		const { faqs, totalCount } = await this.faqInteractor.getFaqs(limit, offset, String(search));

		res.status(200).json(
			new ApiResponse(
				200,
				{
					rows: faqs,
					pagination: {
						total: totalCount,
						perPage: limit,
						currentPage: page,
						totalPages: Math.ceil(totalCount / limit),
					},
				},
				'FAQs retrieved successfully'
			)
		);
	}

	@AsyncHandler()
	async getFaqById(req: Request, res: Response) {
		const { id } = req.params;
		const faq = await this.faqInteractor.getByIdFaq(Number(id));
		res
			.status(200)
			.json(new ApiResponse(200, faq, 'FAQ retrieved successfully'));
	}

	@AsyncHandler()
	async create(req: Request, res: Response) {
		const faqData = req.body;
		const newFaq = await this.faqInteractor.createFaq(faqData);
		res
			.status(201)
			.json(new ApiResponse(201, newFaq, 'FAQ created successfully'));
	}

	@AsyncHandler()
	async updateFaq(req: Request, res: Response) {
		const { id } = req.params;
		const faqData = req.body;
		const updatedFaq = await this.faqInteractor.updateFaq(Number(id), faqData);
		res
			.status(200)
			.json(new ApiResponse(200, updatedFaq, 'FAQ updated successfully'));
	}

	@AsyncHandler()
	async getFeaturedFaqs(req: Request, res: Response) {
		const limit = req.query.limit ? Number(req.query.limit) : 10;
		const offset = req.query.offset ? Number(req.query.offset) : 0;
		const featuredFaqs = await this.faqInteractor.getFeaturedFaqs(
			limit,
			offset
		);
		res
			.status(200)
			.json(
				new ApiResponse(
					200,
					featuredFaqs,
					'Featured FAQs retrieved successfully'
				)
			);
	}

	@AsyncHandler()
	async getFaqsByCategory(req: Request, res: Response) {
		const { categoryId } = req.params;
		const limit = req.query.limit ? Number(req.query.limit) : 10;
		const offset = req.query.offset ? Number(req.query.offset) : 0;
		const faqsByCategory = await this.faqInteractor.getByCategory(
			Number(categoryId),
			limit,
			offset
		);
		res
			.status(200)
			.json(
				new ApiResponse(
					200,
					faqsByCategory,
					'FAQs by category retrieved successfully'
				)
			);
	}
}
