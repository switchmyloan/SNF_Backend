import { Router } from 'express';
import adminRoutes from './admin.routes';
import userRoutes from './user.routes';

const blogRouter = Router();

blogRouter.use('/admin', adminRoutes);
blogRouter.use('/', userRoutes);

export default blogRouter;
