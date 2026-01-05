import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { AppDataSource } from '@src/config/data-source';
import { ApiError } from '@src/utils';
import { ILenderRepository } from '@src/interfaces/repository/ILendorRepositorry';
import { Lender } from '@src/entities';

@injectable()
export class LenderRepository implements ILenderRepository {
	private readonly lenderRepository: Repository<Lender>;

	constructor() {
		this.lenderRepository = AppDataSource.getRepository(Lender);
	}

	async create(data: Partial<Lender>): Promise<Lender> {
		const lender = this.lenderRepository.create(data);
		return await this.lenderRepository.save(lender);
	}

	async update(
		lenderId: number,
		lenderData: Partial<Lender>,
	): Promise<Lender> {
		const lender = await this.lenderRepository.findOne({
			where: { id: lenderId },
		});

		if (!lender) {
			throw new Error(`Lender with id ${lenderId} not found`);
		}

		Object.assign(lender, lenderData);

		return this.lenderRepository.save(lender);
	}


	// async findAll(
	// 	limit: number,
	// 	offset: number,
	// 	search?: string
	// ): Promise<{ data: Lender[]; totalCount: number }> {
	// 	const [data, totalCount] = await this.lenderRepository.findAndCount({
	// 		take: limit,
	// 		skip: offset,
	// 		order: { id: 'DESC' },
	// 		relations: ['features'],
	// 	});
	// 	return { data, totalCount };
	// }

	async findAll(
		limit: number,
		offset: number,
		search?: string
	): Promise<{ data: Lender[]; totalCount: number }> {
		const queryBuilder = this.lenderRepository.createQueryBuilder('lender')
			.leftJoinAndSelect('lender.features', 'features')
			.orderBy('lender.id', 'DESC')
			.take(limit)
			.skip(offset);

		// ✅ Apply search filter if provided
		if (search && search.trim() !== '') {
			const searchTerm = `%${search}%`;

			queryBuilder.where(
				`
        lender.name ILIKE :searchTerm OR
        lender.description ILIKE :searchTerm OR
        lender.website ILIKE :searchTerm OR
        lender.startingInterestRate ILIKE :searchTerm OR
        lender.maximumLoanAmount ILIKE :searchTerm OR
        lender.minimumLoanAmount ILIKE :searchTerm OR
        lender.processingFee ILIKE :searchTerm
      `,
				{ searchTerm }
			);
		}

		const [data, totalCount] = await queryBuilder.getManyAndCount();
		return { data, totalCount };
	}

	async findById(id: number): Promise<Lender> {
		const lender = await this.lenderRepository.findOneBy({ id });
		if (!lender) {
			throw new ApiError(404, 'No Lender Found');
		}
		return lender;
	}

	async delete(id: number): Promise<void> {
		const result = await this.lenderRepository.delete(id);
		if (result.affected === 0) {
			throw new ApiError(404, 'No Lender Found to delete');
		}
	}

	async findAllLender(filters: {
		isActive?: boolean;
		orderBy?: keyof Lender;
		orderDirection?: 'ASC' | 'DESC';
	}): Promise<Lender[]> {
		const { isActive, orderBy = 'name', orderDirection = 'ASC' } = filters;

		const where: Partial<Pick<Lender, 'isActive'>> = {};
		if (isActive !== undefined) {
			where.isActive = isActive;
		}

		return this.lenderRepository.find({
			where,
			order: {
				[orderBy]: orderDirection,
			}
		});
	}

	async createFeatures(
		features: { title: string; lender_xid: number }[]
	): Promise<void> {
		if (!features.length) return;

		// const entities = features.map((feature) =>
		// 	this.lenderFeatureRepository.create(feature)
		// );
		// await this.lenderFeatureRepository.save(entities);
	}

	async findAllActiveLenders(): Promise<Lender[]> {
		const result = await this.lenderRepository.find({
			where: {
				status: true,
				product_xid: 3,
			},
			order: {
				id: 'DESC',
			},
		});

		return result;
	}
}
