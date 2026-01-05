import { Blog } from '@src/entities/master/blog.entity';
import { IBlogInteractor } from '@src/interfaces/interactor/IBlogInteractor';
import { IBlogRepository } from '@src/interfaces/repository/IBlogRepository';
import { injectable, inject } from 'inversify';
import { INTERFACE_TYPE } from '../../types/inversify.types';
import { ApiError } from '@src/utils';
import { Category, Tag } from '@src/entities';
import { BlogDetailDTO } from '@src/DTO/blog/blog.dto';

@injectable()
export class BlogInteractor implements IBlogInteractor {
	private repository: IBlogRepository;

	constructor(
		@inject(INTERFACE_TYPE.BlogRepository)
		repository: IBlogRepository
	) {
		this.repository = repository;
	}

	async createBlog(data: Partial<Blog>): Promise<BlogDetailDTO> {
	// Handle tags
	if (data.tags) {
		let tags = data.tags;

		if (typeof tags === 'string') {
			try {
				tags = JSON.parse(tags);
			} catch {
				tags = [];
			}
		}

		if (!Array.isArray(tags)) {
			tags = [tags];
		}

		data.tags = tags
			.map((tag) => {
				if (typeof tag === 'object' && tag !== null && 'id' in tag) {
					const id = Number(tag.id);
					if (!isNaN(id) && id > 0) return { id };
				} else if (!isNaN(Number(tag))) {
					return { id: Number(tag) };
				}
				return null;
			})
			.filter(Boolean) as Tag[];
	}

	// ✅ Handle categories (same logic)
	if (data.categories) {
		let categories = data.categories;

		if (typeof categories === 'string') {
			try {
				categories = JSON.parse(categories);
			} catch {
				categories = [];
			}
		}

		if (!Array.isArray(categories)) {
			categories = [categories];
		}

		data.categories = categories
			.map((category) => {
				if (typeof category === 'object' && category !== null && 'id' in category) {
					const id = Number(category.id);
					if (!isNaN(id) && id > 0) return { id };
				} else if (!isNaN(Number(category))) {
					return { id: Number(category) };
				}
				return null;
			})
			.filter(Boolean) as Category[];
	}

	// Create blog entity
	const blog = await this.repository.create(data);

	return new BlogDetailDTO(blog);
}


	async updateBlog(id: number, data: Partial<Blog>): Promise<BlogDetailDTO> {
		const updatedBlog = await this.repository.update(id, data);
		return new BlogDetailDTO(updatedBlog);
	}

	async getBlogs(
		limit: number,
		offset: number
	): Promise<{ rows: BlogDetailDTO[]; totalCount: number }> {
		const { data, totalCount } = await this.repository.findAll(limit, offset);
		const blogs = BlogDetailDTO.fromEntities(data);
		return { rows: blogs, totalCount };
	}

	async getByIdBlog(id: number): Promise<BlogDetailDTO> {
		const blog = await this.repository.findById(id);
		if (!blog) {
			throw new ApiError(200, 'Blog not found');
		}
		return new BlogDetailDTO(blog);
	}

	async archiveBlog(id: number): Promise<BlogDetailDTO> {
		const archivedBlog = await this.repository.archive(id);
		if (!archivedBlog) {
			throw new ApiError(404, 'Blog not found');
		}
		return new BlogDetailDTO(archivedBlog);
	}

	async updateStatus(id: number, status: string): Promise<BlogDetailDTO> {
		const updatedBlog = await this.repository.updateBlogStatus(
			id,
			status as 'review' | 'published' | 'archived'
		);
		return new BlogDetailDTO(updatedBlog);
	}

	async deleteBlog(id: number): Promise<void> {
		return await this.repository.deleteBlog(id);
	}

	async getArchivedBlogs(
		limit: number,
		offset: number
	): Promise<BlogDetailDTO[]> {
		const blogs = await this.repository.getArchivedBlogs(limit, offset);
		return BlogDetailDTO.fromEntities(blogs);
	}

	async getPublishedBlogs(
		limit: number,
		offset: number
	): Promise<BlogDetailDTO[]> {
		const blogs = await this.repository.findPublishedBlogs(limit, offset);
		return BlogDetailDTO.fromEntities(blogs);
	}

	async getPublishedBlogBySlug(slug: string): Promise<BlogDetailDTO> {
		const blog = await this.repository.findBySlug(slug, 'published');
		if (!blog) {
			throw new ApiError(400, 'Published blog not found');
		}
		return new BlogDetailDTO(blog);
	}

	async getPublishedBlogById(id: number): Promise<BlogDetailDTO | null> {
		const blog = await this.repository.findOneByStatus(id, 'published');
		if (!blog) {
			return null;
		}
		return new BlogDetailDTO(blog);
	}
}
