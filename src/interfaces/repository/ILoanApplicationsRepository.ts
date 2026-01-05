import { LoanApplication } from "@src/entities";

export interface ILoanApplicationRepository {

    create(data: Partial<LoanApplication>): Promise<LoanApplication>;

    findLeads(
	): Promise<[LoanApplication[]]>
    findAll(
	): Promise<[LoanApplication[]]>

    findLeadsById(
		id: number
	): Promise<LoanApplication | null>
}