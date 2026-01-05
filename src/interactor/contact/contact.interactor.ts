import { injectable, inject } from 'inversify';
import { Contact } from '@src/entities';
import { INTERFACE_TYPE } from '@src/types';
import { IContactRepository } from '@src/interfaces/repository/IContactRepository';
import { IContactInteractor } from '@src/interfaces/interactor/IContactInteractor';

@injectable()
export class ContactInterator implements IContactInteractor {
	constructor(
		@inject(INTERFACE_TYPE.ContactRepository)
		private readonly contactRepo: IContactRepository
	) {}

	async create(data: Contact): Promise<Contact> {
		return this.contactRepo.create(data);
	}

	async getAll(): Promise<Contact[]> {
		const contact = this.contactRepo.getAll();
		return contact;
	}
}
