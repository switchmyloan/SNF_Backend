import { injectable, inject } from 'inversify';
import { Author } from '@src/entities/master/author.entity';
import { IAuthorRepository } from '@src/interfaces/repository/IAuthorRepository';
import { IAuthorInteractor } from '@src/interfaces/interactor/IAuthorInteractor';
import { INTERFACE_TYPE } from '@src/types/inversify.types';
import { ApiError } from '@src/utils';

@injectable()
export class AuthorInteractor implements IAuthorInteractor {
	constructor(
		@inject(INTERFACE_TYPE.AuthorRepository)
		private repository: IAuthorRepository
	) {}

	async createAuthor(
		data: Partial<Author>,
		file?: Express.Multer.File
	): Promise<Author> {
		if (file) {
			data.profileImageUrl = `/public/authors/${file.filename}`;
		}
		return this.repository.create(data);
	}

	async updateAuthor(
		id: number,
		data: Partial<Author>,
		file?: Express.Multer.File
	): Promise<Author> {
		if (file) {
			data.profileImageUrl = `/public/authors/${file.filename}`;
		}

		if (!file) {
			const existingAuthor = await this.repository.findById(Number(id));
			if (existingAuthor) {
				data.profileImageUrl = existingAuthor.profileImageUrl;
			}
		}

		return this.repository.update(id, data);
	}

	async getAuthors(
		limit: number,
		offset: number
	): Promise<{ rows: Author[]; totalCount: number }> {
		const { data, totalCount } = await this.repository.findAll(limit, offset);
		return { rows: data, totalCount };
	}

	async getAuthorsForUser(): Promise<Author[]> {
		return await this.repository.findAllForUser();
	}

	async getAuthorById(id: number): Promise<Author> {
		const author = await this.repository.findById(id);
		if (!author) {
			throw new ApiError(404, `Author with ID ${id} not found`);
		}
		return author;
	}

	async deleteAuthor(id: number): Promise<void> {
		return this.repository.delete(id);
	}
}
