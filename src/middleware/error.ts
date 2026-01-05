import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/helper/ApiError';
import config from '../config/config';
import logger from '../config/logger';
import ApiResponse from '../utils/helper/ApiResponse';
import { TokenExpiredError } from 'jsonwebtoken';

class error {
	static errorConverter(
		err: ApiError,
		req: Request,
		res: Response,
		next: NextFunction
	): void {
		// Define a broader type for error
		let error: ApiError | (Error & { statusCode?: number; errors?: Error[] }) =
			err;

		// Handle Sequelize validation and unique constraint errors
		if (Array.isArray(error.errors) && error.errors.length > 0) {
			const messages = error.errors.map((e: Error) => e.message);
			error = new ApiError(
				400,
				messages.join(', '),
				error.errors,
				true,
				err.stack
			);
		}

		if (err instanceof TokenExpiredError) {
			error = new ApiError(401, 'Session expire', [], false, err.stack);
		}

		if (!(error instanceof ApiError)) {
			// Handle other errors
			const statusCode = error.statusCode || 500;
			const message = error.message || 'Something went wrong';
			error = new ApiError(statusCode, message, [], false, err.stack);
		}

		next(error);
	}

	static errorHandler(
		err: ApiError,
		req: Request,
		res: Response,
		_next: NextFunction // Retain this even if unused
	): void {
		// Extract error details with fallback defaults
		let { statusCode = 500, message = 'Internal server error' } = err;

		// Production: Ensure only operational errors reveal their messages
		if (config.env === 'production' && !err.isOperational) {
			statusCode = 500;
			message = 'An unexpected error occurred';
		}

		// Attach error message to response locals for potential templating
		res.locals.errorMessage = err.message;

		// Log the error in all environments
		logger.error({
			message: err.message,
			stack: err.stack,
			statusCode,
			errors: err.errors || [],
		});

		// Send the response
		res.status(statusCode).json(
			new ApiResponse(statusCode, null, message, {
				stack:
					config.env === 'development' && err.stack ? err.stack : undefined,
				errors:
					config.env === 'development' && err.errors
						? err.errors.map((e: Error) => e.message)
						: [],
			})
		);

		// Do not call `next()` here, as this is the final error handler.
	}
}

export default error;
