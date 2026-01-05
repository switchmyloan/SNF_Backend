import { LoanApplication } from '@src/entities';

export class LoanApplicationMiniDto {
    leadId: number;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    dateOfBirth: Date;
    pincode: string;
    panCard: string;
    lookingFor: string;
    profile: string;
    mobileNumber: string;
    monthlyIncome: number;
    loanAmount: number;
    ipAddress: string;
    consentCommunication: string;
    consentCreditAccess: string;

    constructor(lead: LoanApplication) {
        this.leadId = lead.id;
        this.firstName = lead.firstName;
        this.lastName = lead.lastName;
        this.email = lead.email;
        this.gender = lead.gender;
        this.dateOfBirth = lead.dateOfBirth;
        this.pincode = lead.cityPincode;
        this.panCard = lead.panCard;
        this.lookingFor = lead.lookingFor;
        this.profile = lead.profile;
        this.mobileNumber = lead.mobileNumber;
        this.monthlyIncome = Number(lead.monthlyIncome);
        this.loanAmount = Number(lead.loanAmount);
        this.ipAddress= lead.ipAddress || 'NA';
        this.consentCommunication= lead.consentCommunication;
        this.consentCreditAccess= lead.consentCreditAccess;
    }
}
