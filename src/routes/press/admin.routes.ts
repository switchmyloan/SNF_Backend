import { INTERFACE_TYPE } from '@src/types/inversify.types';
import { Router } from 'express';
import { container } from '@src/container/index';
import { uploader } from '@src/middleware/uploader';
import { PressRoomController } from '@src/controller/press/press.controller';

const upload = uploader('press-room', ['image/jpeg', 'image/png']);

const adminRoutes = Router();

const pressRoomController = container.get<PressRoomController>(
	INTERFACE_TYPE.PressRoomController
);

const uploadFields = upload.fields([
	{ name: 'image', maxCount: 1 },
	{ name: 'sourceLogo', maxCount: 1 },
]);

adminRoutes
	.route('/')
	.post(uploadFields, pressRoomController.create.bind(pressRoomController))
	.get(pressRoomController.getPressRooms.bind(pressRoomController));

adminRoutes
	.route('/:id')
	.get(pressRoomController.getPressRoomById.bind(pressRoomController))
	.delete(pressRoomController.deletePressById.bind(pressRoomController));

adminRoutes
	.route('/:id')
	.put(
		uploadFields,
		pressRoomController.updatePressRoom.bind(pressRoomController)
	);

export default adminRoutes;
