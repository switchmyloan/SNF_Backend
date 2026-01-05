import { LoanApplicationController } from '@src/controller';
import { INTERFACE_TYPE } from '@src/types';
import { container } from 'container/index';
import { Router } from "express";

const adminLonApplicationRoutes = Router();

const loanApplicationController = container.get<LoanApplicationController>(
	INTERFACE_TYPE.LoanApplicationController
);

adminLonApplicationRoutes.route('/');

adminLonApplicationRoutes
	.route('/partner-leads')
	.get(loanApplicationController.onPartnersLeads.bind(loanApplicationController));

adminLonApplicationRoutes
	.route('/')
	.get(loanApplicationController.onGetLeads.bind(loanApplicationController));

adminLonApplicationRoutes
	.route('/:id')
	.get(loanApplicationController.onGetLeadsById.bind(loanApplicationController));




export default adminLonApplicationRoutes;