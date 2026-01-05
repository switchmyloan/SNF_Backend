import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { IBlogInteractor, ITagInteractor } from '@src/interfaces';
import { INTERFACE_TYPE } from '@src/types';
import { ApiResponse, AsyncHandler } from '@src/utils';

@injectable()
export class BlogController {
	private blogInteractor: IBlogInteractor;
	private tagInteractor: ITagInteractor;

	constructor(
		@inject(INTERFACE_TYPE.BlogInteractor) blogInteractor: IBlogInteractor,
		@inject(INTERFACE_TYPE.TagInteractor) tagInteractor: ITagInteractor
	) {
		this.blogInteractor = blogInteractor;
		this.tagInteractor = tagInteractor;
	}

	@AsyncHandler()
	async createBlog(req: Request, res: Response) {
		const data = req.body;
		const file = req.file as Express.Multer.File;
		if (file) {
			data.metaImage = `/public/blogs/${file.filename}`;
		}
		const newBlog = await this.blogInteractor.createBlog(data);
		res
			.status(201)
			.json(new ApiResponse(201, newBlog, 'Blog created successfully'));
	}

	@AsyncHandler()
	async updateBlog(req: Request, res: Response) {
		const { id } = req.params;
		const data = req.body;
		const file = req.file as Express.Multer.File;
		if (file) {
			data.metaImage = `/public/blogs/${file.filename}`;
		}
		const updatedBlog = await this.blogInteractor.updateBlog(Number(id), data);
		res
			.status(200)
			.json(new ApiResponse(200, updatedBlog, 'Blog updated successfully'));
	}

	@AsyncHandler()
	async getBlogs(req: Request, res: Response) {
		const { perPage = '10', currentPage = '1' } = req.query;
		const limit = Math.max(Number(perPage), 1);
		const page = Math.max(Number(currentPage), 1);
		const offset = (page - 1) * limit;

		const { rows, totalCount } = await this.blogInteractor.getBlogs(
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
				'Blogs retrieved successfully'
			)
		);
	}

	@AsyncHandler()
	async getByIdBlog(req: Request, res: Response) {
		const { id } = req.params;
		const blog = await this.blogInteractor.getByIdBlog(Number(id));
		res
			.status(200)
			.json(new ApiResponse(200, blog, 'Blog retrieved successfully'));
	}

	@AsyncHandler()
	async archiveBlog(req: Request, res: Response) {
		const { id } = req.params;
		const archivedBlog = await this.blogInteractor.archiveBlog(Number(id));
		res
			.status(200)
			.json(new ApiResponse(200, archivedBlog, 'Blog archived successfully'));
	}

	@AsyncHandler()
	async getArchivedBlogs(req: Request, res: Response) {
		const { perPage = '10', currentPage = '1' } = req.query;
		const limit = Math.max(Number(perPage), 1);
		const page = Math.max(Number(currentPage), 1);
		const offset = (page - 1) * limit;

		const blogs = await this.blogInteractor.getArchivedBlogs(limit, offset);

		res.status(200).json(
			new ApiResponse(
				200,
				{
					rows: blogs,
					pagination: {
						total: blogs.length,
						perPage: limit,
						currentPage: page,
						totalPages: Math.ceil(blogs.length / limit),
					},
				},
				'Archived blogs retrieved successfully'
			)
		);
	}

	@AsyncHandler()
	async deleteBlog(req: Request, res: Response) {
		const { id } = req.params;
		await this.blogInteractor.deleteBlog(Number(id));
		res
			.status(204)
			.json(new ApiResponse(204, null, 'Blog deleted successfully'));
	}

	@AsyncHandler()
	async getPublishedBlogs(req: Request, res: Response) {
		const limit = req.query.limit ? Number(req.query.limit) : 10;
		const offset = req.query.offset ? Number(req.query.offset) : 0;
		const isFeaturedParam = req.query.isFeatured;
		const isFeatured =
			isFeaturedParam !== undefined ? isFeaturedParam === 'true' : undefined;

		const blogs = await this.blogInteractor.getPublishedBlogs(
			limit,
			offset,
			isFeatured
		);
		res
			.status(200)
			.json(
				new ApiResponse(200, blogs, 'Published blogs retrieved successfully')
			);
	}

	@AsyncHandler()
	async getPublishedBlogById(req: Request, res: Response) {
		const id = Number(req.params.id);

		if (isNaN(id) || id <= 0) {
			res.status(400).json(new ApiResponse(400, null, 'Invalid blog ID'));
			return;
		}

		const blog = await this.blogInteractor.getPublishedBlogById(id);

		if (!blog) {
			res.status(404).json(new ApiResponse(404, null, 'Blog not found'));
			return;
		}

		res
			.status(200)
			.json(
				new ApiResponse(200, blog, 'Published blog retrieved successfully')
			);
	}

	@AsyncHandler()
	async getPublishedBlogBySlug(req: Request, res: Response) {
		const { slug } = req.params;
		const blog = await this.blogInteractor.getPublishedBlogBySlug(slug);
		res
			.status(200)
			.json(
				new ApiResponse(200, blog, 'Published blog retrieved successfully')
			);
	}
}
