import { Router } from 'express';
import adminRoutes from './admin.routes';
import userRoutes from './user.routes';

const faqRouter = Router();

faqRouter.use('/', userRoutes);
faqRouter.use('/admin', adminRoutes);

export default faqRouter;
