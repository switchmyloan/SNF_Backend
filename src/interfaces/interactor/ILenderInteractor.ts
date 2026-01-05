import { Lender } from '@src/entities';

export interface ILenderInteractor {
	create(data: Partial<Lender>, file?: Express.Multer.File): Promise<Lender>;
	// update(id: number, data: Partial<Lender>): Promise<Lender>;
	updateLender(
		lenderId: number,
		lenderData: Partial<Lender>,
		features: { id?: number; title: string }[],
		file?: Express.Multer.File
	): Promise<Lender>;

	findAll(
		limit: number,
		offset: number,
		search: string
	): Promise<{ data: Lender[]; totalCount: number }>;
	findById(id: number): Promise<Lender>;
	delete(id: number): Promise<void>;
	findAllLender(): Promise<Lender[] | null>;
	createFeatures(lender_xid: number, features: string[]): Promise<void>;
	findAllActiveLenderMutualFunds(): Promise<Lender[] | null>;
}
