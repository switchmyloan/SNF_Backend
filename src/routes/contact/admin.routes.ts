import { INTERFACE_TYPE } from '@src/types/inversify.types';
import { Router } from 'express';
import { container } from 'container/index';
import { ContactController } from '@src/controller';

const adminRoutes = Router();

const contactController = container.get<ContactController>(
	INTERFACE_TYPE.ContactController
);

adminRoutes.route('/').get(contactController.getAll.bind(contactController));

export default adminRoutes;
