import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ILenderInteractor } from '@src/interfaces';
import { ApiResponse, AsyncHandler } from '@src/utils';
import { INTERFACE_TYPE } from '@src/types/inversify.types';

@injectable()
export class LenderController {
	private lenderInteractor: ILenderInteractor;

	constructor(
		@inject(INTERFACE_TYPE.LenderInteractor) lenderInteractor: ILenderInteractor
	) {
		this.lenderInteractor = lenderInteractor;
	}

	@AsyncHandler()
	async getLenders(req: Request, res: Response): Promise<void> {
		const { perPage = '10', currentPage = '1', search = '' } = req.query;
		const limit = Math.max(Number(perPage), 1);
		const page = Math.max(Number(currentPage), 1);
		const offset = (page - 1) * limit;

		const { data, totalCount } = await this.lenderInteractor.findAll(
			limit,
			offset,
			String(search)
		);

		res.status(200).json(
			new ApiResponse(
				200,
				{
					rows: data,
					pagination: {
						total: totalCount,
						perPage: limit,
						currentPage: page,
						totalPages: Math.ceil(totalCount / limit),
					},
				},
				'Lenders retrieved successfully'
			)
		);
	}

	@AsyncHandler()
	async getLenderById(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const lender = await this.lenderInteractor.findById(Number(id));
		res
			.status(200)
			.json(new ApiResponse(200, lender, 'Lender retrieved successfully'));
	}

	@AsyncHandler()
	async createLender(req: Request, res: Response): Promise<void> {
		const { features = [], ...data } = req.body;
		const file = req.file as Express.Multer.File;
		const lender = await this.lenderInteractor.create(data, file);
		const id = lender.id;
		await this.lenderInteractor.createFeatures(id, features);
		res
			.status(201)
			.json(new ApiResponse(201, lender, 'Lender created successfully'));
	}

	updateLender = async (req: Request, res: Response) => {
		const lenderId = Number(req.params.id);
		const { features, ...lenderData } = req.body;
		const file = req.file as Express.Multer.File;

		// Call interactor's update method
		const updatedLender = await this.lenderInteractor.updateLender(
			lenderId,
			lenderData,
			features,
			file
		);

		res.status(200).json({
			success: true,
			message: 'Lender updated successfully',
			data: updatedLender,
		});
	};

	@AsyncHandler()
	async deleteLender(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		await this.lenderInteractor.delete(Number(id));
		res
			.status(200)
			.json(new ApiResponse(200, null, 'Lender deleted successfully'));
	}

	@AsyncHandler()
	async getLendersUser(req: Request, res: Response): Promise<void> {
		const lenders = (await this.lenderInteractor.findAllLender()) ?? [];

		const filteredLenders = lenders.map((lender) => ({
			id: lender.id,
			logo: lender.logo,
			startingInterestRate: lender.startingInterestRate,
			maximumLoanAmount: lender.maximumLoanAmount,
			minimumLoanAmount: lender.minimumLoanAmount,
			maximumTenure: lender.maximumTenure,
			minimumTenure: lender.minimumTenure,
			sortedOrder: lender.sortedOrder,

			features:
				lender.features?.map((feature) => ({
					id: feature.id,
					title: feature.title,
				})) ?? [],
		}));

		res
			.status(200)
			.json(
				new ApiResponse(
					200,
					{ data: filteredLenders },
					'Lenders retrieved successfully'
				)
			);
	}

	@AsyncHandler()
	async onCreateFeature(req: Request, res: Response): Promise<void> {
		const { lender_xid, features } = req.body;

		if (!lender_xid || !Array.isArray(features)) {
			res
				.status(400)
				.json(
					new ApiResponse(
						400,
						null,
						'lender_xid and features array are required'
					)
				);
			return;
		}

		await this.lenderInteractor.createFeatures(lender_xid, features);

		res
			.status(201)
			.json(new ApiResponse(201, null, 'Lender features created successfully'));
	}
}
