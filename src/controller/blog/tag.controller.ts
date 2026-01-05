import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { AsyncHandler } from '../../utils';
import ApiResponse from '../../utils/helper/ApiResponse';
import { INTERFACE_TYPE } from 'types/inversify.types';
import { ITagInteractor } from '@src/interfaces';
import { TagDto } from '@src/DTO/tag/tag.dto';

@injectable()
export class TagController {
	private readonly tagInteractor: ITagInteractor;

	constructor(
		@inject(INTERFACE_TYPE.TagInteractor) tagInteractor: ITagInteractor
	) {
		this.tagInteractor = tagInteractor;
	}

	@AsyncHandler()
	async getTags(req: Request, res: Response) {
		const limit = Number(req.query.limit ?? 10);
		const offset = Number(req.query.offset ?? req.query.currentPage ?? 0);

		const rawSearch = req.query.search;
		const search =
			typeof rawSearch === 'string' && rawSearch.trim() !== ''
				? rawSearch.trim()
				: undefined;

		const { tags, totalCount } = await this.tagInteractor.getTagsWithCount(
			limit,
			offset,
			search
		);

		const result = tags.map((tag) => new TagDto(tag));

		res.status(200).json({
			statusCode: 200,
			rows: result,
			pagination: {
				limit,
				offset,
				total: totalCount,
			},
			message: 'Tags retrieved successfully',
			success: true,
		});
	}

	@AsyncHandler()
	async getTagById(req: Request, res: Response) {
		const { id } = req.params;
		const tag = await this.tagInteractor.getTagById?.(Number(id));
		res
			.status(200)
			.json(new ApiResponse(200, tag, 'Tag retrieved successfully'));
	}

	@AsyncHandler()
	async getTagByName(req: Request, res: Response) {
		const { name } = req.params;
		const tagName = await this.tagInteractor.getTagByName(name);
		res
			.status(200)
			.json(
				new ApiResponse(200, { name: tagName }, 'Tag retrieved successfully')
			);
	}

	@AsyncHandler()
	async createTags(req: Request, res: Response) {
		const result = await this.tagInteractor.createTags(req.body);
		res
			.status(201)
			.json(new ApiResponse(201, result, 'Tags created successfully'));
	}

	@AsyncHandler()
	async deleteTagById(req: Request, res: Response) {
		const { id } = req.params;
		await this.tagInteractor.deleteById(Number(id));
		res
			.status(200)
			.json(new ApiResponse(200, null, 'Tag deleted successfully'));
	}

	@AsyncHandler()
	async deleteTagByName(req: Request, res: Response) {
		const { name } = req.params;
		await this.tagInteractor.deleteByName(name);
		res
			.status(200)
			.json(new ApiResponse(200, null, 'Tag deleted successfully'));
	}
}
