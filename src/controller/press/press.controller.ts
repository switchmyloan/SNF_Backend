import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { ApiResponse, AsyncHandler } from '@src/utils';
import { INTERFACE_TYPE } from '@src/types';
import { IPressRoomInteractor } from '@src/interfaces/interactor/IPressRoomInteractor';

@injectable()
export class PressRoomController {
	private pressRoomInteractor: IPressRoomInteractor;

	constructor(
		@inject(INTERFACE_TYPE.PressRoomInteractor)
		pressRoomInteractor: IPressRoomInteractor
	) {
		this.pressRoomInteractor = pressRoomInteractor;
	}

	@AsyncHandler()
	async getPressRooms(req: Request, res: Response): Promise<void> {
		const { perPage = '10', currentPage = '1' } = req.query;

		const limit = Math.max(Number(perPage), 1);
		const page = Math.max(Number(currentPage), 1);
		const offset = (page - 1) * limit;

		const { press, totalCount } = await this.pressRoomInteractor.findAll(
			limit,
			offset
		);

		res.status(200).json(
			new ApiResponse(
				200,
				{
					rows: press,
					pagination: {
						total: totalCount,
						perPage: limit,
						currentPage: page,
						totalPages: Math.ceil(totalCount / limit),
					},
				},
				'Press Room retrieved successfully'
			)
		);
	}
	@AsyncHandler()
	async getPressRoomsUsers(req: Request, res: Response): Promise<void> {
		const { press } = await this.pressRoomInteractor.findAllUser();

		res.status(200).json(
			new ApiResponse(
				200,
				{
					rows: press,
				},
				'Press Room retrieved successfully'
			)
		);
	}

	@AsyncHandler()
	async getPressRoomById(req: Request, res: Response) {
		const { id } = req.params;
		const pressRoom = await this.pressRoomInteractor.findById(Number(id));
		res
			.status(200)
			.json(
				new ApiResponse(200, pressRoom, 'Press Room retrieved successfully')
			);
	}

	@AsyncHandler()
	async create(req: Request, res: Response) {
		const data = req.body;

		const files = req.files as {
			[key: string]: Express.Multer.File[];
		};

		const image = files?.['image']?.[0];
		const sourceLogo = files?.['sourceLogo']?.[0];

		const newPressRoom = await this.pressRoomInteractor.create(
			data,
			image,
			sourceLogo
		);

		res
			.status(201)
			.json(
				new ApiResponse(201, newPressRoom, 'Press Room created successfully')
			);
	}

	@AsyncHandler()
	async updatePressRoom(req: Request, res: Response) {
		const { id } = req.params;
		const data = req.body;

		const files = req.files as {
			[key: string]: Express.Multer.File[];
		};

		const image = files?.['image']?.[0];
		const sourceLogo = files?.['sourceLogo']?.[0];

		const updatedPressRoom = await this.pressRoomInteractor.update(
			Number(id),
			data,
			image,
			sourceLogo
		);

		res
			.status(200)
			.json(
				new ApiResponse(
					200,
					updatedPressRoom,
					'Press Room updated successfully'
				)
			);
	}

	@AsyncHandler()
	async deletePressRoom(req: Request, res: Response) {
		const { id } = req.params;
		await this.pressRoomInteractor.delete(Number(id));
		res.status(204).send();
	}

	@AsyncHandler()
	async deletePressById(req: Request, res: Response) {
		const { id } = req.params;
		const press = await this.pressRoomInteractor.deleteByIdPress(Number(id));
		res
			.status(200)
			.json(new ApiResponse(200, press, 'Press deleted successfully'));
	}
}
