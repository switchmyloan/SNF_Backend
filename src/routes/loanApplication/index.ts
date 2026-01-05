import { Router } from 'express';
import loanApplicationRoutes from './user.routes';
import adminLonApplicationRoutes from "./admin.route";

const loanApplicationRouter = Router();

loanApplicationRouter.use('/admin', adminLonApplicationRoutes)
loanApplicationRouter.use('/', loanApplicationRoutes);

export default loanApplicationRouter;