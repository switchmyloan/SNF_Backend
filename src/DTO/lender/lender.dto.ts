import { Lender } from '@src/entities';

export class LenderDTO {
	id: number;
	name: string;
	logo: string;
	website: string;
	startingInterestRate: string;
	maximumLoanAmount: string;
	minimumLoanAmount: string;
	maximumTenure: string;
	minimumTenure: string;
	sortedOrder: number;

	constructor(lender: Lender) {
		this.id = lender.id;
		this.name = lender.name;
		this.logo = lender.logo;
		this.website = lender.website;
		this.startingInterestRate = lender.startingInterestRate;
		this.maximumLoanAmount = lender.maximumLoanAmount;
		this.minimumLoanAmount = lender.minimumLoanAmount;
		this.maximumTenure = lender.maximumTenure;
		this.minimumTenure = lender.minimumTenure;
		this.sortedOrder = lender.sortedOrder;
	}
}
