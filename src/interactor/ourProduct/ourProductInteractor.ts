import { OurProduct } from '@src/entities';
import { IOurProductInteractor, IOurProductRepository } from '@src/interfaces';
import { injectable, inject } from 'inversify';
import { INTERFACE_TYPE } from '@src/types/inversify.types';
import { ApiError } from '@src/utils';

@injectable()
export class OurProductInteractor implements IOurProductInteractor {
	private repository: IOurProductRepository;

	constructor(
		@inject(INTERFACE_TYPE.OurProductRepository)
		repository: IOurProductRepository
	) {
		this.repository = repository;
	}

	async createProduct(data: Partial<OurProduct>): Promise<OurProduct> {
		return await this.repository.create(data);
		
	}

	async getProducts(
			limit: number,
			offset: number,
			search?: string
		): Promise<{ data: OurProduct[]; totalCount: number }> {
			const { data, totalCount } = await this.repository.findAllWithCount(limit, offset, String(search));
			return { data, totalCount };
		}

    async getByIdProduct(id: number): Promise<OurProduct | null> {
        const data = await this.repository.findById(id);
		if (!data) {
			throw new ApiError(404, 'Data not found');
		}
		return data;
    }
    async getUserByIdProduct(id: number): Promise<OurProduct | null> {
        const data = await this.repository.findById(id);
		if (!data) {
			throw new ApiError(404, 'Data not found');
		}
		return data;
    }

    async updateProduct(id: number, data: Partial<OurProduct>): Promise<OurProduct> {
            const updatedData = await this.repository.update(id, data);
            if (!updatedData) {
                throw new ApiError(404, 'Data not found');
            }
            return updatedData;
        }

	async getProductsUser(): Promise<OurProduct[] | null> {
			return await this.repository.getProducts();

		}
}
