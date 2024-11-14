export interface IETarget {
  event: MouseEvent;
}

export interface KEYPAIR {
  [key: string]: unknown;
}

export interface DATATABLE_COLUMN {
  dataField: string;
  text: string;
  hidden?: boolean;
  value?: string;
  search?: boolean;
}
export interface DATATABLE_ROWS {
  [field: string]: JSX.Element | JSX.Element[] | string | number | boolean;
}

export interface ACTION {
  payload?: KEYPAIR | KEYPAIR[];
}
export interface REQUEST {
  columnViews: unknown;
  data?: unknown;
  message?: string;
  error?: unknown;
}

export interface PAYLOAD {
  data?: unknown;
}
export type RESPONSE = {
  success: boolean;
  data?: unknown;
  error?: unknown;
};
export interface HANDLE_ERRORS {
  [key: string]: string[];
}
export interface REGISTER {
  (action: ACTION): unknown;
}

export interface API_ERROR {
  error: HANDLE_ERRORS;
  message: string;
  statusCode?: number;
}

export interface SETTINGS_PAYLOAD {
  primaryColor: string;
  logo: string;
  banner: string;
  font: string;
}

export interface API_RESPONSE {
  data?: any;
  message: string;
  statusCode: number;
}

export interface APIS_DATA {
  url: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
}
export interface APIS_INTERFACE {
  [key: string]: APIS_DATA;
}

export type ROLES = 'SUPERADMIN' | 'ADMIN' | 'USER';
export interface AUTH_USER {
  fullname: string;
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: ROLES;
  phone: string | null;
  lastLogin: string;
  isUserVerify: boolean;
  status: boolean;
}

export interface CREATE_UPDATE_COLUMN {
  createdAt: '2024-08-28T10:57:45.426Z';
  updatedAt: '2024-08-28T10:57:45.426Z';
}
