import { Blog } from '../../entities/master/blog.entity';
import { BlogDetailDTO, BlogSummaryDTO } from '../../DTO/blog/blog.dto';

export interface IBlogInteractor {
	createBlog(data: Partial<Blog>): Promise<BlogDetailDTO>;
	updateBlog(id: number, data: Partial<Blog>): Promise<BlogDetailDTO>;
	getBlogs(
		limit: number,
		offset: number
	): Promise<{ rows: BlogSummaryDTO[]; totalCount: number }>;
	getByIdBlog(id: number): Promise<BlogDetailDTO | null>;
	archiveBlog(id: number): Promise<BlogDetailDTO>;
	updateStatus(id: number, status: string): Promise<BlogDetailDTO>;
	getArchivedBlogs(limit: number, offset: number): Promise<BlogSummaryDTO[]>;
	getPublishedBlogs(
		limit: number,
		offset: number,
		isFeatured?: boolean
	): Promise<BlogSummaryDTO[]>;
	getPublishedBlogById(id: number): Promise<BlogDetailDTO | null>;
	getPublishedBlogBySlug(slug: string): Promise<BlogDetailDTO | null>;
	deleteBlog(id: number): Promise<void>;
}
