import { OurProduct } from '@src/entities';

export interface IOurProductRepository {
    create(data: Partial<OurProduct>): Promise<OurProduct>;
    findAllWithCount(
            limit: number,
            offset: number,
            search: string
        ): Promise<{ data: OurProduct[]; totalCount: number }>;
    findById(id: number): Promise<OurProduct | null>;
    update(id: number, data: Partial<OurProduct>): Promise<OurProduct>;
    getProducts(): Promise<OurProduct[] | null>;
}
