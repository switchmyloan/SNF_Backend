import {
	IAuthorRepository,
	IBlogRepository,
	ICategoryRepository,
	IFaqRepository,
	ILenderRepository,
	ILenderResponseRepository,
	ILoanApplicationRepository,
	IOurProductRepository,
	ISiteStatisticRepository,
	ITagRepository,
	ITestimonialRepository,
	IUtMHeadersRepository
} from '@src/interfaces/repository';
import { IBannerRepository } from '@src/interfaces/repository/IBannerRepository';
import { IContactRepository } from '@src/interfaces/repository/IContactRepository';
import { IPressRoomRepository } from '@src/interfaces/repository/IPressRoomRepository';
import {
	AuthorRepository,
	BlogRepository,
	CategoryRepository,
	FaqRepository,
	LenderRepository,
	LenderResponseRepository,
	LoanApplicationRepository,
	PressRoomRepository,
	TagRepository,
	TestimonialRepository
} from '@src/repositories';
import { BannerRepository } from '@src/repositories/banner/banner.repository';
import { ContactRepository } from '@src/repositories/contact/contact.repository';
import { OurProductRepository } from '@src/repositories/ourProduct/ourProduct.repository';
import { SiteStatisticRepository } from '@src/repositories/siteStatistic/siteStatic.repository';
import { UtmHeadersRepository } from '@src/repositories/UtmHeaders/utmHeaders.repository';
import { ContainerModule } from 'inversify';
import { INTERFACE_TYPE } from 'types/inversify.types';

export const repositoryBindings = new ContainerModule(({ bind }) => {

	bind<ILoanApplicationRepository>(INTERFACE_TYPE.LoanApplicationRepository)
		.to(LoanApplicationRepository)
		.inSingletonScope();

	bind<ILenderRepository>(INTERFACE_TYPE.LenderRepository)
		.to(LenderRepository)
		.inSingletonScope();

	bind<ILenderResponseRepository>(INTERFACE_TYPE.LenderResponseRepository)
		.to(LenderResponseRepository)
		.inSingletonScope();


	bind<IAuthorRepository>(INTERFACE_TYPE.AuthorRepository)
		.to(AuthorRepository)
		.inSingletonScope();

	bind<IBlogRepository>(INTERFACE_TYPE.BlogRepository)
		.to(BlogRepository)
		.inSingletonScope();

	bind<ITagRepository>(INTERFACE_TYPE.TagRepository)
		.to(TagRepository)
		.inSingletonScope();

	bind<IFaqRepository>(INTERFACE_TYPE.FaqRepository)
		.to(FaqRepository)
		.inSingletonScope();

	bind<IOurProductRepository>(INTERFACE_TYPE.OurProductRepository)
		.to(OurProductRepository)
		.inSingletonScope();

	bind<ICategoryRepository>(INTERFACE_TYPE.CategoryRepository)
		.to(CategoryRepository)
		.inSingletonScope();

	bind<ITestimonialRepository>(INTERFACE_TYPE.TestimonialRepository)
		.to(TestimonialRepository)
		.inSingletonScope();


	bind<IUtMHeadersRepository>(INTERFACE_TYPE.UtmHeadersRepository)
		.to(UtmHeadersRepository)
		.inSingletonScope();

	bind<IBannerRepository>(INTERFACE_TYPE.BannerRepository)
		.to(BannerRepository)
		.inSingletonScope();

	bind<ISiteStatisticRepository>(INTERFACE_TYPE.SiteStatisticRepository)
		.to(SiteStatisticRepository).inSingletonScope();

	bind<IContactRepository>(INTERFACE_TYPE.ContactRepository)
		.to(ContactRepository)
		.inSingletonScope();

	bind<IPressRoomRepository>(INTERFACE_TYPE.PressRoomRepository)
		.to(PressRoomRepository)
		.inSingletonScope();

});
