import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { INTERFACE_TYPE } from '@src/types';
import { ApiResponse, AsyncHandler } from '@src/utils';
import { IContactInteractor } from '@src/interfaces/interactor/IContactInteractor';
import { getClientIpAddress } from '@src/utils/helper/ipAddres';

@injectable()
export class ContactController {
	constructor(
		@inject(INTERFACE_TYPE.ContactInteractor)
		private contactInteractor: IContactInteractor
	) {}

	@AsyncHandler()
	async create(req: Request, res: Response): Promise<void> {
		const ipAddress = getClientIpAddress(req);
		const data = req.body;
		const formData = {
			fullName : data?.fullName,
			email : data?.emailId,
			mobile : data?.contactNumber,
			interest : data?.subject,
			comment : data?.comment,
			ipAddress: ipAddress
		}

		const contactResponse = this.contactInteractor.create(formData);

		res
			.status(201)
			.json(
				new ApiResponse(201, contactResponse, 'Form submited Successfully!')
			);
	}

	@AsyncHandler()
	async getAll(req: Request, res: Response): Promise<void> {
		const contact = await this.contactInteractor.getAll();

		res
			.status(200)
			.json(new ApiResponse(200, contact, 'Data fetched Successfully!'));
	}
}
