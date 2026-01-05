import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { AsyncHandler } from '../../utils/handler/async.handler';
import ApiResponse from '../../utils/helper/ApiResponse';
import { INTERFACE_TYPE } from '../../types/inversify.types';
import { ICategoryInteractor } from '../../interfaces/interactor/ICategoryInteractor';

@injectable()
export class CategoryController {
	private categoryInteractor: ICategoryInteractor;

	constructor(
		@inject(INTERFACE_TYPE.CategoryInteractor)
		categoryInteractor: ICategoryInteractor
	) {
		this.categoryInteractor = categoryInteractor;
	}

	@AsyncHandler()
	async createCategory(req: Request, res: Response) {
		const data = req.body;
		const newCategory = await this.categoryInteractor.create(data);
		res
			.status(201)
			.json(new ApiResponse(201, newCategory, 'Category created successfully'));
	}

	@AsyncHandler()
	async updateCategory(req: Request, res: Response) {
		const { id } = req.params;
		const data = req.body;
		const updatedCategory = await this.categoryInteractor.update(
			Number(id),
			data
		);
		res
			.status(200)
			.json(
				new ApiResponse(200, updatedCategory, 'Category updated successfully')
			);
	}

	@AsyncHandler()
	async getCategories(req: Request, res: Response): Promise<void> {
		const { perPage = '10', currentPage = '1' } = req.query;

		const limit = Math.max(Number(perPage), 1);
		const page = Math.max(Number(currentPage), 1);
		const offset = (page - 1) * limit;

		const { categories, totalCount } = await this.categoryInteractor.findAll(
			limit,
			offset
		);

		res.status(200).json(
			new ApiResponse(
				200,
				{
					rows: categories,
					pagination: {
						total: totalCount,
						perPage: limit,
						currentPage: page,
						totalPages: Math.ceil(totalCount / limit),
					},
				},
				'Category retrieved successfully'
			)
		);
	}

	@AsyncHandler()
	async getCategoryById(req: Request, res: Response) {
		const { id } = req.params;
		const category = await this.categoryInteractor.findById(Number(id));
		res
			.status(200)
			.json(new ApiResponse(200, category, 'Category retrieved successfully'));
	}

	@AsyncHandler()
	async getCategoryByName(req: Request, res: Response) {
		const { name } = req.params;
		const category = await this.categoryInteractor.findByName(name);
		res
			.status(200)
			.json(new ApiResponse(200, category, 'Category retrieved successfully'));
	}
}
