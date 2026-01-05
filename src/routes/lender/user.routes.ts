import { Router } from 'express';
import { container } from '@src/container';
import { LenderController } from '@src/controller';
import { INTERFACE_TYPE } from '@src/types';

const userRoutes = Router();

const lenderController = container.get<LenderController>(
	INTERFACE_TYPE.LenderController
);

userRoutes
	.route('/')
	.get(lenderController.getLendersUser.bind(lenderController));

export default userRoutes;
