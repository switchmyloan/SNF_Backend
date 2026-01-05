import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { AppDataSource } from '@src/config/data-source';
import { ApiError } from '@src/utils';
import { ISiteStatisticRepository } from '@src/interfaces';
import { SiteStatistic } from '@src/entities';

@injectable()
export class SiteStatisticRepository implements ISiteStatisticRepository {
    private readonly siteStatisticRepository: Repository<SiteStatistic>;

    constructor() {
        this.siteStatisticRepository = AppDataSource.getRepository(SiteStatistic);
    }

    async findAll(): Promise<SiteStatistic[]> {
        return this.siteStatisticRepository.find();
    }

    async create(data: Partial<SiteStatistic>): Promise<SiteStatistic> {
        const newStat = this.siteStatisticRepository.create(data);
        return this.siteStatisticRepository.save(newStat);
    }

    async update(id: number, data: Partial<SiteStatistic>): Promise<SiteStatistic> {
        const stat = await this.siteStatisticRepository.findOne({ where: { id } });
        if (!stat) {
            throw new ApiError(404, `Statistic not found with id: ${id}`);
        }
        Object.assign(stat, data);
        return this.siteStatisticRepository.save(stat);
    }

    async findById(id: number): Promise<SiteStatistic | null> {
        const stats = await this.siteStatisticRepository.findOneBy({ id });
        if (!stats) {
            throw new ApiError(404, 'No Lender Found');
        }
        return stats;
    }
} 