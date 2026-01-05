import { Router } from 'express';
import { container } from 'container/index';
import { SiteStatisticController } from '@src/controller';
import { uploader } from '@src/middleware/uploader';
import { INTERFACE_TYPE } from '@src/types';

const adminRoutes = Router();

const upload = uploader('stats-icons', ['image/jpeg', 'image/png']);

const siteStatisticController = container.get<SiteStatisticController>(
    INTERFACE_TYPE.SiteStatisticController
);

adminRoutes
    .route('/')
    .get(siteStatisticController.onGetSiteStatistic.bind(siteStatisticController))
    .post(upload.single('icon'), siteStatisticController.onCreateSiteStatistic.bind(siteStatisticController));

adminRoutes
    .route('/:id')
    .put(upload.single('icon'), siteStatisticController.onUpdateSiteStatistic.bind(siteStatisticController));

export default adminRoutes;
