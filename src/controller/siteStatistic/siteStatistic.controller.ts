import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { AsyncHandler } from '../../utils';
import ApiResponse from '../../utils/helper/ApiResponse';
import { INTERFACE_TYPE } from 'types/inversify.types';
import { ISiteStatisticInteractor } from '@src/interfaces';

@injectable()
export class SiteStatisticController {
    private siteStatisticInteractor: ISiteStatisticInteractor;

    constructor(
        @inject(INTERFACE_TYPE.SiteStatisticInteractor)
        siteStatisticInteractor: ISiteStatisticInteractor
    ) {
        this.siteStatisticInteractor = siteStatisticInteractor;
    }


    @AsyncHandler()
    async onGetSiteStatistic(req: Request, res: Response): Promise<void> {
        const siteStatistic = await this.siteStatisticInteractor.findAll();

        res.status(200).json(
            new ApiResponse(
                200,
                {
                    rows: siteStatistic,
                },
                'Site Statistics retrieved successfully'
            )
        );
    }


    @AsyncHandler()
    async onCreateSiteStatistic(req: Request, res: Response): Promise<void> {
        const file = req.file;
        const newStat = await this.siteStatisticInteractor.create(req.body, file);
        res.status(201).json(new ApiResponse(201, newStat, 'Site Statistic created successfully'));
    }

    @AsyncHandler()
    async onUpdateSiteStatistic(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const file = req.file;
        const updated = await this.siteStatisticInteractor.update(Number(id), req.body, file);
        res.status(200).json(new ApiResponse(200, updated, 'Site Statistic updated successfully'));
    }
}