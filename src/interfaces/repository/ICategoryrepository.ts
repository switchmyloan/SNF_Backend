import { Category } from '@src/entities';

export interface ICategoryRepository {
	create(data: Partial<Category>): Promise<Category>;
	update(id: number, data: Partial<Category>): Promise<Category>;
	findAll(
		limit: number,
		offset: number
	): Promise<{ data: Category[]; totalCount: number }>;
	findById(id: number): Promise<Category | null>;
	findByName(name: string): Promise<Category | null>;
}
