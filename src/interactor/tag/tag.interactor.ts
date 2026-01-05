import { Tag } from '@src/entities/master/tag.entity';
import { ITagInteractor } from '@src/interfaces/interactor/ITagInteractor';
import { ITagRepository } from '@src/interfaces/repository/ITagRepository';
import { injectable, inject } from 'inversify';
import { INTERFACE_TYPE } from '../../types/inversify.types';
import ApiError from '@src/utils/helper/ApiError';
import { TagCreateDto, TagInput } from '@src/DTO/tag/tagCreate.dto';

@injectable()
export class TagInteractor implements ITagInteractor {
	private repository: ITagRepository;

	constructor(
		@inject(INTERFACE_TYPE.TagRepository) repository: ITagRepository
	) {
		this.repository = repository;
	}

	async createTags(
		tags: { name: string; description?: string }[]
	): Promise<Tag> {
		return this.repository.create(tags[0]);
	}

	async bulkCreateTags(
		tags: { name: string; description?: string }[]
	): Promise<Tag[]> {
		await this.repository.bulkCreate(tags);
		return this.repository.findAll(1000, 0);
	}

	async create(inputData: TagInput): Promise<Tag | Tag[]> {
		let tagDto: TagCreateDto;

		try {
			tagDto = new TagCreateDto(inputData);
		} catch (err: unknown) {
			const message =
				err instanceof Error
					? err.message
					: 'Unknown error during tag creation';
			throw new ApiError(400, message);
		}

		if (tagDto.tags.length === 1) {
			return this.createTags(tagDto.tags);
		} else {
			return this.bulkCreateTags(tagDto.tags);
		}
	}

	async getTagByName(name: string): Promise<string | null> {
		const tagName = await this.repository.findByName(name);
		if (!tagName) {
			throw new ApiError(404, 'Tag not found');
		}
		return tagName;
	}

	async getTagsByIds(ids: number[]): Promise<Tag[]> {
		return this.repository.findByIds(ids);
	}

	async getAllTags(limit: number, offset: number): Promise<Tag[]> {
		return this.repository.findAll(limit, offset);
	}

	async getTagById(id: number): Promise<Tag | null> {
		const tag = await this.repository.findById(id);
		if (!tag) {
			throw new ApiError(404, 'Tag not found');
		}
		return tag;
	}

	async deleteById(id: number): Promise<void> {
		await this.repository.delete(id);
	}

	async deleteByName(name: string): Promise<void> {
		await this.repository.deleteByName(name);
	}

	async getTagsWithCount(
		limit: number,
		offset: number,
		search?: string
	): Promise<{ tags: Tag[]; totalCount: number }> {
		const tags = await this.repository.findAll(limit, offset, search);
		const totalCount = await this.repository.count(search);
		return { tags, totalCount };
	}
}
