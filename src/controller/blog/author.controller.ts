import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { IAuthorInteractor } from '@src/interfaces';
import { INTERFACE_TYPE } from '@src/types';
import { ApiResponse, AsyncHandler } from '@src/utils';

@injectable()
export class AuthorController {
	private authorInteractor: IAuthorInteractor;

	constructor(
		@inject(INTERFACE_TYPE.AuthorInteractor) authorInteractor: IAuthorInteractor
	) {
		this.authorInteractor = authorInteractor;
	}

	@AsyncHandler()
	async createAuthor(req: Request, res: Response) {
		const data = req.body;
		const file = req.file as Express.Multer.File;
		const newAuthor = await this.authorInteractor.createAuthor(data, file);
		res
			.status(201)
			.json(new ApiResponse(201, newAuthor, 'Author created successfully'));
	}

	@AsyncHandler()
	async updateAuthor(req: Request, res: Response) {
		const { id } = req.params;
		const data = req.body;

		const file = req.file as Express.Multer.File;
		const updatedAuthor = await this.authorInteractor.updateAuthor(
			Number(id),
			data,
			file
		);
		res
			.status(200)
			.json(new ApiResponse(200, updatedAuthor, 'Author updated successfully'));
	}

	@AsyncHandler()
	async getAuthors(req: Request, res: Response): Promise<void> {
		const { perPage = '10', currentPage = '1' } = req.query;

		const limit = Math.max(Number(perPage), 1);
		const page = Math.max(Number(currentPage), 1);
		const offset = (page - 1) * limit;

		const { rows, totalCount } = await this.authorInteractor.getAuthors(
			limit,
			offset
		);

		res.status(200).json(
			new ApiResponse(
				200,
				{
					rows,
					pagination: {
						total: totalCount,
						perPage: limit,
						currentPage: page,
						totalPages: Math.ceil(totalCount / limit),
					},
				},
				'Authors retrieved successfully'
			)
		);
	}

	@AsyncHandler()
	async getAuthorsForUser(req: Request, res: Response): Promise<void> {
		const rows = await this.authorInteractor.getAuthorsForUser();

		res.status(200).json(
			new ApiResponse(
				200,
				{
					rows,
					pagination: {
						total: 0,
						perPage: 0,
						currentPage: 0,
						totalPages: 0,
					},
				},
				'Authors retrieved successfully (user)'
			)
		);
	}

	@AsyncHandler()
	async getAuthorById(req: Request, res: Response) {
		const { id } = req.params;
		const author = await this.authorInteractor.getAuthorById(Number(id));
		res
			.status(200)
			.json(new ApiResponse(200, author, 'Author retrieved successfully'));
	}

	@AsyncHandler()
	async deleteAuthor(req: Request, res: Response) {
		const { id } = req.params;
		await this.authorInteractor.deleteAuthor(Number(id));
		res
			.status(200)
			.json(new ApiResponse(200, null, 'Author deleted successfully'));
	}
}
