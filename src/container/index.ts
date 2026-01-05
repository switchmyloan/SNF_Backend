import { Container } from 'inversify';
import { repositoryBindings } from './repository.bindings';
import { interactorBindings } from './interactor.bindings';
import { controllerBindings } from './controller.bindings';
import { externalLibrariesBindings } from './external.bindings';

const container = new Container();

// Load all binding modules
container.load(
	repositoryBindings,
	interactorBindings,
	controllerBindings,
	externalLibrariesBindings
);

export { container };
