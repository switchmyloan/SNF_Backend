// import { Response } from 'express';
// import { inject, injectable } from 'inversify';
// import { INTERFACE_TYPE } from '@src/types/inversify.types';
// import { AsyncHandler } from '@src/utils/handler/async.handler';
// import ApiResponse from '@src/utils/helper/ApiResponse';
// import { PushLenders } from '@src/external-libraries/pushLenders';

// @injectable()
// export class onSubmitController {
// 	private readonly pushLenders: PushLenders;

// 	constructor(
// 		@inject(INTERFACE_TYPE.PushLenders)
// 		pushLenders: PushLenders,
// 	) {
// 		this.pushLenders = pushLenders;
// 	}

// 	@AsyncHandler()
// 	async onSendLead(req: Request, res: Response): Promise<void> {
// 		const id = Number(req.principal_xid);
// 		const user = await this.interactor.getByIdPrincipal(id);

// 		type LenderResponse = {
// 			message: string;
// 			status: string;
// 			metadata: Record<string, string | object | boolean | number>;
// 			lender_xid: number;
// 			lead_xid: number;
// 			isOffer: boolean;
// 		};

// 		const lenders = await this.lenderInteractor.findAllLender();
// 		const lenderMap = new Map<string, { id: number; name: string }>();
// 		lenders?.forEach(({ id, name }) => {
// 			lenderMap.set(name.toLowerCase().replace(/\s+/g, ''), { id, name });
// 		});

// 		const leadData = {
// 			firstName: user.firstName,
// 			lastName: user.lastName,
// 			email: user.emailAddress,
// 			gender: user.gender,
// 			pincode: user.postalCode,
// 			panNumber: user.panNumber,
// 			dateOfBirth: user.dateOfBirth.toString(),
// 			jobType: user.jobType,
// 			monthlySalary: user.monthlyIncome,
// 			loanAmount: req.body.loanAmount,
// 			mobileNumber: user.phoneNumber,
// 		};

// 		const response = await this.pushLenders.sendLeadToLenders(leadData);
// 		let hasOffer = false;

// 		const lenderResponse: LenderResponse[] = Object.keys(response)
// 			.map((key) => {
// 				const matchedLender = lenderMap.get(
// 					key.toLowerCase().replace(/\s+/g, '')
// 				);
// 				if (!matchedLender) return null;

// 				const isOffer = Boolean(response[key].success);
// 				if (isOffer) hasOffer = true;

// 				return {
// 					message: response[key].message,
// 					status: (res.statusCode ?? 500).toString(),
// 					metadata: response[key] as Record<
// 						string,
// 						string | object | boolean | number
// 					>,
// 					lender_xid: matchedLender.id,
// 					lead_xid: id,
// 					isOffer: response[key].success,
// 				};
// 			})
// 			.filter((item): item is LenderResponse => item !== null);

// 		if (hasOffer) {
// 			await this.interactor.updatePrincipal(id, { isGettingOffers: true });
// 		}

// 		await this.lenderResponseInteractor.saveBulkResponses(lenderResponse);

// 		res
// 			.status(200)
// 			.json(new ApiResponse(200, lenderResponse, 'Lead sent to lenders'));
// 	}
// }
