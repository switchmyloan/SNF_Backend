import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { AsyncHandler } from '../../utils/handler/async.handler';
import ApiResponse from '../../utils/helper/ApiResponse';
import { INTERFACE_TYPE } from '../../types/inversify.types';
import { IFaqInteractor } from '../../interfaces/interactor/IFaqInteractor';
import { IOurProductInteractor } from '@src/interfaces';


@injectable()
export class OurProductController {
    private ourProductInteractor: IOurProductInteractor;

    constructor(
        @inject(INTERFACE_TYPE.OurProductInteractor) ourProductInteractor: IOurProductInteractor
    ) {
        this.ourProductInteractor = ourProductInteractor;
    }
    @AsyncHandler()
    async create(req: Request, res: Response) {
        const data = req.body;
        const response = await this.ourProductInteractor.createProduct(data);
        res
            .status(201)
            .json(new ApiResponse(201, response, 'Created successfully'));
    }


    @AsyncHandler()
    async getProduct(req: Request, res: Response): Promise<void> {
        const { perPage = '10', currentPage = '1', search = '' } = req.query;

        const limit = Math.max(Number(perPage), 1);
        const page = Math.max(Number(currentPage), 1);
        const offset = (page - 1) * limit;

        const { data, totalCount } = await this.ourProductInteractor.getProducts(limit, offset, String(search));

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
                'FAQs retrieved successfully'
            )
        );
    }

    @AsyncHandler()
    async getProductById(req: Request, res: Response) {
        const { id } = req.params;
        const data = await this.ourProductInteractor.getByIdProduct(Number(id));
        res
            .status(200)
            .json(new ApiResponse(200, data, 'Data fetched successfully!'));
    }

    @AsyncHandler()
    async getUserProductById(req: Request, res: Response) {
        const { id } = req.params;
        const data = await this.ourProductInteractor.getUserByIdProduct(Number(id));
        res
            .status(200)
            .json(new ApiResponse(200, data, 'Data fetched successfully!'));
    }


    
	@AsyncHandler()
	async updateProduct(req: Request, res: Response) {
		const { id } = req.params;
		const faqData = req.body;
		const updatedFaq = await this.ourProductInteractor.updateProduct(Number(id), faqData);
		res
			.status(200)
			.json(new ApiResponse(200, updatedFaq, 'FAQ updated successfully'));
	}

}
