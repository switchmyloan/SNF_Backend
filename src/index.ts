import 'reflect-metadata';
import 'module-alias/register';
import app from './app';
import config from './config/config';
import { AppDataSource } from './config/data-source';
import logger from './config/logger';

let server: ReturnType<typeof app.listen>;

AppDataSource.initialize()
	.then(async() => {
		server = app.listen(config.port);
		logger.info('Data Source has been initialized!');
	})
	.catch((err: Error) => {
		console.log(err);

		logger.error('Error during Data Source initialization', err);
		process.exit(1);
	});

const exitHandler = () => {
	if (server) {
		server.close(() => {
			logger.info('server closed');
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

const unexpectedErrorHandler = (error: Error) => {
	logger.error('Un-Expected Error: ', error);
	exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGALRM', () => {
	logger.info('SIGALRM signal received');
	if (server) {
		server.close();
	}
});
