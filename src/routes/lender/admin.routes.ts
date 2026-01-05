import { Router } from 'express';
import { container } from '@src/container';
import { LenderController } from '@src/controller';
import { uploader } from '@src/middleware/uploader';
import { INTERFACE_TYPE } from '@src/types';

const adminRoutes = Router();

const upload = uploader('lender', ['image/jpeg', 'image/png']);

const lenderController = container.get<LenderController>(
	INTERFACE_TYPE.LenderController
);

adminRoutes
	.route('/')
	.post(upload.single('logo'), lenderController.createLender.bind(lenderController))
	.get(lenderController.getLenders.bind(lenderController));

adminRoutes
	.route('/:id')
	.get(lenderController.getLenderById.bind(lenderController))
	.put(upload.single('logo'), lenderController.updateLender.bind(lenderController))
	.delete(lenderController.deleteLender.bind(lenderController));

adminRoutes
	.route('/add-features')
	.post(lenderController.onCreateFeature.bind(lenderController));

export default adminRoutes;
