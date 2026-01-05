import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { AppDataSource } from '@src/config/data-source';
import { ApiError } from '@src/utils';
import { IOurProductRepository } from '@src/interfaces';
import {  OurProduct } from '@src/entities';

@injectable()
export class OurProductRepository implements IOurProductRepository {
    private readonly ourProductRepository: Repository<OurProduct>;

    constructor() {
        this.ourProductRepository = AppDataSource.getRepository(OurProduct);
    }

    async create(data: Partial<OurProduct>): Promise<OurProduct> {
        const faq = this.ourProductRepository.create(data);
        return await this.ourProductRepository.save(faq);
    }


    async findAllWithCount(
        limit?: number,
        offset?: number,
        search?: string
    ): Promise<{ data: OurProduct[]; totalCount: number }> {
        const query = this.ourProductRepository
            .createQueryBuilder('product')
            .select(['product.id', 'product.category', 'product.qaList', 'product.isFeatured', 'product.schema'])
            .orderBy('product.id', 'DESC');

        // ✅ Apply search filter only if provided
        if (search && search.trim() !== '') {
            // For PostgreSQL JSON search
            query.where(
                `product.category ILIKE :search 
       OR EXISTS (
         SELECT 1 FROM jsonb_array_elements(product."qaList") AS qa
         WHERE qa->>'question' ILIKE :search OR qa->>'answer' ILIKE :search
       )`,
                { search: `%${search}%` }
            );
        }

        if (limit) query.take(limit);
        if (offset) query.skip(offset);

        const [data, totalCount] = await query.getManyAndCount();
        return { data, totalCount };
    }

    async findById(id: number): Promise<OurProduct | null> {
		return await this.ourProductRepository.findOne({ where: { id } });
	}


    async update(id: number, data: Partial<OurProduct>): Promise<OurProduct> {
            const existingData = await this.ourProductRepository.findOne({ where: { id } });
            if (!existingData) {
                throw new ApiError(404, `Data with ID ${id} not found`);
            }
            Object.assign(existingData, data);
            return await this.ourProductRepository.save(existingData);
        }

    
    async getProducts(): Promise<OurProduct[] | null> {
		return await this.ourProductRepository.find();
	}
}
