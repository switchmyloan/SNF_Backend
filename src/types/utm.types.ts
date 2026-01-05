export interface UtmHeaderWithLead {
  leadId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
  dateOfBirth?: Date;
  pincode?: string;
  panCard?: string;
  lookingFor?: string;
  profile?: string;
  mobileNumber?: string;
  monthlyIncome?: number;
  loanAmount?: number;
  ipAddress?: string;
  consentCommunication?: string;
  consentCreditAccess?: string;
  createdAt?: Date;
  lender_responses?: {
    
  },
  utm_header: {
    id: number;
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_link: string;
    utm_affid: string;
  };
}
