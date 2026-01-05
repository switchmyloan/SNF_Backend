import { Router } from 'express';
import adminRoutes from './admin.routes';
import userRoutes from './user.routes';

const tagRouter = Router();

tagRouter.use('/', userRoutes);
tagRouter.use('/admin', adminRoutes);

export default tagRouter;
