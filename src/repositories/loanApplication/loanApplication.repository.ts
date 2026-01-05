import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { AppDataSource } from '@src/config/data-source';
import { ILoanApplicationRepository } from '@src/interfaces/repository';
import { LoanApplication } from '@src/entities';

@injectable()
export class LoanApplicationRepository implements ILoanApplicationRepository {
    private readonly loanApplicationRepository: Repository<LoanApplication>;

    constructor() {
        this.loanApplicationRepository = AppDataSource.getRepository(LoanApplication);
    }

    async create(data: Partial<LoanApplication>): Promise<LoanApplication> {
        const loanApplication = this.loanApplicationRepository.create(data);
        return this.loanApplicationRepository.save(loanApplication);
    }

    async findLeads(): Promise<[LoanApplication[]]> {
        const [leads] = await this.loanApplicationRepository.findAndCount({
            order: { updatedAt: 'DESC' }
        });
        return [leads];
    }

    async findAll(): Promise<[LoanApplication[]]> {
        const [users] = await this.loanApplicationRepository.findAndCount({
            order: { updatedAt: 'DESC' }
        });

        return [users];
    }

    // async findLeads(limit: number, offset: number): Promise<[LoanApplication[], number]> {
    //     return this.loanApplicationRepository.findAndCount({
    //         order: { updatedAt: 'DESC' },
    //         take: limit,
    //         skip: offset,
    //     });
    // }
    async findLeadsById(id: number): Promise<LoanApplication | null> {
        return this.loanApplicationRepository.findOneBy({ id: id });

    }
}
