import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { AppDataSource } from '@src/config/data-source';
import { ApiError } from '@src/utils';
import { ICategoryRepository } from '@src/interfaces';
import { Category } from '@src/entities';

@injectable()
export class CategoryRepository implements ICategoryRepository {
	private readonly categoryRepository: Repository<Category>;

	constructor() {
		this.categoryRepository = AppDataSource.getRepository(Category);
	}

	async create(data: Partial<Category>): Promise<Category> {
		const category = this.categoryRepository.create(data);
		return await this.categoryRepository.save(category);
	}

	async update(id: number, data: Partial<Category>): Promise<Category> {
		const existingCategory = await this.categoryRepository.findOne({
			where: { id },
		});
		if (!existingCategory) {
			throw new ApiError(404, `Category with ID ${id} not found`);
		}
		Object.assign(existingCategory, data);
		return await this.categoryRepository.save(existingCategory);
	}

	async findAll(
		limit?: number,
		offset?: number
	): Promise<{ data: Category[]; totalCount: number }> {
		const [data, totalCount] = await this.categoryRepository.findAndCount({
			take: limit,
			skip: offset,
			order: { id: 'DESC' },
		});
		return { data, totalCount };
	}

	async findById(id: number): Promise<Category | null> {
		return await this.categoryRepository.findOne({ where: { id } });
	}

	async findByName(name: string): Promise<Category | null> {
		return await this.categoryRepository.findOne({ where: { name } });
	}
}
