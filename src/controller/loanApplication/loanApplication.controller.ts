import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { AsyncHandler } from '@src/utils';
import ApiResponse from '../../utils/helper/ApiResponse';
import { INTERFACE_TYPE } from '@src/types/inversify.types';
import { ILoanApplicationInteractor, IUtMHeadersInteractor } from '@src/interfaces/interactor';
import { getClientIpAddress } from '@src/utils/helper/ipAddres';
import { PushLenders } from '@src/external-libraries/pushLenders';
import { ILenderInteractor } from '@src/interfaces/interactor/ILenderInteractor';
import { ILenderResponseInteractor } from '@src/interfaces/interactor/ILenderResponseInteractor';
import { UtmHeaders } from '@src/entities/master/UtmHeader.entity';

@injectable()
export class LoanApplicationController {
	private loanApplicationInteractor: ILoanApplicationInteractor;
	private readonly pushLenders: PushLenders;
	private readonly lenderInteractor: ILenderInteractor;
	private readonly lenderResponseInteractor: ILenderResponseInteractor;
	private readonly utmHeaderInteractor: IUtMHeadersInteractor;

	constructor(
		@inject(INTERFACE_TYPE.LoanApplicationInteractor)
		loanApplicationInteractor: ILoanApplicationInteractor,

		@inject(INTERFACE_TYPE.PushLenders)
		pushLenders: PushLenders,

		@inject(INTERFACE_TYPE.LenderInteractor)
		lenderInteractor: ILenderInteractor,

		@inject(INTERFACE_TYPE.LenderResponseInteractor)
		lenderResponseInteractor: ILenderResponseInteractor,

		@inject(INTERFACE_TYPE.UtmHeaderInteractor)
		utmHeaderInteractor: IUtMHeadersInteractor,
	) {
		this.loanApplicationInteractor = loanApplicationInteractor;
		this.pushLenders = pushLenders;
		this.lenderInteractor = lenderInteractor;
		this.lenderResponseInteractor = lenderResponseInteractor;
		this.utmHeaderInteractor = utmHeaderInteractor;
	}

	@AsyncHandler()
	async onLoanApplicationSubmit(req: Request, res: Response) {
		const ipAddress = getClientIpAddress(req);
		const data = { ...req.body, ipAddress };
		const { id } = await this.loanApplicationInteractor.create(data);

		const utmHeaderData = req.body.utmHeader;

		if (
			utmHeaderData &&
			typeof utmHeaderData.utm_source === 'string' &&
			utmHeaderData.utm_source.trim() !== ''
		) {
			const utmHeader = new UtmHeaders();

			utmHeader.utm_source = utmHeaderData.utm_source.trim();
			utmHeader.utm_medium = utmHeaderData.utm_medium?.trim() || null;
			utmHeader.utm_campaign = utmHeaderData.utm_campaign?.trim() || null;
			utmHeader.utm_link = utmHeaderData.utm_link?.trim() || null;
			utmHeader.utm_affid = utmHeaderData.utm_affid?.trim() || "null";
			utmHeader.lead_xid = id;

			await this.utmHeaderInteractor.create(utmHeader);
		}


		const leadData = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			gender: req.body.gender,
			pincode: req.body.cityPincode,
			panNumber: req.body.panCard,
			dateOfBirth: req.body.dateOfBirth,
			jobType: req.body.profile,
			monthlySalary: req.body.monthlyIncome,
			loanAmount: req.body.loanAmount,
			mobileNumber: req.body.mobileNumber
		};

		const response = await this.pushLenders.sendLeadToLenders(leadData);

		const lenders = await this.lenderInteractor.findAllLender();

		const lenderMap = new Map<string, { id: number; name: string }>();
		lenders?.forEach(({ id, name }) => {
			lenderMap.set(name.toLowerCase().replace(/\s+/g, ''), { id, name });
		});

		let hasOffer = false;

		const lenderResponses = Object.entries(response)
			.map(([key, lenderResp]) => {
				const matchedLender = lenderMap.get(key.toLowerCase().replace(/\s+/g, ''));
				if (!matchedLender) return null;

				if (!lenderResp || typeof lenderResp !== 'object') {
					return {
						message: 'No valid response from lender',
						status: '500',
						metadata: {},
						lender_xid: matchedLender.id,
						lead_xid: id,
						isOffer: false,
					};
				}

				const message =
					typeof lenderResp.message === 'string'
						? lenderResp.message
						: JSON.stringify(lenderResp.message ?? '');
				const success = Boolean(lenderResp.success);
				const isOffer = success && message.toLowerCase().includes('success');
				if (isOffer) hasOffer = true;

				return {
					message,
					status: (lenderResp.statusCode ?? 200).toString(),
					metadata: lenderResp as Record<string, any>,
					lender_xid: matchedLender.id,
					lead_xid: id,
					isOffer,
				};
			})
			.filter((item): item is NonNullable<typeof item> => item !== null);


		await this.lenderResponseInteractor.saveBulkResponses(lenderResponses);

		res
			.status(200)
			.json(new ApiResponse(200, lenderResponses, 'Application Submitted Successfully'));
	}


	@AsyncHandler()
	async onGetLeads(req: Request, res: Response): Promise<void> {
		const { perPage = '10', currentPage = '1' } = req.query;
		const limit = Math.max(Number(perPage), 1);
		const page = Math.max(Number(currentPage), 1);
		const offset = (page - 1) * limit;

		// const { users } = await this.loanApplicationInteractor.findLeads();
		// 1. Leads fetch
		const { users: leads } = await this.loanApplicationInteractor.findLeads()

		// 2. For each lead → lender responses + lender info
		const rows = await Promise.all(
			leads.map(async (lead) => {

				// All lender_response rows for this lead
				const lenderResponses = await this.lenderResponseInteractor.getOffers(lead.id);

				// Fetch all lender info from lenders table
				const lenders = await Promise.all(
					lenderResponses.map(async (resp) => {
						const lenderId = (resp as any).lender_xid ?? (resp as any).lenderXid ?? (resp as any).lenderId;
						if (!lenderId) return null;
						return await this.lenderInteractor.findById(Number(lenderId));
					})
				);

				return {
					...lead,
					lender_responses: lenderResponses,
					lenders: lenders
				};
			})
		);
		res.status(200).json(
			new ApiResponse(
				200,
				{
					rows,
				},
				'Leads fetched successfully'
			)
		);
	}
	@AsyncHandler()
	async onGetLeadsById(req: Request, res: Response): Promise<void> {
		const { id } = req.params
		const users = await this.loanApplicationInteractor.findLeadsById(Number(id));

		res.status(200).json(
			new ApiResponse(
				200,
				{
					rows: users,
				},
				'Leads fetched successfully'
			)
		);
	}

	@AsyncHandler()
	async onPartnersLeads(req: Request, res: Response): Promise<void> {

		// const { users: leads } = await this.loanApplicationInteractor.findAll();
		// const { users: utmHeaders } = await this.utmHeaderInteractor.findAll();
		const result = await this.utmHeaderInteractor.findAllwithLoanApplications();

		

		// const grouped = await Promise.all(
		// 	leads.map(async (lead) => {
		// 		// ---- UTM matching ----
		// 		const matched = utmHeaders.filter(u => u.lead_xid === lead.id);

		// 		// ---- Lender responses (multiple rows) ----
		// 		const lenderResponses = await this.lenderResponseInteractor.getOffers(lead.id);


		// 		const lenders = await Promise.all(
		// 			lenderResponses.map(async (resp) => {
		// 				// LenderResponseDTO may use different naming; normalize and cast to any to satisfy TS
		// 				const lenderId = (resp as any).lender_xid ?? (resp as any).lenderXid ?? (resp as any).lenderId;
		// 				if (!lenderId) return null;
		// 				return await this.lenderInteractor.findById(Number(lenderId));
		// 			})
		// 		);

		// 		return {
		// 			leadId: lead.id,
		// 			firstName: lead.firstName,
		// 			lastName: lead.lastName,
		// 			email: lead.email,
		// 			gender: lead.gender,
		// 			dateOfBirth: lead.dateOfBirth,
		// 			pincode: lead.cityPincode,
		// 			panCard: lead.panCard,
		// 			lookingFor: lead.lookingFor,
		// 			profile: lead.profile,
		// 			mobileNumber: lead.mobileNumber,
		// 			monthlyIncome: lead.monthlyIncome,
		// 			lonaAmount: lead.loanAmount,
		// 			utm_header: matched,

		// 			lender_responses: lenderResponses,
		// 			// lenders: lenders                 
		// 		};
		// 	})
		// );

		// const filtered = grouped.filter(item => item.utm_header.length > 0);

		res.status(200).json(
			new ApiResponse(200, { rows: result }, "Filtered Partner Leads fetched successfully")
		);
	}



}