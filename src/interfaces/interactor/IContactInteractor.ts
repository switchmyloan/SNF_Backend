import { Contact } from '@src/entities';

export interface IContactInteractor {
	create(data: Partial<Contact>): Promise<Contact>;
	getAll(): Promise<Contact[]>;
}
