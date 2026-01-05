import { Blog, Tag } from '@src/entities';
import { TagDTO, TagSummaryDTO } from '../tag/tag.entity';
import { AuthorDTO, AuthorSummaryDTO } from '../author/author.dto';
import { CategoryDTO } from '../category/category.dto';

/**
 * Detailed Blog DTO
 * - Used for single blog response (e.g., GET /blogs/:id or /blogs/:slug)
 * - Contains additional fields like content, meta, timestamps
 */
export class BlogDetailDTO {
	id: number;
	title: string;
	slug: string;
	description: string;
	content: string;
	readTime: number;
	status: string;
	isFeatured: boolean;

	metaTitle?: string;
	metaDescription?: string;
	metaImage?: string;
	metaKeywords?: string;

	metadata?: object;

	author?: AuthorDTO;
	tags?: TagDTO[];
	categories?: CategoryDTO[];

	schema?: object;

	createdAt: Date;
	updatedAt: Date;

	constructor(blog: Blog) {
		this.id = blog.id;
		this.title = blog.title;
		this.slug = blog.slug;
		this.description = blog.description;
		this.content = blog.content;
		this.readTime = blog.readTime;
		this.status = blog.status;
		this.isFeatured = blog.isFeatured;

		this.metaTitle = blog.metaTitle;
		this.metaDescription = blog.metaDescription;
		this.metaImage = blog.metaImage;
		this.metaKeywords = blog.metaKeywords;
		this.metadata = blog.metadata;
		this.schema = blog.schema;

		if (blog.author) {
			this.author = new AuthorDTO(blog.author);
		}

		if (blog.tags?.length) {
			this.tags = blog.tags.map((tag: Tag) => new TagDTO(tag));
		}

		if (blog.categories?.length) {
			this.categories = blog.categories.map((cat) => new CategoryDTO(cat));
		}

		this.createdAt = blog.createdAt;
		this.updatedAt = blog.updatedAt;
	}

	/**
	 * Factory method for mapping arrays
	 */
	static fromEntities(blogs: Blog[]): BlogDetailDTO[] {
		return blogs.map((blog) => new BlogDetailDTO(blog));
	}

	/**
	 * Converts to a summary DTO
	 */
	toSummary(): BlogSummaryDTO {
		return new BlogSummaryDTO(this);
	}

	/**
	 * Factory method for mapping arrays into summaries
	 */
	static toSummaries(blogs: Blog[]): BlogSummaryDTO[] {
		return blogs.map((blog) => new BlogSummaryDTO(blog));
	}
}

/**
 * Lightweight summary version of BlogDetailDTO
 * - Used for lists or nested inside other DTOs
 */
export class BlogSummaryDTO {
	id: number;
	title: string;
	slug: string;
	description: string;
	readTime: number;
	status: string;
	isFeatured: boolean;

	author?: AuthorSummaryDTO;
	tags?: TagSummaryDTO[];

	createdAt: Date;
	updatedAt: Date;

	constructor(blog: Blog | BlogDetailDTO) {
		this.id = blog.id;
		this.title = blog.title;
		this.slug = blog.slug;
		this.description = blog.description;
		this.readTime = blog.readTime;
		this.status = blog.status;
		this.isFeatured = blog.isFeatured;

		if (blog instanceof BlogDetailDTO) {
			if (blog.author) {
				this.author = blog.author.toSummary();
			}
			if (blog.tags?.length) {
				this.tags = blog.tags.map((tag) => new TagSummaryDTO(tag));
			}
		}

		this.createdAt = blog.createdAt;
		this.updatedAt = blog.updatedAt;
	}
	static toSummaries(blogs: Blog[]): BlogSummaryDTO[] {
		return blogs.map((blog) => new BlogSummaryDTO(blog));
	}
}
