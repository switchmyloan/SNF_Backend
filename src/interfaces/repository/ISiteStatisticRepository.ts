import { SiteStatistic } from "@src/entities";

export interface ISiteStatisticRepository {
    findAll(): Promise<SiteStatistic[]>;
    create(data: Partial<SiteStatistic>): Promise<SiteStatistic>;
    update(id: number, data: Partial<SiteStatistic>): Promise<SiteStatistic>;
    findById(id: number): Promise<SiteStatistic | null>
}