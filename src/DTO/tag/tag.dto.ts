import { Tag } from '@src/entities';

export class TagDto {
	ID: number;
	Name: string;
	Description: string | null;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;

	constructor(tag: Tag) {
		this.ID = tag.id;
		this.Name = tag.name;
		this.Description = tag.description ?? null;
		this.isActive = tag.isActive;
		this.createdAt = tag.createdAt;
		this.updatedAt = tag.updatedAt;
	}
}
