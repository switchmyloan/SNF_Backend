import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

@Index(['createdAt'])
@Index(['email'])
@Entity({ name: 'contacts' })
export class Contact extends BaseEntity {
	@Column({ type: 'varchar', length: 100, nullable: true })
	fullName!: string;

	@Column({ type: 'varchar', length: 100, nullable: true })
	email!: string | null;

	@Column({ type: 'varchar', length: 10, nullable: true })
	mobile!: string | null;

	@Column({ type: 'varchar', length: 255, nullable: true })
	interest!: string | null;

	@Column({ type: 'varchar', nullable: true })
	comment!: string | null;

    @Column({ nullable: true })
    ipAddress?: string;
}
