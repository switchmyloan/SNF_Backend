import { Author } from '@src/entities';

export class AuthorDTO {
	id: number;
	name: string;
	description?: string;
	profileImageUrl?: string;
	designation?: string;

	constructor(author: Author) {
		this.id = author.id;
		this.name = author.name;
		this.description = author.description;
		this.profileImageUrl = author.profileImageUrl;
		this.designation = author.designation;
	}

	/**
	 * Factory method for mapping arrays
	 */
	static fromEntities(authors: Author[]): AuthorDTO[] {
		return authors.map((author) => new AuthorDTO(author));
	}

	/**
	 * Converts to a summary DTO
	 */
	toSummary(): AuthorSummaryDTO {
		return new AuthorSummaryDTO(this);
	}
}

export class AuthorSummaryDTO {
	id: number;
	name: string;

	constructor(author: Author | AuthorDTO) {
		this.id = author.id;
		this.name = author.name; // assumes entity has `name`
	}
}
