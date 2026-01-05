import { UtmHeaders } from '@src/entities';

export interface IUtMHeadersRepository {
    create(data: Partial<UtmHeaders>): Promise<UtmHeaders>;
    findAll(): Promise<UtmHeaders[]>
    findAllWithLoanApplication(): Promise<UtmHeaders[]>
}