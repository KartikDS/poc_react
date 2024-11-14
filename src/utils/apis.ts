import { APIS_INTERFACE } from '@/types/interfaces';

const APIS: APIS_INTERFACE = {
  LOGIN: {
    url: `/api/auth/login`,
    method: 'POST',
  },
  FORGOT_PASSWORD: {
    url: '/api/auth/forgot-password',
    method: 'POST',
  },
  RESET_PASSWORD: {
    url: '/api/auth/reset-password',
    method: 'POST',
  },
  GET_AUTH_USER: {
    url: '/api/auth/get-auth-user',
    method: 'POST',
  },
  UPDATE_AUTH_USER: {
    url: '/api/auth/update-details',
    method: 'POST',
  },
  GET_USER_LIST: {
    url: '/api/users/list',
    method: 'POST',
  },
  CREATE_USER: {
    url: '/api/users/add',
    method: 'POST',
  },
  CREATE_CATEGORY: {
    url: '/api/category/add-new-category',
    method: 'POST',
  },
  UPDATE_CATEGORY: {
    url: '/api/category/edit/:id',
    method: 'POST',
  },
  UPDATE_USER: {
    url: '/api/users/update',
    method: 'PUT',
  },
  UPDATE_USER_STATUS: {
    url: '/api/users/update-status',
    method: 'POST',
  },

  DELETE_USER: {
    url: '/api/users/delete',
    method: 'DELETE',
  },
  CATEGORY_LIST: {
    url: '/api/category/list',
    method: 'POST',
  },

  DELETE_CATEGORY: {
    url: '/api/users/delete/:id',
    method: 'DELETE',
  },
  REGISTER_EMPOLYMENT: {
    url: '/api/employment/create-employment',
    method: 'POST',
  },
  PAYMENT_CALLBACK: {
    url: '/api/employment/verify-payment',
    method: 'POST',
  },
  EMPLOYER_LIST: {
    url: '/api/employment/employer-list',
    method: 'POST',
  },
  EMPLOYEE_LIST: {
    url: '/api/employment/employee-list',
    method: 'POST',
  },
  EXPORT_EMPLOYEE: {
    url: '/api/employment/export-employee',
    method: 'POST',
  },
  EXPORT_EMPLOYEE_test: {
    url: '/api/employment/export-employee/:id',
    method: 'POST',
  },

  CMS_LIST: {
    url: '/api/cms/list',
    method: 'POST',
  },
  INDUSTRY_LIST: {
    url: '/api/industry/list',
    method: 'POST',
  },
  FIELD_LIST: {
    url: '/api/field/list',
    method: 'POST',
  },
  ENQUIRY_REPLY: {
    url: '/api/enquiry/enquiry-reply/:enquiryId',
    method: 'GET',
  },
  PERMISSION_LIST: {
    url: '/api/permission/list',
    method: 'POST',
  },
  GET_PERMISSION: {
    url: '/api/permission/getByModule',
    method: 'POST',
  },
  CREATE_CMS: {
    url: '/api/cms/add-new-page',
    method: 'POST',
  },
  CREATE_INDUSTRY: {
    url: '/api/industry/add-new-industry',
    method: 'POST',
  },
  CREATE_FIELD: {
    url: '/api/field/add-new-field',
    method: 'POST',
  },
  UPDATE_FIELD: {
    url: '/api/field/edit/:id',
    method: 'POST',
  },
  UPDATE_CMS: {
    url: '/api/cms/edit/:pageid',
    method: 'POST',
  },
  DELETE_CMS: {
    url: '/api/cms/delete-page/:pageName',
    method: 'DELETE',
  },
  DELETE_INDUSTRY: {
    url: '/api/industry/delete-industry/:id',
    method: 'DELETE',
  },
  DELETE_FIELD: {
    url: '/api/field/delete-feild/:id',
    method: 'DELETE',
  },
  DELETE_HAZARD_CATEGORY: {
    url: '/api/category/delete-category/:id',
    method: 'DELETE',
  },
  UPDATE_INDUSTRY: {
    url: '/api/industry/edit/:id',
    method: 'POST',
  },
  UPDATE_PERMISSION_STATUS: {
    url: '/api/permission/change-status/:id',
    method: 'POST',
  },
  UPDATE_CMS_STATUS: {
    url: '/api/cms/change-status/:id',
    method: 'POST',
  },
  GET_CMS: {
    url: '/api/cms/view/public/:slug',
    method: 'GET',
  },
  COMPLAIN_LIST: {
    url: '/api/complain/complain-list',
    method: 'POST',
  },
  CREATE_COMPLAIN: {
    url: '/api/complain/add-new-complain',
    method: 'POST',
  },
  EMPLOYEE_HISTORY_LIST: {
    url: '/api/employment/get-employment-history',
    method: 'POST',
  },
  GET_EMPLOYMENT_ID: {
    url: '/api/complain/get-id',
    method: 'POST',
  },
  CREATE_COMMENT: {
    url: '/api/comment/add-new-comment',
    method: 'POST',
  },
  COMMENT_LIST: {
    url: '/api/comment/list',
    method: 'POST',
  },
  DELETE_COMMENT: {
    url: '/api/comment/delete-comment/:id',
    method: 'DELETE',
  },
  UPDATE_COMMENT: {
    url: '/api/comment/edit/:id',
    method: 'POST',
  },
  UPDATE_END_DATE: {
    url: '/api/employment/edit-end-date',
    method: 'POST',
  },
  UPDATE_STATUS: {
    url: '/api/employment/edit-status',
    method: 'POST',
  },
  getPagesList: {
    url: '/api/administrator/cms-list',
    method: 'GET',
  },
  getPageDetailByTitle: {
    url: '/api/administrator/cms/view/:id',
    method: 'GET',
  },
  EMPLOYEE_DATA: {
    url: '/api/employment/get-employee-data',
    method: 'POST',
  },
  GET_COMMENT: {
    url: '/api/employment/get-comment',
    method: 'POST',
  },
  getEmailsList: {
    url: '/api/emailTemplate/list',
    method: 'POST',
  },
  CREATE_EMAIL: {
    url: '/api/emailTemplate/add-new-emailTemplate',
    method: 'POST',
  },
  UPDATE_EMAIL: {
    url: '/api/emailTemplate/edit/:slug',
    method: 'POST',
  },
  changeEmailStatus: {
    url: '/api/emailTemplate/change-status/:id',
    method: 'POST',
  },
  removeEmailFromList: {
    url: '/api/emailTemplate/delete-emailTemplate/:id',
    method: 'DELETE',
  },
  getEnquiriesList: {
    url: '/api/enquiry/list',
    method: 'POST',
  },
  CREATE_ENQUIRY: {
    url: '/api/enquiry/add-new-enquiry',
    method: 'POST',
  },
  changeEnquiryStatus: {
    url: '/api/enquiry/change-status/:id',
    method: 'POST',
  },
  removeEnquiryFromList: {
    url: '/api/enquiry/delete-enquiry/:id',
    method: 'DELETE',
  },
  replyEnquiry: {
    url: '/api/enquiry/reply',
    method: 'POST',
  },
};
export default APIS;
