import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { AppDataSource } from '@src/config/data-source';
import { Contact } from '@src/entities';
import { IContactRepository } from '@src/interfaces/repository/IContactRepository';

@injectable()
export class ContactRepository implements IContactRepository {
	private readonly repo: Repository<Contact>;

	constructor() {
		this.repo = AppDataSource.getRepository(Contact);
	}

	async create(data: Contact): Promise<Contact> {
		const response = this.repo.create(data);
		return this.repo.save(response);
	}

	async getAll(): Promise<Contact[]> {
		const contacts = await this.repo.find({
			order: {
				createdAt: 'DESC',
			},
			where:{
				isActive: true
			}
		});
		return contacts;
	}
}
