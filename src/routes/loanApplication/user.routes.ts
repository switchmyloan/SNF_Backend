import { Router } from 'express';
import { container } from 'container/index';
import { LoanApplicationController } from '@src/controller';
import validate from '@src/middleware/validate';
import { loanApplicationSchema } from '@src/DTO';
import { INTERFACE_TYPE } from '@src/types';

const userRoutes = Router();

const loanApplicationController = container.get<LoanApplicationController>(
	INTERFACE_TYPE.LoanApplicationController
);

userRoutes
	.route('/')
	.post(validate({ body: loanApplicationSchema }),
	loanApplicationController.onLoanApplicationSubmit.bind(loanApplicationController));

export default userRoutes;
