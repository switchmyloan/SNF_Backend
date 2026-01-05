import { Category } from '@src/entities';

export class CategoryDTO {
	id: number;
	name: string;
	description?: string;

	constructor(category: Category) {
		this.id = category.id;
		this.name = category.name;
		this.description = category.description ?? undefined;
	}

	static fromEntities(categories: Category[]): CategoryDTO[] {
		return categories.map((category) => new CategoryDTO(category));
	}

	toSummary(): CategorySummaryDTO {
		return new CategorySummaryDTO(this);
	}

	static toSummaries(categories: Category[]): CategorySummaryDTO[] {
		return categories.map((category) => new CategorySummaryDTO(category));
	}
}

export class CategorySummaryDTO {
	id: number;
	name: string;

	constructor(category: Category | CategoryDTO) {
		this.id = category.id;
		this.name = category.name;
	}
}
