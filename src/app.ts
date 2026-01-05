import requestId from 'request-ip';
import express, { Application, NextFunction, Request, Response } from 'express';
import config from './config/config';
import morgan from './config/morgan';
import path from 'path';
import logger from './config/logger';
import error from './middleware/error';
import routes from './routes';
import ApiError from './utils/helper/ApiError';
import cors from 'cors';
import { corsOptions } from './config/cors';

class App {
	private app: Application;

	constructor() {
		this.app = express();
		this.initializeMiddlewares();
		this.initializeRoutes();
		this.initializeErrorHandling();
	}

	private initializeMiddlewares(): void {
		// Loggers
		if (config.env !== 'test') {
			this.app.use(morgan.successHandler);
			this.app.use(morgan.errorHandler);
		}

		// Add request ID
		this.app.use(requestId.mw());

		// ✅ Apply CORS to all routes (preflight included)
		this.app.use(cors(corsOptions));

		// Parse body
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

		// Serve static files
		this.app.use('/public', express.static(path.join(__dirname, '../public')));
	}

	private initializeRoutes(): void {
		// Main API routes
		this.app.use('/api', routes);

		// Handle 404
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			next(new ApiError(404, 'Not found'));
		});
	}

	private initializeErrorHandling(): void {
		// Error converter
		this.app.use(error.errorConverter);

		// Error handler
		this.app.use(error.errorHandler);
	}

	public listen(port: number): ReturnType<typeof this.app.listen> {
		return this.app.listen(port, '0.0.0.0', () => {
			logger.info(`🚀 Server listening on port ${config.port}`);
			logger.info(`🌍 Environment: ${config.env}`);
		});
	}
}

export default new App();
