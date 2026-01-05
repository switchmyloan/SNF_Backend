export type TagInput =
	| string
	| { name: string; description?: string }
	| Array<string | { name: string; description?: string }>;

export class TagCreateDto {
	public tags: Array<{ name: string; description?: string }> = [];

	constructor(input: TagInput) {
		if (!input) {
			throw new Error('Request body cannot be empty');
		}

		if (typeof input === 'string') {
			this.tags.push({ name: input.trim() });
		} else if (Array.isArray(input)) {
			for (const item of input) {
				if (typeof item === 'string') {
					this.tags.push({ name: item.trim() });
				} else if (
					typeof item === 'object' &&
					item.name &&
					typeof item.name === 'string'
				) {
					this.tags.push({
						name: item.name.trim(),
						description: item.description?.trim(),
					});
				} else {
					throw new Error('Each tag must be a string or an object with a name');
				}
			}
		} else if (
			typeof input === 'object' &&
			input.name &&
			typeof input.name === 'string'
		) {
			this.tags.push({
				name: input.name.trim(),
				description: input.description?.trim(),
			});
		} else {
			throw new Error(
				'Request body must be a string, an array of strings/objects, or an object with a name field'
			);
		}

		if (this.tags.length === 0) {
			throw new Error('No valid tags provided');
		}
	}
}
