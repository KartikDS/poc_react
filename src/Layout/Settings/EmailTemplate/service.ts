import { ACTION, API_ERROR, KEYPAIR } from '@/types/interfaces';
import { api } from '@/utils/axiosInterceptor';
import { handleErrors } from '@/utils/helpers';

export async function getEmailsList(action: ACTION): Promise<any> {
  try {
    const { payload } = action as { payload: KEYPAIR };
    const searchKey = payload.keyword || '';
    const sortOrder = payload.sortOrder || 'desc';
    const sortKey = payload.sortKey || 'id';
    const pageNumber = payload.pageNumber || 1;
    const pageLength = payload.pageLength || 10;

    const url = `/api/administrator/email-templets/list`;
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

export async function createEmail(action: ACTION): Promise<unknown> {
  try {
    const { payload } = action;
    const res: ReturnType<any> = await api(`/api/administrator/email-template`, 'POST', { data: payload });
    return res;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}

export async function updateEmail(action: ACTION): Promise<unknown> {
  try {
    const { payload } = action as { payload: KEYPAIR };
    const res: ReturnType<any> = await api(`/api/administrator/email-template/edit/${payload?.slug}`, 'PATCH', {
      data: payload,
    });
    return res;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}

export async function removeEmailFromList(action: ACTION): Promise<unknown> {
  try {
    const { payload } = action as { payload: KEYPAIR };
    const res: ReturnType<any> = await api(`/api/administrator/email-template/delete/${payload?.slug}`, 'DELETE', {
      data: payload,
    });
    return res;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}

export async function changeEmailStatus(action: ACTION): Promise<unknown> {
  try {
    const { payload } = action as { payload: KEYPAIR };
    const res: ReturnType<any> = await api(`/api/administrator/email-template/update-status/${payload?.slug}`, 'POST');
    return res;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}
