import { Tag } from '@src/entities';

export interface ITagRepository {
	create(tag: { name: string; description?: string }): Promise<Tag>;
	bulkCreate(tags: { name: string; description?: string }[]): Promise<Tag[]>;
	findByName(name: string): Promise<string | null>;
	findByIds(ids: number[]): Promise<Tag[]>;
	findAll(limit: number, offset: number, search?: string): Promise<Tag[]>;
	count(search?: string): Promise<number>;
	findById(id: number): Promise<Tag | null>;
	update(id: number, name: string): Promise<Tag>;
	delete(id: number): Promise<void>;
	deleteByName(name: string): Promise<void>;
}
