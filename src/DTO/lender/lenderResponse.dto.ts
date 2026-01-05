import { LenderResponse } from '@src/entities';
import { LenderDTO } from './lender.dto';

export class LenderResponseDTO {
	isOffer: boolean;
	lender?: LenderDTO;

	constructor(response: LenderResponse) {
		this.isOffer = response.isOffer;
		this.lender = response.lender ? new LenderDTO(response.lender) : undefined;
	}

	static fromEntities(responses: LenderResponse[]): LenderResponseDTO[] {
		return responses.map((res) => new LenderResponseDTO(res));
	}

	toSummary(): LenderResponseSummaryDTO {
		return new LenderResponseSummaryDTO(this);
	}

	static toSummaries(
		responses: LenderResponseDTO[]
	): LenderResponseSummaryDTO[] {
		return responses.map((res) => new LenderResponseSummaryDTO(res));
	}
}

export class LenderResponseSummaryDTO {
	lender?: LenderDTO;

	constructor(response: LenderResponseDTO) {
		this.lender = response.lender;
	}

	static toSummaries(
		responses: LenderResponseDTO[]
	): LenderResponseSummaryDTO[] {
		return responses.map((res) => new LenderResponseSummaryDTO(res));
	}
}
