import { AuthorController, BlogController, CategoryController, FaqController, LenderController, LoanApplicationController, OurProductController, TagController, TestimonialController } from '@src/controller';
import { BannerController } from '@src/controller/banner/banner.controller';
import { ContactController } from '@src/controller/contact/contact.controller';
import { PressRoomController } from '@src/controller/press/press.controller';
import { SiteStatisticController } from '@src/controller/siteStatistic/siteStatistic.controller';
import { ContainerModule } from 'inversify';
import { INTERFACE_TYPE } from 'types/inversify.types';

export const controllerBindings = new ContainerModule(({ bind }) => {
	bind<LoanApplicationController>(INTERFACE_TYPE.LoanApplicationController).to(
		LoanApplicationController
	);

	bind<AuthorController>(INTERFACE_TYPE.AuthorController).to(AuthorController);

	bind<BlogController>(INTERFACE_TYPE.BlogController).to(BlogController);

	bind<TagController>(INTERFACE_TYPE.TagController).to(TagController);

	bind<FaqController>(INTERFACE_TYPE.FaqController).to(FaqController);

	bind<OurProductController>(INTERFACE_TYPE.OurProductController).to(OurProductController);

	bind<CategoryController>(INTERFACE_TYPE.CategoryController).to(
		CategoryController
	);

	bind<TestimonialController>(INTERFACE_TYPE.TestimonialController).to(
		TestimonialController
	);

	bind<LenderController>(INTERFACE_TYPE.LenderController).to(LenderController);
	bind<BannerController>(INTERFACE_TYPE.BannerController).to(BannerController);
	bind<SiteStatisticController>(INTERFACE_TYPE.SiteStatisticController).to(SiteStatisticController);

	bind<ContactController>(INTERFACE_TYPE.ContactController).to(
		ContactController
	);

	bind<PressRoomController>(INTERFACE_TYPE.PressRoomController).to(
		PressRoomController
	);
});
