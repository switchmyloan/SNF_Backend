import { Author } from '@src/entities/master/author.entity';

export interface IAuthorInteractor {
	createAuthor(
		data: Partial<Author>,
		file?: Express.Multer.File
	): Promise<Author>;
	updateAuthor(
		id: number,
		data: Partial<Author>,
		file?: Express.Multer.File
	): Promise<Author>;
	getAuthors(
		limit: number,
		offset: number
	): Promise<{ rows: Author[]; totalCount: number }>;

	getAuthorsForUser(): Promise<Author[]>;

	getAuthorById(id: number): Promise<Author>;
	deleteAuthor(id: number): Promise<void>;
}
