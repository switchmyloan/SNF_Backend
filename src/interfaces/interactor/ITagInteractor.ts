import { Tag } from '@src/entities';

export interface ITagInteractor {
	createTags(tags: { name: string; description?: string }[]): Promise<Tag>;
	bulkCreateTags(
		tags: { name: string; description?: string }[]
	): Promise<Tag[]>;

	getTagByName(name: string): Promise<string | null>;
	getTagsByIds(ids: number[]): Promise<Tag[]>;
	getAllTags(limit: number, offset: number): Promise<Tag[]>;
	getTagsWithCount(
		limit: number,
		offset: number,
		search?: string
	): Promise<{ tags: Tag[]; totalCount: number }>;
	getTagById?(id: number): Promise<Tag | null>;
	deleteById(id: number): Promise<void>;
	deleteByName(name: string): Promise<void>;
}
