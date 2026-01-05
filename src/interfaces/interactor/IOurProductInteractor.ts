import { OurProduct } from '@src/entities';

export interface IOurProductInteractor {
    createProduct(data: Partial<OurProduct>): Promise<OurProduct>;

    getProducts(
        limit: number,
        offset: number,
        search?: string
    ): Promise<{ data: OurProduct[]; totalCount: number }>;

    getByIdProduct(id: number): Promise<OurProduct | null>;
    getUserByIdProduct(id: number): Promise<OurProduct | null>;

    updateProduct(id: number, data: Partial<OurProduct>): Promise<OurProduct>;

    getProductsUser(): Promise<OurProduct[] | null>;
}


