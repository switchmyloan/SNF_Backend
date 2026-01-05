export interface IPushLenders {
	sendLeadToLenders(data: {
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
		onboardingStep: string;
		mobileNumber: string;
	}): Promise<{
		[key: string]: {
			data: object;
			success: boolean;
			message: string;
			statusCode: number;
			isDuplicate: boolean;
		};
	}>;
}

// name,
// firstName,
// lastName,
// email,
// gender,
// pincode,
// panNumber,
// dateOfBirth,
// jobType,
// monthlySalary,
// loanAmount,
// onboardingStep
// mobileNumber
