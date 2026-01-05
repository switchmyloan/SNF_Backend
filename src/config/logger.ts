import winston, { Logger, format } from 'winston';
import fs from 'fs';
import path from 'path';
import config from './config';

// ===============================
// Helpers
// ===============================
function getLogDir(): string {
	const now = new Date();

	const day = String(now.getDate()).padStart(2, '0');
	const month = now.toLocaleString('en-US', { month: 'short' });
	const year = now.getFullYear();

	const folderName = `${day}-${month}-${year}`;
	const logDir = path.join(process.cwd(), 'logs', folderName);

	if (!fs.existsSync(logDir)) {
		fs.mkdirSync(logDir, { recursive: true });
	}

	return logDir;
}

const logDir = getLogDir();

// ===============================
// Logger
// ===============================
const logger: Logger = winston.createLogger({
	level: config.env === 'development' ? 'debug' : 'info',

	format: format.combine(
		format.splat(),
		format.timestamp(),
		format.printf((info) => {
			const { timestamp, level, message } = info as {
				timestamp: string;
				level: string;
				message?: unknown;
			};

			return `${timestamp ? new Date(timestamp).toLocaleString() : ''} ${level}: ${message}`;
		})
	),

	transports: [
		// ===============================
		// Console
		// ===============================
		new winston.transports.Console({
			level: config.env === 'development' ? 'debug' : 'info',
			stderrLevels: ['error'],
			format: format.combine(
				format.colorize(),
				format.printf((info) => `${info.level}: ${info.message}`)
			),
		}),

		// ===============================
		// File (Production)
		// ===============================
		...(config.env === 'production'
			? [
					new winston.transports.File({
						filename: path.join(logDir, 'error.log'),
						level: 'error',
					}),
					new winston.transports.File({
						filename: path.join(logDir, 'combined.log'),
					}),
				]
			: []),
	],
});

export default logger;
