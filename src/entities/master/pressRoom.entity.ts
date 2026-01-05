import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

export enum PressRoomStatus {
	DRAFT = 'draft',
	REVIEW = 'review',
	PUBLISHED = 'published',
	ARCHIVED = 'archived',
}

@Entity({ name: 'press_rooms' })
@Index(['date', 'order'], { unique: false })
export class PressRoom extends BaseEntity {
	@Column({ type: 'varchar', length: 255, nullable: false })
	title!: string;

	@Column({
		type: 'timestamp',
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
	})
	date!: Date;

	@Column({ type: 'text', nullable: false })
	description!: string;

	@Column({ type: 'varchar', length: 500, nullable: false })
	image!: string;

	@Column({ type: 'varchar', length: 500, nullable: false })
	sourceLogo!: string;

	@Column({ type: 'varchar', length: 1000, nullable: false })
	redirectLink!: string;

	@Column({ type: 'boolean', default: true })
	isActive!: boolean;

	@Column({ type: 'int', default: 0 })
	order!: number;

	@Column({
		type: 'enum',
		enum: PressRoomStatus,
		default: PressRoomStatus.DRAFT,
	})
	status!: PressRoomStatus;

	@Column({ type: 'boolean', default: false })
	isDeleted!: boolean;

	get formattedDate(): string {
		return this.date?.toISOString().split('T')[0] ?? '';
	}
}
