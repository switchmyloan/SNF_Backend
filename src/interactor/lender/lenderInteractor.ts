import { ILenderInteractor } from '@src/interfaces';
import { ILenderRepository } from '@src/interfaces';
import { inject, injectable } from 'inversify';
import { INTERFACE_TYPE } from '@src/types/inversify.types';
import { ApiError } from '@src/utils';
import { Lender } from '@src/entities/master/lender.entity';

@injectable()
export class LenderInteractor implements ILenderInteractor {
	private lenderRepository: ILenderRepository;

	constructor(
		@inject(INTERFACE_TYPE.LenderRepository)
		lenderRepository: ILenderRepository
	) {
		this.lenderRepository = lenderRepository;
	}

	async create(data: Partial<Lender>, file?: Express.Multer.File): Promise<Lender> {
		if (file) {
			data.logo = `/public/lender/${file.filename}`;
		}
		return this.lenderRepository.create(data);
	}

	async updateLender(
		lenderId: number,
		lenderData: Partial<Lender>,
		features: { id?: number; title: string }[],
		file?: Express.Multer.File
	): Promise<Lender> {

		if (file) {
			lenderData.logo = `/public/lender/${file.filename}`;
		}

		if (!file) {
			const existingLender = await this.lenderRepository.findById(Number(lenderId));
			if (existingLender) {
				lenderData.logo = existingLender.logo;
			}
		}

		return this.lenderRepository.update(lenderId, lenderData, features);
	}

	async findAll(
		limit: number,
		offset: number,
		search?: string
	): Promise<{ data: Lender[]; totalCount: number }> {
		return this.lenderRepository.findAll(limit, offset, String(search));
	}

	async findById(id: number): Promise<Lender> {
		const lender = await this.lenderRepository.findById(id);
		if (!lender) {
			throw new ApiError(404, 'Lender not found');
		}
		return lender;
	}

	async delete(id: number): Promise<void> {
		const lender = await this.lenderRepository.findById(id);
		if (!lender) {
			throw new ApiError(404, 'Lender not found');
		}
		await this.lenderRepository.delete(id);
	}

	async findAllLender(): Promise<Lender[]> {
		return this.lenderRepository.findAllLender({
			isActive: true,
			orderBy: 'sortedOrder',
			orderDirection: 'ASC',
		});
	}

	async createFeatures(lender_xid: number, features: string[]): Promise<void> {
		if (!features.length) return;

		const lender = await this.lenderRepository.findById(lender_xid);
		if (!lender) {
			throw new ApiError(404, 'Lender not found');
		}

		const featureEntities = features.map((title) => ({
			title,
			lender_xid,
		}));

		await this.lenderRepository.createFeatures(featureEntities);
	}

	async findAllActiveLenderMutualFunds(): Promise<Lender[] | null> {
		return await this.lenderRepository.findAllActiveLenders();
	}
}
