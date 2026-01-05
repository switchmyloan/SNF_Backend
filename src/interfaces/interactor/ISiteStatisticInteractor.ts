import { SiteStatistic } from "@src/entities";

export interface ISiteStatisticInteractor {
    findAll(): Promise<SiteStatistic[]>;
    create(data: Partial<SiteStatistic>, file?: Express.Multer.File): Promise<SiteStatistic>;
    update(id: number, data: Partial<SiteStatistic>, file?: Express.Multer.File): Promise<SiteStatistic>;
}