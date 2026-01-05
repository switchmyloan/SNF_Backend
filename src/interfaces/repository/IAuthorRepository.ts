import { Author } from '@src/entities';

export interface IAuthorRepository {
	create(data: Partial<Author>): Promise<Author>;
	update(id: number, data: Partial<Author>): Promise<Author>;
	findAll(
		limit: number,
		offset: number
	): Promise<{ data: Author[]; totalCount: number }>;

	findAllForUser(): Promise<Author[]>;

	findById(id: number): Promise<Author>;
	delete(id: number): Promise<void>;
}
