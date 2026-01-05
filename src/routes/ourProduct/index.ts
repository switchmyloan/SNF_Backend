import { Router } from 'express';
import adminRoutes from './admin.routes';
import userRoutes from './user.routes';

const ourProductRouter = Router();

ourProductRouter.use('/admin', adminRoutes);
ourProductRouter.use('/', userRoutes);

export default ourProductRouter;
