import * as yup from 'yup';

export const loanApplicationSchema = yup.object({
	firstName: yup.string().required('First name is required'),
	lastName: yup.string().required('Last name is required'),
	email: yup.string().email('Invalid email format').required('Email is required'),
	gender: yup
		.string()
		.transform(value => (typeof value === 'string' ? value.toLowerCase() : value))
		.oneOf(['male', 'female', 'other'], 'Gender must be male, female, or other')
		.required('Gender is required'),
	cityPincode: yup
		.string()
		.matches(/^\d{6}$/, 'Pincode must be exactly 6 digits')
		.required('Pincode is required'),
	panCard: yup
		.string()
		.matches(/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/, 'Invalid PAN format')
		.required('PAN is required'),
	dateOfBirth: yup
		.date()
		.typeError('Invalid date format')
		.required('Date of birth is required'),
	profile: yup.string().required('Job profile is required'),
	monthlyIncome: yup
		.number()
		.min(1000, 'Monthly income must be at least 1000')
		.required('Monthly income is required'),
	loanAmount: yup
		.number()
		.min(1000, 'Loan amount must be at least 1000')
		.required('Loan amount is required'),
	mobileNumber: yup
		.string()
		.matches(/^[6-9]\d{9}$/, 'Mobile number must be 10 digits starting with 6-9')
		.required('Mobile number is required'),
});
