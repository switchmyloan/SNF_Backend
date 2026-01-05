import { ISiteStatisticRepository } from '@src/interfaces';
import { inject, injectable } from 'inversify';
import { INTERFACE_TYPE } from '@src/types/inversify.types';
import { SiteStatistic } from '@src/entities';

@injectable()
export class SiteStatisticInteractor implements ISiteStatisticRepository {
    private siteStatisticRepository: ISiteStatisticRepository;

    constructor(
        @inject(INTERFACE_TYPE.SiteStatisticRepository)
        siteStatisticRepository: ISiteStatisticRepository
    ) {
        this.siteStatisticRepository = siteStatisticRepository;
    }

    async findAll(): Promise<SiteStatistic[]> {
        return this.siteStatisticRepository.findAll();
    }

    async findById(id: number): Promise<SiteStatistic | null> {
        return this.siteStatisticRepository.findById(id);
    }

    async create(data: Partial<SiteStatistic>, file?: Express.Multer.File): Promise<SiteStatistic> {
        if (file) {
            data.icon = `/public/stats-icons/${file.filename}`;
        }
        return this.siteStatisticRepository.create(data);
    }

    async update(id: number, data: Partial<SiteStatistic>, file?: Express.Multer.File): Promise<SiteStatistic> {
        if (file) {
            data.icon = `/public/stats-icons/${file.filename}`;
        }

        if (!file) {
            const existingStats = await this.siteStatisticRepository.findById(Number(id));
            if (existingStats) {
                existingStats.icon = existingStats.icon;
            }
        }
        return this.siteStatisticRepository.update(id, data);
    }
}