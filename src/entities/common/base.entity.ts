import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
	@PrimaryGeneratedColumn({ unsigned: true })
	id!: number;

	@Column({ default: true })
	isActive!: boolean;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	// FK column
	@Column({ name: 'created_by', nullable: true })
	created_by!: number;

	@Column({ name: 'modified_by', nullable: true })
	modified_by!: number;
}
