import { INTERFACE_TYPE } from '@src/types/inversify.types';
import { Router } from 'express';
import { container } from '@src/container/index';
import { PressRoomController } from '@src/controller/press/press.controller';


const userRoutes = Router();

const pressRoomController = container.get<PressRoomController>(
	INTERFACE_TYPE.PressRoomController
);

userRoutes
	.route('/')
	.get(pressRoomController.getPressRoomsUsers.bind(pressRoomController));

export default userRoutes;
