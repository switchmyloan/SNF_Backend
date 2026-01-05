import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { AppDataSource } from '@src/config/data-source';
import { IUtMHeadersRepository } from '@src/interfaces/repository';
import { UtmHeaders } from '@src/entities';

@injectable()
export class UtmHeadersRepository implements IUtMHeadersRepository {
    private readonly utmHeadersRepository: Repository<UtmHeaders>;

    constructor() {
        this.utmHeadersRepository = AppDataSource.getRepository(UtmHeaders);
    }

    async create(data: Partial<UtmHeaders>): Promise<UtmHeaders> {
        const utmHeader = this.utmHeadersRepository.create(data);
        return this.utmHeadersRepository.save(utmHeader);
    }

    async findAll(): Promise<UtmHeaders[]> {
        const utmHeaders = await this.utmHeadersRepository.find({
            order: { updatedAt: 'DESC' }
        });
        return utmHeaders;
    }

    async findAllWithLoanApplication(): Promise<UtmHeaders[]> {
        const utmHeaders = await this.utmHeadersRepository.find({
            order: { updatedAt: 'DESC' },
            relations: ['loanApplication'],
        });
        return utmHeaders;
    }
}
