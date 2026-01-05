import { Router } from 'express';
import adminRoutes from './admin.routes';
import userRoutes from './user.routes';

const categoryRouter = Router();

categoryRouter.use('/', userRoutes);
categoryRouter.use('/admin', adminRoutes);

export default categoryRouter;
