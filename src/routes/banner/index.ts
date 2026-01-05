import { Router } from 'express';
import adminRoutes from './admin.routes';
import userRoutes from './user.routes';


const bannerRouter = Router();

bannerRouter.use('/admin', adminRoutes);
bannerRouter.use('/', userRoutes);

export default bannerRouter;
