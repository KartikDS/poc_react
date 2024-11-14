import { ACTION, API_ERROR, KEYPAIR } from '@/types/interfaces';
import { api } from '@/utils/axiosInterceptor';
import { formatDate, handleErrors } from '@/utils/helpers';

export async function getEnquiriesList(action: ACTION): Promise<any> {
  try {
    const { payload } = action as { payload: KEYPAIR };
    const searchKey = payload.keyword || '';
    const sortOrder = payload.sortOrder || 'desc';
    const sortKey = payload.sortKey || 'id';
    const pageNumber = payload.pageNumber || 1;
    const pageLength = payload.pageLength || 10;

    const url = `/api/administrator/enquiry/list`;
    const options = {
      params: {
        searchKey,
        sortOrder,
        sortKey,
        pageNumber,
        pageLength,
      },
    } as any;

    const res = (await api(url, 'GET', options)) as any;
    return res.data;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}

export async function createEnquiry(action: ACTION): Promise<unknown> {
  try {
    const { payload } = action as { payload: KEYPAIR };

    const res = (await api(`/api/administrator/create-admin`, 'POST', { data: payload })) as any;
    return res;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}

export async function replyEnquiry(action: ACTION): Promise<unknown> {
  try {
    const { payload } = action as { payload: KEYPAIR };
    const res: ReturnType<any> = await api(`/api/administrator/enquiry/reply`, 'POST', { data: payload });
    return res;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}

export async function removeEnquiryFromList(action: ACTION): Promise<unknown> {
  try {
    const { payload } = action as { payload: KEYPAIR };
    const res: ReturnType<any> = await api(`/api/administrator/enquiry/delete/${payload?.id}`, 'DELETE', {
      data: payload,
    });
    return res;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}

export async function changeEnquiryStatus(action: ACTION): Promise<unknown> {
  try {
    const { payload } = action as { payload: KEYPAIR };
    const res: ReturnType<any> = await api(`/api/administrator/enquiry/status/${payload?.id}`, 'POST');
    return res;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}

export async function getReplyDetailById(action: ACTION): Promise<unknown> {
  try {
    const { payload } = action as { payload: KEYPAIR };
    const res: ReturnType<any> = await api(`/api/administrator/enquiry/reply/${payload?.id}`);
    return res;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}

export async function getEnquiryDetailById(action: ACTION): Promise<unknown> {
  try {
    const { payload } = action as { payload: KEYPAIR };
    const res: ReturnType<any> = await api(`/api/administrator/get-details/${payload?.id}`);
    return res;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}

export async function exportEnquiryTable(): Promise<unknown> {
  try {
    const res: ReturnType<any> = (await api(`/api/user/export-user`, 'GET', {
      responseType: 'blob',
    })) as any;

    const href = window.URL.createObjectURL(res);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', `Table_${formatDate(new Date())}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(href);
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}
