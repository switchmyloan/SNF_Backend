import { injectable } from 'inversify';
import { AppDataSource } from '@src/config/data-source';
import { LenderResponse } from '@src/entities/master/lenderResponse.entity';
import { ILenderResponseRepository } from '@src/interfaces/repository/ILenderResponseRepository';

@injectable()
export class LenderResponseRepository implements ILenderResponseRepository {
	private repo = AppDataSource.getRepository(LenderResponse);

	async createBulkLenderResponses(
		data: Partial<LenderResponse>[]
	): Promise<LenderResponse[]> {
		const responses = this.repo.create(data);
		return this.repo.save(responses);
	}

	async getOffers(id: number): Promise<LenderResponse[]> {
		return this.repo.find({
			where: {
				lead_xid: id,
			},
			relations: ['lender'],
			order: {
				isOffer: 'DESC',
			},
		});
	}
}
