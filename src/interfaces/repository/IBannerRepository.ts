import { Banner } from '@src/entities/master/banner.entity';

export interface IBannerRepository {
	create(data: Partial<Banner>): Promise<Banner>;
	update(id: number, data: Partial<Banner>): Promise<Banner>;
	getById(id: number): Promise<Banner | null>;
	delete(id: number): Promise<void>;
	findAll(
		limit: number,
		offset: number
	): Promise<{ rows: Banner[]; totalCount: number }>;
	findActive(): Promise<Banner[]>;
}
