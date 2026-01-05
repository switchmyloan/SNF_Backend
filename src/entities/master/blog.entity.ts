import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	BeforeInsert,
	BeforeUpdate,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Author } from './author.entity';
import { slugify } from 'transliteration'; // or "slugify" package
import { AppDataSource } from '@src/config/data-source';
import { Tag } from './tag.entity';
import { Category } from './category.entity';

export enum BlogStatus {
	DRAFT = 'draft',
	REVIEW = 'review',
	PUBLISHED = 'published',
	ARCHIVED = 'archived',
}

@Entity({ name: 'blogs' })
export class Blog extends BaseEntity {
	@Column({ type: 'varchar', length: 255 })
	title!: string;

	@Index({ unique: true })
	@Column({ type: 'varchar', length: 255 })
	slug!: string;

	@Column({ type: 'text' })
	description!: string;

	@Column({ type: 'text' })
	content!: string;

	@Column({ type: 'enum', enum: BlogStatus, default: BlogStatus.DRAFT })
	status!: BlogStatus;

	@Column({ type: 'int' })
	readTime!: number;

	@Column({ type: 'boolean', default: false })
	isFeatured!: boolean;

	@Column({ type: 'varchar', length: 255, nullable: true })
	metaTitle?: string;

	@Column({ type: 'text', nullable: true })
	metaDescription?: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	metaImage?: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	metaKeywords?: string;

	@Column({ type: 'json', nullable: true })
	metadata?: object;

	@Column({ type: 'json', nullable: true })
	schema?: object;

	// Foreign key to Author
	@Column({ name: 'author_xid', nullable: true })
	author_xid!: number;

	// Associations
	@ManyToOne(() => Author, { nullable: true, onDelete: 'SET NULL' })
	@JoinColumn({ name: 'author_xid' })
	author?: Author;

	@ManyToMany(() => Tag, (tag) => tag.blogs, { cascade: true })
	@JoinTable({
		name: 'blog_tags_link', // link table name
		joinColumn: { name: 'blog_xid', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'tag_xid', referencedColumnName: 'id' },
	})
	tags!: Tag[];


	@ManyToMany(() => Category, (category) => category.blogs, { cascade: true })
	@JoinTable({
		name: 'blog_category_link',
		joinColumn: { name: 'blog_xid', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'category_xid', referencedColumnName: 'id' },
	})
	categories!: Category[];

	/**
	 * Generate unique slug before insert/update
	 */
	// @BeforeInsert()
	// @BeforeUpdate()
	// async generateSlug() {
	// 	if (!this.title) return;

	// 	const repo = AppDataSource.getRepository(Blog);

	// 	const baseSlug = slugify(this.title, { lowercase: true, separator: '-' });
	// 	let uniqueSlug = baseSlug;
	// 	let counter = 1;

	// 	while (await repo.findOne({ where: { slug: uniqueSlug } })) {
	// 		uniqueSlug = `${baseSlug}-${counter++}`;
	// 	}

	// 	this.slug = uniqueSlug;
	// }

	@BeforeInsert()
	@BeforeUpdate()
	setReadTime() {
		if (this.content) {
			const words = this.content.trim().split(/\s+/).length;
			const wordsPerMinute = 200;
			this.readTime = Math.ceil(words / wordsPerMinute);
		}
	}
}
