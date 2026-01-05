import { Category } from '@src/entities';
import { ICategoryRepository } from '@src/interfaces/repository/ICategoryrepository';
import { ICategoryInteractor } from '@src/interfaces/interactor/ICategoryInteractor';
import { injectable, inject } from 'inversify';
import { INTERFACE_TYPE } from '@src/types/inversify.types';
import { ApiError } from '@src/utils';

@injectable()
export class CategoryInteractor implements ICategoryInteractor {
	private repository: ICategoryRepository;

	constructor(
		@inject(INTERFACE_TYPE.CategoryRepository)
		repository: ICategoryRepository
	) {
		this.repository = repository;
	}

	async create(data: Partial<Category>): Promise<Category> {
		const newCategory = await this.repository.create(data);
		return newCategory;
	}

	async update(id: number, data: Partial<Category>): Promise<Category> {
		const updatedCategory = await this.repository.update(id, data);
		return updatedCategory;
	}

	// async findAll(
	// 	limit: number,
	// 	offset: number
	// ): Promise<{ categories: Category[]; totalCount: number }> {
	// 	const { data, totalCount } = await this.repository.findAll(limit, offset);
	// 	return { categories: data, totalCount };
	// }

	// src/services/category.service.ts (Example of adding Service Layer filter)

	async findAll(
		limit: number,
		offset: number
	): Promise<{ categories: Category[]; totalCount: number }> {

		// 1. Fetch data from the repository (which should already be filtering by isActive)
		const { data, totalCount } = await this.repository.findAll(limit, offset);

		// 2. 💡 (Inefficient) Service Layer Filtering Check: 
		//    Filter the 'data' array again to ensure all categories are active.
		const activeCategories = data.filter(category => category.isActive === true);

		// Note: totalCount will still be the total count of active records from the DB.
		// The length of activeCategories might be less than 'limit' if the repository
		// returned mixed data (which it shouldn't, given the TypeORM implementation).

		return { categories: activeCategories, totalCount };
	}
	async findById(id: number): Promise<Category | null> {
		const category = await this.repository.findById(id);
		if (!category) {
			throw new ApiError(404, 'Category not found');
		}
		return category;
	}

	async findByName(name: string): Promise<Category | null> {
		const category = await this.repository.findByName(name);
		if (!category) {
			throw new ApiError(404, 'Category not found');
		}
		return category;
	}
}
