import * as AuthServices from '@/Layout/Auth/service';
import * as EditColumnServices from '@/Layout/Container/Components/EditColumns/service';
import * as AccountsServices from '@/Layout/Settings/Accounts/service';
import * as BrandingServices from '@/Layout/Settings/Branding/service';
import * as SettingService from '@/Layout/Settings/service';
import * as UserServices from '@/Layout/Settings/Users/service';
import * as EnquiryServices from '@/Layout/Settings/Enquiry/service';
import * as EmailTemplateServices from '@/Layout/Settings/EmailTemplate/service';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...AuthServices,
  ...UserServices,
  ...AccountsServices,
  ...BrandingServices,
  ...EditColumnServices,
  ...SettingService,
  ...EnquiryServices,
  ...EmailTemplateServices,
};
