import { Router } from 'express';
import { container } from 'container/index';
import { SiteStatisticController } from '@src/controller';
import { INTERFACE_TYPE } from '@src/types';

const userRoutes = Router();

const siteStatisticController = container.get<SiteStatisticController>(
    INTERFACE_TYPE.SiteStatisticController
);

userRoutes
    .route('/')
    .get(siteStatisticController.onGetSiteStatistic.bind(siteStatisticController))
    .post(siteStatisticController.onCreateSiteStatistic.bind(siteStatisticController));

userRoutes
    .route('/:id')
    .put(siteStatisticController.onUpdateSiteStatistic.bind(siteStatisticController));

export default userRoutes;
