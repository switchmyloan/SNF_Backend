import { Request, Response, NextFunction } from 'express';

export function AsyncHandler() {
	return function (
		target: object,
		propertyKey: string,
		descriptor: PropertyDescriptor
	): void {
		const originalMethod = descriptor.value;

		descriptor.value = function (
			req: Request,
			res: Response,
			next: NextFunction
		) {
			Promise.resolve(originalMethod.call(this, req, res, next)).catch(next);
		};
	};
}
