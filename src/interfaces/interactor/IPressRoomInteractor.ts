import { PressRoom } from '@src/entities/master/pressRoom.entity';

export interface IPressRoomInteractor {
	create(
		data: Partial<PressRoom>,
		imageFile?: Express.Multer.File,
		sourceLogoFile?: Express.Multer.File
	): Promise<PressRoom>;

	update(
		id: number,
		data: Partial<PressRoom>,
		imageFile?: Express.Multer.File,
		sourceLogoFile?: Express.Multer.File
	): Promise<PressRoom>;

	findAll(
		limit: number,
		offset: number
	): Promise<{ press: PressRoom[]; totalCount: number }>;
	findAllUser(): Promise<{ press: PressRoom[] }>;
	findById(id: number): Promise<PressRoom | null>;
	delete(id: number): Promise<void>;
	deleteByIdPress(id: number): Promise<PressRoom | null>;
}
