import { Contact } from '@src/entities';

export interface IContactRepository {
	create(data: Contact): Promise<Contact>;
	getAll(): Promise<Contact[]>;
}
