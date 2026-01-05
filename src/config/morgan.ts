import { Request, Response } from 'express';
import requestIp from 'request-ip';
import morgan from 'morgan';
import config from './config';
import logger from './logger';

// Define clientIp token
morgan.token('clientIp', (req: Request) => requestIp.getClientIp(req) || '');

// Define error message token
morgan.token(
	'message',
	(req: Request, res: Response) => res.locals.errorMessage || ''
);

// Formats based on environment
const ipFormat = config.env === 'production' ? ':clientIp - ' : '';
const successFormat = `${ipFormat}:method :url :status - :response-time ms`;
const errorFormat = `${ipFormat}:method :url :status - :response-time ms - message: :message`;

// Handlers
const successHandler = morgan(successFormat, {
	skip: (req: Request, res: Response) => res.statusCode >= 400,
	stream: { write: (msg) => logger.info(msg.trim()) },
});

const errorHandler = morgan(errorFormat, {
	skip: (req: Request, res: Response) => res.statusCode < 400,
	stream: { write: (msg) => logger.error(msg.trim()) },
});

export default {
	successHandler,
	errorHandler,
};
