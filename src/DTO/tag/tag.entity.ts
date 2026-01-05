import { Tag } from '@src/entities';

export class TagDTO {
	id: number;
	name: string;
	description?: string;

	constructor(tag: Tag) {
		this.id = tag.id;
		this.name = tag.name;
		this.description = tag.description ?? undefined; // keep optional clean
	}

	/**
	 * Factory method for mapping arrays into full DTOs
	 */
	static fromEntities(tags: Tag[]): TagDTO[] {
		return tags.map((tag) => new TagDTO(tag));
	}

	/**
	 * Converts single tag into summary form
	 */
	toSummary(): TagSummaryDTO {
		return new TagSummaryDTO(this);
	}

	/**
	 * Factory method for mapping arrays into summaries
	 */
	static toSummaries(tags: Tag[]): TagSummaryDTO[] {
		return tags.map((tag) => new TagSummaryDTO(tag));
	}
}

/**
 * Lightweight summary version of TagDTO
 * (for list or nested inside BlogDTO)
 */
export class TagSummaryDTO {
	id: number;
	name: string;

	constructor(tag: Tag | TagDTO) {
		this.id = tag.id;
		this.name = tag.name;
	}
}
