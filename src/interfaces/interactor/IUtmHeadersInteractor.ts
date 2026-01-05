import { UtmHeaders } from "@src/entities/master/UtmHeader.entity";
import { UtmHeaderWithLead } from "@src/types";

export interface IUtMHeadersInteractor {
  create(data: Partial<UtmHeaders>): Promise<UtmHeaders>;

  findAll(): Promise<{ users: UtmHeaders[] }>;

  findAllwithLoanApplications(): Promise<UtmHeaderWithLead[]>;
}
