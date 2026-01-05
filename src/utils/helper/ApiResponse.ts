class ApiResponse<T> {
	statusCode: number;
	data: T | null;
	message: string;
	success: boolean;
	stack?: string; // Made optional
	errors?: string[] | Error[]; // Made optional

	constructor(
		statusCode: number,
		data: T | null,
		message: string = 'Success',
		options: { stack?: string; errors?: string[] | Error[] } = {}
	) {
		this.statusCode = statusCode;
		this.data = data;
		this.message = message;
		this.success = statusCode < 400;

		// Include `stack` and `errors` only if success is false.
		if (!this.success) {
			this.stack = options.stack || undefined;
			this.errors = options.errors || [];
		}
	}
}

export default ApiResponse;
