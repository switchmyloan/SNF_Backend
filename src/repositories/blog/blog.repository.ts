import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { Blog, BlogStatus } from '@src/entities/master/blog.entity';
import { IBlogRepository } from '@src/interfaces/repository/IBlogRepository';
import { AppDataSource } from '@src/config/data-source';
import ApiError from '@src/utils/helper/ApiError';
import { Category, Tag } from '@src/entities';

@injectable()
export class BlogRepository implements IBlogRepository {
	private readonly blogRepository: Repository<Blog>;
	private readonly tagRepository: Repository<Tag>;
	private readonly categoryRepository: Repository<Category>;
	constructor() {
		this.blogRepository = AppDataSource.getRepository(Blog);
		this.tagRepository = AppDataSource.getRepository(Tag);
		this.categoryRepository = AppDataSource.getRepository(Category);
	}

	async create(data: Partial<Blog>): Promise<Blog> {
		const blog = this.blogRepository.create(data);
		return await this.blogRepository.save(blog);
	}

	async update(id: number, data: Partial<Blog>): Promise<Blog> {
		const existingBlog = await this.blogRepository.findOne({
			where: { id },
			relations: ['tags', 'author', 'categories'],
		});

		if (!existingBlog) {
			throw new ApiError(404, `Blog with ID ${id} not found`);
		}

		Object.assign(existingBlog, data);

		if (data.tags) {
			const parsedTags: Tag[] = Array.isArray(data.tags)
				? data.tags
				: JSON.parse(data.tags as string);

			const tagIds = parsedTags.map((tag: Tag) => tag.id);

			const updatedTags = await this.tagRepository.findByIds(tagIds);

			if (updatedTags.length !== tagIds.length) {
				throw new ApiError(400, 'Some tags are invalid');
			}
			existingBlog.tags = updatedTags;
		}


		if (data.categories) {
		const parsedCategories: Category[] = Array.isArray(data.categories)
			? data.categories
			: JSON.parse(data.categories as string);

		const categoryIds = parsedCategories.map((cat: Category) => cat.id);
		const updatedCategories = await this.categoryRepository.findByIds(categoryIds);

		if (updatedCategories.length !== categoryIds.length) {
			throw new ApiError(400, 'Some categories are invalid');
		}

		existingBlog.categories = updatedCategories;
	}

		if (data.metaImage) {
			existingBlog.metaImage = data.metaImage;
		}
		await this.blogRepository.save(existingBlog);
		return this.blogRepository.findOneOrFail({
			where: { id },
			relations: ['tags', 'author', 'categories'],
		});
	}

	async findAll(
		limit?: number,
		offset?: number
	): Promise<{ data: Blog[]; totalCount: number }> {
		const [data, totalCount] = await this.blogRepository.findAndCount({
			take: limit,
			skip: offset,
			order: { id: 'DESC' },
			relations: ['author', 'tags', 'categories'],
			select: {
				id: true,
				title: true,
				slug: true,
				description: true,
				content: true,
				status: true,
				readTime: true,
				isFeatured: true,
				metaTitle: true,
				metaDescription: true,
				metaImage: true,
				metaKeywords: true,
				author: {
					id: true,
					name: true,
				},
				tags: {
					id: true,
					name: true,
				},
				categories: {
					id: true,
					name: true,
				},
			},
		});
		return { data, totalCount };
	}

	async findById(id: number): Promise<Blog> {
		const blog = await this.blogRepository.findOneOrFail({
			where: { id },
			relations: ['author', 'tags'],
		});

		return blog;
	}

	async findBySlug(slug: string): Promise<Blog | null> {
		return await this.blogRepository.findOne({ where: { slug } });
	}

	async archive(id: number): Promise<Blog> {
		const blog = await this.blogRepository.findOne({ where: { id } });

		if (!blog) {
			throw new ApiError(400, `Blog with not found`);
		}

		blog.status = 'archived' as BlogStatus;
		return await this.blogRepository.save(blog);
	}

	async updateBlogStatus(
		id: number,
		status: 'review' | 'published' | 'archived'
	): Promise<Blog> {
		const blog = await this.blogRepository.findOne({ where: { id } });

		if (!blog) {
			throw new ApiError(404, `Blog with ID ${id} not found`);
		}

		blog.status = status as BlogStatus;
		return await this.blogRepository.save(blog);
	}

	async getArchivedBlogs(limit: number, offset: number): Promise<Blog[]> {
		return await this.blogRepository.find({
			where: { status: 'archived' as BlogStatus },
			relations: ['author', 'tags'],
			take: limit,
			skip: offset,
			order: { id: 'DESC' },
		});
	}

	async deleteBlog(id: number): Promise<void> {
		const result = await this.blogRepository.delete(id);

		if (result.affected === 0) {
			throw new ApiError(404, `Blog with ID ${id} not found`);
		}
	}

	async countAll(): Promise<number> {
		return this.blogRepository.count();
	}

	async findPublishedBlogs(
		limit: number,
		offset: number,
		isFeatured?: boolean
	): Promise<Blog[]> {
		return await this.blogRepository.find({
			where: {
				status: BlogStatus.PUBLISHED,
				isActive: true,
				...(isFeatured !== undefined && { isFeatured }),
			},
			take: limit,
			skip: offset,
			order: { createdAt: 'DESC' },
			relations: ['tags', 'author'],
		});
	}

	async findOneByStatus(id: number, status: string): Promise<Blog | null> {
		return await this.blogRepository.findOne({
			where: {
				id,
				status: status as BlogStatus,
				isActive: true,
			},
			relations: ['tags', 'author'],
		});
	}
}
