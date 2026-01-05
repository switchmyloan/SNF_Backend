import { injectable, inject } from 'inversify';
import { INTERFACE_TYPE } from '@src/types';
import { ApiError } from '@src/utils';

import { PressRoom } from '@src/entities';
import { IPressRoomInteractor } from '@src/interfaces/interactor/IPressRoomInteractor';
import { IPressRoomRepository } from '@src/interfaces/repository/IPressRoomRepository';

@injectable()
export class PressRoomInteractor implements IPressRoomInteractor {
	constructor(
		@inject(INTERFACE_TYPE.PressRoomRepository)
		private readonly pressRoomRepository: IPressRoomRepository
	) {}

	async create(
		data: Partial<PressRoom>,
		imageFile?: Express.Multer.File,
		sourceLogoFile?: Express.Multer.File
	): Promise<PressRoom> {
		if (imageFile) {
			data.image = `/public/press-room/${imageFile.filename}`;
		}

		if (sourceLogoFile) {
			data.sourceLogo = `/public/press-room/${sourceLogoFile.filename}`;
		}

		return await this.pressRoomRepository.create(data);
	}

	async update(
		id: number,
		data: Partial<PressRoom>,
		imageFile?: Express.Multer.File,
		sourceLogoFile?: Express.Multer.File
	): Promise<PressRoom> {
		const existingPressRoom = await this.pressRoomRepository.findById(
			Number(id)
		);

		if (!existingPressRoom) {
			throw new ApiError(200, `Press room with ID not found`);
		}

		// Handle image
		if (imageFile) {
			data.image = `/public/press-room/${imageFile.filename}`;
		} else {
			data.image = existingPressRoom.image;
		}

		// Handle sourceLogo
		if (sourceLogoFile) {
			data.sourceLogo = `/public/press-room/${sourceLogoFile.filename}`;
		} else {
			data.sourceLogo = existingPressRoom.sourceLogo;
		}

		return await this.pressRoomRepository.update(id, data);
	}

	async findAll(
		limit: number,
		offset: number
	): Promise<{ press: PressRoom[]; totalCount: number }> {
		const { data, totalCount } = await this.pressRoomRepository.findAll(
			limit,
			offset
		);
		return { press: data, totalCount };
	}
	async findAllUser(): Promise<{ press: PressRoom[] }> {
		const { data } = await this.pressRoomRepository.findAllUser();
		return { press: data };
	}

	async findById(id: number): Promise<PressRoom | null> {
		const pressRoom = await this.pressRoomRepository.findById(id);
		if (!pressRoom) {
			throw new ApiError(200, 'Press Room not found');
		}
		return pressRoom;
	}

	async delete(id: number): Promise<void> {
		await this.pressRoomRepository.delete(id);
	}

	async deleteByIdPress(id: number): Promise<PressRoom | null> {
		return await this.pressRoomRepository.deleteById(id);
	}
}
