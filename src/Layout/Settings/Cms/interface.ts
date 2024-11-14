export interface CMS_LIST {
  id: string;
  title: string;
  slug: string;
  content: string;
  subTitle: string;
  metaTitle: string;
  metaKeyword: string;
  shortDescription: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  action: JSX.Element;
}
