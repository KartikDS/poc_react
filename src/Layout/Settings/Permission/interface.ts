export interface PERMISSION_LIST {
  id: string;
  name: string;
  read: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  action: JSX.Element;
}
