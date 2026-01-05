import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

@Entity('site_statistics')
export class SiteStatistic extends BaseEntity {
  @Column({ length: 100 })
  title!: string;

  @Column({ length: 50 })
  value!: string;

  @Column({ length: 255, nullable: true })
  description!: string;

  @Column({ length: 255, nullable: true })
  icon!: string;

  @Column({ default: 0 })
  orderIndex!: number;
}
