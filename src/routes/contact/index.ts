import { Router } from 'express';

import adminRoutes from './admin.routes';
import userRoutes from './user.routes';

const contactRouter = Router();

contactRouter.use('/', userRoutes);
contactRouter.use('/admin', adminRoutes);

export default contactRouter;
