import { Router } from 'express';
import adminRoutes from './admin.routes';
import userRoutes from './user.routes';

const authorRouter = Router();

authorRouter.use('/admin', adminRoutes);
authorRouter.use('/', userRoutes);

export default authorRouter;
