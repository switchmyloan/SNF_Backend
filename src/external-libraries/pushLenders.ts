import { injectable } from 'inversify';
import { IPushLenders } from '@src/interfaces/external-libraries';
import axios from 'axios';

@injectable()
export class PushLenders implements IPushLenders {
	async sendLeadToLenders(data: {
		firstName: string;
		lastName: string;
		email: string;
		gender: string;
		pincode: string;
		panNumber: string;
		dateOfBirth: string;
		jobType: string;
		monthlySalary: string;
		loanAmount: string;
		mobileNumber: string;
	}): Promise<{
		[key: string]: {
			data: object;
			success: boolean;
			message: string;
			statusCode: number;
			isDuplicate: boolean;
			lender_xid?: number;
			lead_xid?: number;
			isOffer?: boolean | string;
		};
	}> {
		try {
			const { data: resData } = await axios.post(
				'https://apply.switchmyloan.in/api/onSubmit',
				data
			);
			return resData.data;
		} catch (error) {
			console.error('Error sending data to cready.in:', error);
			return {
				lenderA: {
					data: {},
					success: false,
					message: 'Failed to send mail',
					statusCode: 500,
					isDuplicate: false,
				},
			};
		}
	}
}
