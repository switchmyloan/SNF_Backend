import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { Author } from '@src/entities/master/author.entity';
import { IAuthorRepository } from '@src/interfaces/repository/IAuthorRepository';
import { AppDataSource } from '@src/config/data-source';
import ApiError from '@src/utils/helper/ApiError';

@injectable()
export class AuthorRepository implements IAuthorRepository {
	private readonly authorRepository: Repository<Author>;

	constructor() {
		this.authorRepository = AppDataSource.getRepository(Author);
	}

	async create(data: Partial<Author>): Promise<Author> {
		const author = this.authorRepository.create(data);
		return await this.authorRepository.save(author);
	}

	async update(id: number, data: Partial<Author>): Promise<Author> {
		const existingAuthor = await this.authorRepository.findOne({
			where: { id },
		});

		if (!existingAuthor) {
			throw new ApiError(404, `Author with ID ${id} not found`);
		}

		await this.authorRepository.update(id, data);
		return this.authorRepository.findOneOrFail({ where: { id } });
	}

	async findAll(
		limit?: number,
		offset?: number
	): Promise<{ data: Author[]; totalCount: number }> {
		const [data, totalCount] = await this.authorRepository.findAndCount({
			take: limit,
			skip: offset,
			order: { id: 'DESC' },
		});
		return { data, totalCount };
	}

	async findAllForUser(): Promise<Author[]> {
		return await this.authorRepository.find({
			order: { id: 'DESC' },
			where: {
				isActive: true,
			},
		});
	}

	async findById(id: number): Promise<Author> {
		return await this.authorRepository.findOneOrFail({ where: { id } });
	}

	async delete(id: number): Promise<void> {
		const result = await this.authorRepository.delete(id);
		if (result.affected === 0) {
			throw new ApiError(404, `Author with ID not found`);
		}
	}
}
