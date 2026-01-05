import { Blog } from '@src/entities';

export interface IBlogRepository {
	create(data: Partial<Blog>): Promise<Blog>;
	update(id: number, data: Partial<Blog>): Promise<Blog>;
	findAll(
		limit: number,
		offset: number
	): Promise<{ data: Blog[]; totalCount: number }>;
	findById(id: number): Promise<Blog | null>;
	findBySlug(slug: string, status: string): Promise<Blog | null>;
	archive(id: number): Promise<Blog>;
	updateBlogStatus(
		id: number,
		status: 'review' | 'published' | 'archived'
	): Promise<Blog>;
	getArchivedBlogs(limit: number, offset: number): Promise<Blog[]>;
	deleteBlog(id: number): Promise<void>;
	countAll(): Promise<number>;
	findPublishedBlogs(limit: number, offset: number): Promise<Blog[]>;
	findOneByStatus(id: number, status: string): Promise<Blog | null>;
}
