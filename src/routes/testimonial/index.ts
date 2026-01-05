import { Router } from 'express';
import adminRoutes from './admin.routes';
import userRoutes from './user.routes';

const testimonialRouter = Router();

testimonialRouter.use('/', userRoutes);
testimonialRouter.use('/admin', adminRoutes);

export default testimonialRouter;
