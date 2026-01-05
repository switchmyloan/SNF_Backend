import { PushLenders } from '@src/external-libraries/pushLenders';
import { IPushLenders } from '@src/interfaces/external-libraries';
import { ContainerModule } from 'inversify';
import { INTERFACE_TYPE } from 'types/inversify.types';

export const externalLibrariesBindings = new ContainerModule(({ bind }) => {
	bind<IPushLenders>(INTERFACE_TYPE.PushLenders)
		.to(PushLenders)
		.inSingletonScope();
});
