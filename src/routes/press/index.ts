import { Router } from 'express';
import adminRoutes from './admin.routes';
import userRoutes from './user.routes';


const pressRouter = Router();

pressRouter.use('/admin', adminRoutes);
pressRouter.use('/', userRoutes);

export default pressRouter;
