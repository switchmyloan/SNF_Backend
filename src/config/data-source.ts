import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from './config';
import path from 'path';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: config.database[config.env].host, // Dynamically set host based on environment
	port: config.database[config.env].port, // Dynamically set port based on environment
	username: config.database[config.env].username, // Dynamically set username
	password: config.database[config.env].password, // Dynamically set password
	database: config.database[config.env].database, // Dynamically set database
	synchronize: config.database[config.env].synchronize,
	entities: [path.resolve(__dirname, '../entities/**/*.ts')],
	migrations: [path.resolve(__dirname, '../migration/**/*.ts')],
	subscribers: [],
});
