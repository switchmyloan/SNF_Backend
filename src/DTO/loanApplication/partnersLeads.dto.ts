import { UtmHeaders } from "@src/entities";
import { UtmHeaderWithLead } from "@src/types";
import { LenderResponseDTO } from "../lender/lenderResponse.dto";
import { LoanApplicationMiniDto } from "./loan-application-mini.dto";

export class UtmHeaderDto {
  ID: number;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmLink: string;
  utmAffid: string;
  redirectedUrl: string | null;

  lenderXid: number | null;
  channelXid: number | null;
  campaignXid: number | null;
  leadXid: number | null;

  loanApplication: LoanApplicationMiniDto | null;

  createdAt: Date;
  updatedAt: Date;

  constructor(utm: UtmHeaders) {
    this.ID = utm.id;
    this.utmSource = utm.utm_source;
    this.utmMedium = utm.utm_medium;
    this.utmCampaign = utm.utm_campaign;
    this.utmLink = utm.utm_link;
    this.utmAffid = utm.utm_affid;
    this.redirectedUrl = utm.redirected_url ?? null;

    this.lenderXid = utm.lender_xid ?? null;
    this.channelXid = utm.channel_xid ?? null;
    this.campaignXid = utm.campaign_xid ?? null;
    this.leadXid = utm.lead_xid ?? null;

    this.loanApplication = utm.loanApplication
      ? new LoanApplicationMiniDto(utm.loanApplication)
      : null;

    this.createdAt = utm.createdAt;
    this.updatedAt = utm.updatedAt;
  }

  getAllUtmHeaderWithLeads(lendersArray: LenderResponseDTO[]): UtmHeaderWithLead {
    return {
      leadId: this.loanApplication?.leadId,
      firstName: this.loanApplication?.firstName,
      lastName: this.loanApplication?.lastName,
      email: this.loanApplication?.email,
      gender: this.loanApplication?.gender,
      dateOfBirth: this.loanApplication?.dateOfBirth,
      pincode: this.loanApplication?.pincode,
      panCard: this.loanApplication?.panCard,
      lookingFor: this.loanApplication?.lookingFor,
      profile: this.loanApplication?.profile,
      mobileNumber: this.loanApplication?.mobileNumber,
      monthlyIncome: this.loanApplication?.monthlyIncome,
      ipAddress: this.loanApplication?.ipAddress,
      consentCommunication: this.loanApplication?.consentCommunication,
      consentCreditAccess: this.loanApplication?.consentCreditAccess,
      loanAmount: Number(this.loanApplication?.loanAmount),
      createdAt: this.createdAt,
	  lender_responses: lendersArray,
      utm_header: {
		id : this.ID,
		utm_source : this.utmSource,
		utm_medium : this.utmMedium,
		utm_campaign : this.utmCampaign,
		utm_link : this.utmLink,
		utm_affid: this.utmAffid,
	  }
    };
  }
}
