import { Column, Entity,Index  } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

@Index(['category'], { unique: true })
@Entity({ name: 'our_products' })
export class OurProduct extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  category!: string;

  @Column({ type: 'json', nullable: false })
  qaList!: { question: string; answer: string }[];

  @Column({ type: 'json', nullable: true })
	schema?: object;

  @Column({ type: 'boolean', default: false })
  isFeatured!: boolean;
}
