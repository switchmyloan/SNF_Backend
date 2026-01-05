import { LenderResponse } from '@src/entities';

export interface ILenderResponseRepository {
	createBulkLenderResponses(
		data: Partial<LenderResponse>[]
	): Promise<LenderResponse[]>;
	getOffers(id: number): Promise<LenderResponse[]>;
}
