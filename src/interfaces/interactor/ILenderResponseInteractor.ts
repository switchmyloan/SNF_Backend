import { LenderResponseDTO } from '@src/DTO/lender/lenderResponse.dto';
import { LenderResponse } from '@src/entities/master/lenderResponse.entity';

export interface ILenderResponseInteractor {
	saveBulkResponses(data: Partial<LenderResponse>[]): Promise<LenderResponse[]>;
	getOffers(id: number): Promise<LenderResponseDTO[]>;
}
