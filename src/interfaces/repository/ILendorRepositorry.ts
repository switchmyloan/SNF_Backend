import { Lender } from '@src/entities';

export interface ILenderRepository {
	create(data: Partial<Lender>): Promise<Lender>;
	// update(id: number, data: Partial<Lender>): Promise<Lender>;

	update(
		lenderId: number,
		lenderData: Partial<Lender>,
		features: { id?: number; title: string }[]
	): Promise<Lender>;

	findAll(
		limit: number,
		offset: number,
		search: string
	): Promise<{ data: Lender[]; totalCount: number }>;
	findById(id: number): Promise<Lender | null>;
	delete(id: number): Promise<void>;
	findAllLender(filters: {
		isActive?: boolean;
		orderBy?: keyof Lender;
		orderDirection?: 'ASC' | 'DESC';
	}): Promise<Lender[]>;
	createFeatures(
		features: { title: string; lender_xid: number }[]
	): Promise<void>;
	findAllActiveLenders(): Promise<Lender[] | null>;
}
