import dotenv from 'dotenv';
import path from 'path';
import * as yup from 'yup';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = yup
	.object()
	.shape({
		NODE_ENV: yup
			.string()
			.oneOf(['production', 'development', 'test'])
			.required(),
		PORT: yup.number().default(3002),

		// DataBase
		DB_USERNAME: yup.string().required('DB Username is required'),
		DB_PASSWORD: yup.string().required('DB Password is required'),
		DB_DATABASE_NAME: yup.string().required('Database name is required'),
		DB_HOSTNAME: yup
			.string()
			.default('127.0.0.1')
			.required('DB Hostname is required'),
		DB_PORT: yup.number().default(3306).required('DB Port is required'),
	})
	.noUnknown(true);

// Validate and prepare the configuration
function getConfig() {
	try {
		// Validate the environment variables
		const envVars = envVarsSchema.validateSync(process.env, {
			abortEarly: false, // Validate all fields before throwing errors
			stripUnknown: true, // Remove fields not in the schema
		});

		// Return the validated configuration
		return {
			env: envVars.NODE_ENV,
			port: envVars.PORT,
			database: {
				development: {
					host: envVars.DB_HOSTNAME,
					port: envVars.DB_PORT,
					username: envVars.DB_USERNAME,
					password: envVars.DB_PASSWORD,
					database: envVars.DB_DATABASE_NAME,
					logging: false,
					synchronize: true,
				},
				test: {
					host: envVars.DB_HOSTNAME,
					port: envVars.DB_PORT,
					username: envVars.DB_USERNAME,
					password: envVars.DB_PASSWORD,
					database: envVars.DB_DATABASE_NAME,
					logging: false,
					socketPath: '/var/run/mysqld/mysqld.sock',
					synchronize: true,
				},
				production: {
					host: envVars.DB_HOSTNAME,
					port: envVars.DB_PORT,
					username: envVars.DB_USERNAME,
					password: envVars.DB_PASSWORD,
					database: envVars.DB_DATABASE_NAME,
					logging: true,
					// socketPath: '/var/run/mysqld/mysqld.sock',
					synchronize: true,
				},
			},
		};
	} catch (error: unknown) {
		if (error instanceof yup.ValidationError) {
			console.error('Validation Errors:', error.errors.join(', '));
		} else {
			console.error('Unexpected error during configuration validation:', error);
		}

		console.error(
			'Server shut down due to incomplete environment variable configuration.'
		);
		process.exit(1); // Exit with error code 1
	}
}

// Validate and export configuration only if validation succeeds
const config = getConfig();
export default config;
