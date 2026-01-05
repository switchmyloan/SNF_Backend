import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { AppDataSource } from '@src/config/data-source';
import { ApiError } from '@src/utils';
import { PressRoom, PressRoomStatus } from '@src/entities';
import { IPressRoomRepository } from '@src/interfaces/repository/IPressRoomRepository';

@injectable()
export class PressRoomRepository implements IPressRoomRepository {
	private readonly pressRoomRepository: Repository<PressRoom>;

	constructor() {
		this.pressRoomRepository = AppDataSource.getRepository(PressRoom);
	}

	async create(data: Partial<PressRoom>): Promise<PressRoom> {
		const pressRoom = this.pressRoomRepository.create(data);
		return await this.pressRoomRepository.save(pressRoom);
	}

	// async update(id: number, data: Partial<PressRoom>): Promise<PressRoom> {
	// 	const existingPressRoom = await this.pressRoomRepository.findOne({
	// 		where: { id },
	// 	});
	// 	if (!existingPressRoom) {
	// 		throw new ApiError(404, `Press Room with ID not found`);
	// 	}
	// 	Object.assign(existingPressRoom, data);
	// 	return await this.pressRoomRepository.save(existingPressRoom);
	// }

	async update(id: number, data: Partial<PressRoom>): Promise<PressRoom> {
		const updateResult = await this.pressRoomRepository.update(id, data);

		if (updateResult.affected === 0) {
			throw new ApiError(404, `Press Room with ID ${id} not found`);
		}

		const updatedPressRoom = await this.pressRoomRepository.findOne({
			where: { id },
		});

		if (!updatedPressRoom) {
			throw new ApiError(500, `Failed to retrieve updated Press Room`);
		}

		return updatedPressRoom;
	}

	async findAll(
		limit?: number,
		offset?: number
	): Promise<{ data: PressRoom[]; totalCount: number }> {
		const [data, totalCount] = await this.pressRoomRepository.findAndCount({
			take: limit,
			skip: offset,
			order: { id: 'DESC' },
			where: {
				isDeleted: false,
			},
		});
		return { data, totalCount };
	}
	async findAllUser(): Promise<{ data: PressRoom[] }> {
		const [data] = await this.pressRoomRepository.findAndCount({
			order: { id: 'DESC' },
			where: {
				status: PressRoomStatus.PUBLISHED,
				isDeleted: false,
			},
		});
		return { data };
	}

	async count(): Promise<number> {
		return await this.pressRoomRepository.count();
	}

	async findById(id: number): Promise<PressRoom | null> {
		return await this.pressRoomRepository.findOne({ where: { id } });
	}

	async delete(id: number): Promise<void> {
		const result = await this.pressRoomRepository.delete(id);
		if (result.affected === 0) {
			throw new ApiError(404, `Press Room with ID not found`);
		}
	}

	async deleteById(id: number): Promise<PressRoom | null> {
		await this.pressRoomRepository.update({ id }, { isDeleted: true });

		return this.pressRoomRepository.findOne({ where: { id } });
	}
}
