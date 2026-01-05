import { PressRoom } from '@src/entities/master/pressRoom.entity';

export interface IPressRoomRepository {
	create(data: Partial<PressRoom>): Promise<PressRoom>;
	update(id: number, data: Partial<PressRoom>): Promise<PressRoom>;
	findAll(
		limit: number,
		offset: number
	): Promise<{ data: PressRoom[]; totalCount: number }>;
	findAllUser(): Promise<{ data: PressRoom[] }>;
	findById(id: number): Promise<PressRoom | null>;
	delete(id: number): Promise<void>;
	count(): Promise<number>;
	deleteById(id: number): Promise<PressRoom | null>;
}
