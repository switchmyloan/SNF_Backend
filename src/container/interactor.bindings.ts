import { AuthorInteractor, BlogInteractor, CategoryInteractor, ContactInterator, FaqInteractor, LenderResponseInteractor, LoanApplicationInteractor, TagInteractor, TestimonialInteractor } from '@src/interactor';
import { BannerInteractor } from '@src/interactor/banner/bannerInteractor';
import { LenderInteractor } from '@src/interactor/lender/lenderInteractor';
import { OurProductInteractor } from '@src/interactor/ourProduct/ourProductInteractor';
import { PressRoomInteractor } from '@src/interactor/press/pressInteractor';
import { SiteStatisticInteractor } from '@src/interactor/siteStatistic/siteStatistic.interactor';
import { UtmHeadersInteractor } from '@src/interactor/utmHeaders/utmHeaders.interactor';
import { IAuthorInteractor, IBlogInteractor, ICategoryInteractor, IFaqInteractor, ILenderResponseInteractor, ILoanApplicationInteractor, IOurProductInteractor, ITagInteractor, ITestimonialInteractor, IUtMHeadersInteractor } from '@src/interfaces/interactor';
import { IBannerInteractor } from '@src/interfaces/interactor/IBannerInteractor';
import { IContactInteractor } from '@src/interfaces/interactor/IContactInteractor';
import { ILenderInteractor } from '@src/interfaces/interactor/ILenderInteractor';
import { IPressRoomInteractor } from '@src/interfaces/interactor/IPressRoomInteractor';
import { ISiteStatisticInteractor } from '@src/interfaces/interactor/ISiteStatisticInteractor';
import { ContainerModule } from 'inversify';
import { INTERFACE_TYPE } from 'types/inversify.types';

export const interactorBindings = new ContainerModule(({ bind }) => {


	bind<ILoanApplicationInteractor>(
		INTERFACE_TYPE.LoanApplicationInteractor
	)
		.to(LoanApplicationInteractor)
		.inSingletonScope();

	bind<ILenderInteractor>(INTERFACE_TYPE.LenderInteractor)
		.to(LenderInteractor)
		.inSingletonScope();

	bind<ILenderResponseInteractor>(INTERFACE_TYPE.LenderResponseInteractor)
		.to(LenderResponseInteractor)
		.inSingletonScope();

	bind<IAuthorInteractor>(INTERFACE_TYPE.AuthorInteractor)
		.to(AuthorInteractor)
		.inSingletonScope();

	bind<IBlogInteractor>(INTERFACE_TYPE.BlogInteractor)
		.to(BlogInteractor)
		.inSingletonScope();

	bind<ITagInteractor>(INTERFACE_TYPE.TagInteractor)
		.to(TagInteractor)
		.inSingletonScope();

	bind<IFaqInteractor>(INTERFACE_TYPE.FaqInteractor)
		.to(FaqInteractor)
		.inSingletonScope();

	bind<IOurProductInteractor>(INTERFACE_TYPE.OurProductInteractor)
		.to(OurProductInteractor)
		.inSingletonScope();

	bind<ICategoryInteractor>(INTERFACE_TYPE.CategoryInteractor)
		.to(CategoryInteractor)
		.inSingletonScope();

	bind<ITestimonialInteractor>(INTERFACE_TYPE.TestimonialInteractor)
		.to(TestimonialInteractor)
		.inSingletonScope();

	bind<IUtMHeadersInteractor>(INTERFACE_TYPE.UtmHeaderInteractor)
		.to(UtmHeadersInteractor)
		.inSingletonScope();

	bind<IBannerInteractor>(INTERFACE_TYPE.BannerInteractor)
		.to(BannerInteractor)
		.inSingletonScope();

	bind<ISiteStatisticInteractor>(INTERFACE_TYPE.SiteStatisticInteractor)
		.to(SiteStatisticInteractor).inSingletonScope();

	bind<IContactInteractor>(INTERFACE_TYPE.ContactInteractor)
		.to(ContactInterator)
		.inSingletonScope();

	bind<IPressRoomInteractor>(INTERFACE_TYPE.PressRoomInteractor)
		.to(PressRoomInteractor)
		.inSingletonScope();
});
