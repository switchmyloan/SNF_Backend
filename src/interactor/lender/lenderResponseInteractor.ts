import { inject, injectable } from 'inversify';
import { ILenderResponseInteractor } from '@src/interfaces/interactor/ILenderResponseInteractor';
import { ILenderResponseRepository } from '@src/interfaces/repository/ILenderResponseRepository';
import { INTERFACE_TYPE } from '@src/types/inversify.types';
import { LenderResponseDTO } from '@src/DTO/lender/lenderResponse.dto';
import { LenderResponse } from '@src/entities';

@injectable()
export class LenderResponseInteractor implements ILenderResponseInteractor {
	constructor(
		@inject(INTERFACE_TYPE.LenderResponseRepository)
		private readonly lenderResponseRepo: ILenderResponseRepository
	) {}

	async saveBulkResponses(
		data: Partial<LenderResponse>[]
	): Promise<LenderResponse[]> {
		return this.lenderResponseRepo.createBulkLenderResponses(data);
	}

	async getOffers(id: number): Promise<LenderResponseDTO[]> {
		const responses = await this.lenderResponseRepo.getOffers(id);
		return LenderResponseDTO.fromEntities(responses);
	}
}
