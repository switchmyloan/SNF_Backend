import { AppDataSource } from '@src/config/data-source';
import { Tag } from '@src/entities';
import { ITagRepository } from '@src/interfaces';
import { injectable } from 'inversify';
import { In, Repository, ILike } from 'typeorm';

@injectable()
export class TagRepository implements ITagRepository {
	private readonly repository: Repository<Tag>;

	constructor() {
		this.repository = AppDataSource.getRepository(Tag);
	}

	async findByName(name: string): Promise<string | null> {
		const tag = await this.repository.findOne({ where: { name } });
		return tag ? tag.name : null;
	}

	async findByIds(ids: number[]): Promise<Tag[]> {
		return await this.repository.find({ where: { id: In(ids) } });
	}

	async findAll(
		limit: number,
		offset: number,
		search?: string
	): Promise<Tag[]> {
		const where = search ? { name: ILike(`%${search}%`) } : {};

		return await this.repository.find({
			where,
			take: limit,
			skip: offset,
			order: { id: 'DESC' },
		});
	}

	async findById(id: number): Promise<Tag | null> {
		return await this.repository.findOne({ where: { id } });
	}

	async update(id: number, name: string): Promise<Tag> {
		const tag = await this.repository.findOne({ where: { id } });
		if (!tag) {
			throw new Error(`Tag with id not found`);
		}
		tag.name = name;
		return await this.repository.save(tag);
	}

	async delete(id: number): Promise<void> {
		const result = await this.repository.delete(id);
		if (result.affected === 0) {
			throw new Error(`Tag with id ${id} not found`);
		}
		return;
	}

	async deleteByName(name: string): Promise<void> {
		const result = await this.repository.delete({ name });
		if (result.affected === 0) {
			throw new Error(`Tag with name ${name} not found`);
		}
		return;
	}

	async create(tag: { name: string; description?: string }): Promise<Tag> {
		const newTag = this.repository.create({
			name: tag.name,
			description: tag.description,
		});
		return await this.repository.save(newTag);
	}

	async bulkCreate(
		tags: { name: string; description?: string }[]
	): Promise<Tag[]> {
		const formattedTags = tags.map((t) => ({
			name: t.name,
			description: t.description,
		}));
		const newTags = this.repository.create(formattedTags);
		return await this.repository.save(newTags);
	}

	async count(search?: string): Promise<number> {
		const where = search ? { name: ILike(`%${search}%`) } : {};

		return await this.repository.count({ where });
	}
}
