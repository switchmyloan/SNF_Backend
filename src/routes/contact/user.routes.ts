import { Router } from 'express';
import { INTERFACE_TYPE } from '@src/types/inversify.types';
import { container } from 'container/index';
import { ContactController } from '@src/controller';


const userRoutes = Router();

const contactController = container.get<ContactController>(
	INTERFACE_TYPE.ContactController
);

userRoutes.route('/').post(contactController.create.bind(contactController));

export default userRoutes;
