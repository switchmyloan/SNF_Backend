import {injectable, inject} from 'inversify';
import { ILoanApplicationRepository } from '@src/interfaces/repository';
import { ILoanApplicationInteractor } from '@src/interfaces/interactor';
import { LoanApplication } from '@src/entities';
import {INTERFACE_TYPE} from '@src/types/inversify.types';

@injectable()
export class LoanApplicationInteractor implements ILoanApplicationInteractor {
    private loanApplicationRepository : ILoanApplicationRepository;

	constructor(
		@inject(INTERFACE_TYPE.LoanApplicationRepository)
		loanApplicationRepository: ILoanApplicationRepository
	) {
		this.loanApplicationRepository = loanApplicationRepository;
	}

	findLeadById(id: number): Promise<{ users: LoanApplication[]; }> {
		throw new Error('Method not implemented.');
	}

    async create(data: Partial<LoanApplication>): Promise<LoanApplication> {
           return await this.loanApplicationRepository.create(data);
    }

	async findLeads(): Promise<{
		users: LoanApplication[];
	}> {
		const [users] = await this.loanApplicationRepository.findLeads();

		return { users };
	}

	async findAll(): Promise<{users: LoanApplication[];}> {
		const [users]  = await this.loanApplicationRepository.findAll();

		return  { users } ;
	}

	// async findLeads(limit: number,offset: number): Promise<{
	// 	users: LoanApplication[];
	// 	totalCount: number;
	// }> {
	// 	const [users, totalCount] = await this.loanApplicationRepository.findLeads(limit, offset);

	// 	return { users, totalCount };
	// }

	async findLeadsById(id:number): Promise<LoanApplication | null> {
		return await this.loanApplicationRepository.findLeadsById(id);
	}
}