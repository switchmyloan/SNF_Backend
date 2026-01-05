import { Router } from 'express';
import siteStatisticRoutes from './user.routes';
import adminSiteStatisticRoutes from './admin.routes';

const siteStatisticRouter = Router();

siteStatisticRouter.use('/admin', adminSiteStatisticRoutes)
siteStatisticRouter.use('/', siteStatisticRoutes);

export default siteStatisticRouter;