import { LoanApplication } from "@src/entities";

export interface ILoanApplicationInteractor {
	create(data: Partial<LoanApplication>): Promise<LoanApplication>;

	findLeads(
	): Promise<{ users: LoanApplication[] }>;
	findAll(
	): Promise<{ users: LoanApplication[] }>;

	findLeadsById(
		id: number
	): Promise<LoanApplication | null>;
}