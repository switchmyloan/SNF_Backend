import express, { Router } from 'express';
import config from '../config/config';

// Define a reusable type for route definitions
interface RouteDefinition {
	path: string;
	route: () => Promise<Router>; // Function returning a Promise of Router
}

class Routes {
	private router: Router;
	private defaultRoutes: RouteDefinition[];
	private devRoutes: RouteDefinition[];

	constructor() {
		this.router = express.Router();
		this.defaultRoutes = this.initializeDefaultRoutes();
		this.devRoutes = this.initializeDevRoutes();

		this.setupRoutes();
	}

	// Initialize default routes with dynamic imports
	private initializeDefaultRoutes(): RouteDefinition[] {
		return [
			{
				path: '/loan-application',
				route: () => import('./loanApplication').then((module) => module.default),
			},
			{
				path: '/blog',
				route: () => import('./blog').then((module) => module.default),
			},
			{
				path: '/author',
				route: () => import('./author').then((module) => module.default),
			},
			{
				path: '/tag',
				route: () => import('./tag').then((module) => module.default),
			},
			{
				path: '/faq',
				route: () => import('./faq').then((module) => module.default),
			},
			{
				path: '/category',
				route: () => import('./category').then((module) => module.default),
			},
			{
				path: '/testimonial',
				route: () => import('./testimonial').then((module) => module.default),
			},
			{
				path: '/lender',
				route: () => import('./lender').then((module) => module.default),
			},
			{
				path: '/banner',
				route: () => import('./banner').then((module) => module.default),
			},
			{
				path: '/site-statistic',
				route: () => import('./siteStatictic').then((module) => module.default),
			},
			{
				path: '/ourProduct',
				route: () => import('./ourProduct').then((module) => module.default),
			},
			{
				path: '/contact',
				route: () => import('./contact').then((module) => module.default),
			},
			{
				path: '/press',
				route: () => import('./press').then((module) => module.default),
			},
		];
	}

	// Initialize development-specific routes with dynamic imports
	private initializeDevRoutes(): RouteDefinition[] {
		return [];
	}

	// Register all routes
	private setupRoutes(): void {
		this.defaultRoutes.forEach(({ path, route }) => {
			this.registerRoute(path, route);
		});

		this.setupEnvironmentSpecificRoutes();
	}

	// Register environment-specific routes
	private setupEnvironmentSpecificRoutes(): void {
		if (config.env === 'development') {
			this.devRoutes.forEach(({ path, route }) => {
				this.registerRoute(path, route);
			});
		}
	}

	// Register a single route safely with async handling
	private async registerRoute(
		path: string,
		route: () => Promise<Router>
	): Promise<void> {
		try {
			const loadedRoute = await route();
			this.router.use(path, loadedRoute);
		} catch (error) {
			console.error(`Failed to load route at path: ${path}`, error);
		}
	}

	// Return the router instance
	public getRouter(): Router {
		return this.router;
	}
}

// Export the initialized router
const routes = new Routes();
export default routes.getRouter();
