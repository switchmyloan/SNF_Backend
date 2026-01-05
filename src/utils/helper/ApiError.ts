class ApiError<T = unknown> extends Error {
	statusCode: number;
	data: T | null;
	message: string;
	success: boolean;
	errors: Array<Error>;
	isOperational: boolean;
	stack?: string;

	constructor(
		statusCode: number,
		message: string = 'Something went wrong',
		errors: Array<Error> = [],
		isOperational: boolean = true,
		stack?: string
	) {
		super(message);
		this.statusCode = statusCode;
		this.data = null;
		this.message = message;
		this.success = false;
		this.errors = errors;
		this.isOperational = isOperational;

		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

export default ApiError;
