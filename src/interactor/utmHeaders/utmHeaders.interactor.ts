import { injectable, inject } from "inversify";
import {
  ILenderRepository,
  ILenderResponseRepository,
  IUtMHeadersRepository,
} from "@src/interfaces/repository";
import { IUtMHeadersInteractor } from "@src/interfaces/interactor";
import { UtmHeaders } from "@src/entities";
import { INTERFACE_TYPE } from "@src/types/inversify.types";
import { LenderResponseDTO, UtmHeaderDto } from "@src/DTO";
import { UtmHeaderWithLead } from "@src/types";

@injectable()
export class UtmHeadersInteractor implements IUtMHeadersInteractor {
  private utmHeadersRepository: IUtMHeadersRepository;
  private readonly lenderResponseRepository: ILenderResponseRepository;
  private readonly lenderRepository: ILenderRepository;

  constructor(
    @inject(INTERFACE_TYPE.UtmHeadersRepository)
    utmHeadersRepository: IUtMHeadersRepository,

    @inject(INTERFACE_TYPE.LenderResponseRepository)
    lenderResponseRepository: ILenderResponseRepository,

    @inject(INTERFACE_TYPE.LenderRepository)
    lenderRepository: ILenderRepository
  ) {
    this.utmHeadersRepository = utmHeadersRepository;
    this.lenderResponseRepository = lenderResponseRepository;
    this.lenderRepository = lenderRepository;
  }

  async create(data: Partial<UtmHeaders>): Promise<UtmHeaders> {
    return await this.utmHeadersRepository.create(data);
  }

  async findAll(): Promise<{ users: UtmHeaders[] }> {
    const users = await this.utmHeadersRepository.findAll();

    return { users };
  }

  async findAllwithLoanApplications(): Promise<UtmHeaderWithLead[]> {
    const result = await this.utmHeadersRepository.findAllWithLoanApplication();

    return Promise.all(
      result.map(async (item) => {
        const lenderResponses = await this.lenderResponseRepository.getOffers(
          item.lead_xid 
        );

        // future use ke liye lenderResponses
        return new UtmHeaderDto(item).getAllUtmHeaderWithLeads(
          LenderResponseDTO.fromEntities(lenderResponses)
        );
      })
    );
  }
}
