import { Request, Response, NextFunction } from 'express';
import { ApiError, pick } from 'utils/index';
import { ObjectSchema, ValidationError } from 'yup';

const validate =
	(schema: Partial<Record<keyof Request, ObjectSchema<Record<string, unknown>>>>) =>
	(req: Request, res: Response, next: NextFunction): void => {
		const validRequestKeys = [
			'params',
			'query',
			'body',
			'file',
			'files',
		] as const;
		type WritableKeys = (typeof validRequestKeys)[number]; // "params" | "query" | ...

		const validSchema = pick(
			schema,
			validRequestKeys as unknown as WritableKeys[]
		);
		const object = pick(req, validRequestKeys as unknown as WritableKeys[]);

		const promises = (Object.keys(validSchema) as WritableKeys[]).map((key) =>
			validSchema[key]?.validate(object[key], { abortEarly: false })
		);

		Promise.all(promises)
			.then((validatedValues) => {
				validatedValues.forEach((value, index) => {
					const key = validRequestKeys[index];
					if (!key) return;

					if (value && typeof value === 'object' && req[key]) {
						Object.assign(req[key] as object, value);
					} else {
						(req as unknown as Record<string, unknown>)[key] = value;
					}
				});
				next();
			})
			.catch((err: ValidationError) => {
				const errorMessage = err.inner
					.map((detail) => detail.message)
					.join(', ');
				next(new ApiError(400, errorMessage));
			});
	};

export default validate;
