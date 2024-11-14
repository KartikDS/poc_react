import { ACTION, API_ERROR, KEYPAIR } from '@/types/interfaces';
import { api } from '@/utils/axiosInterceptor';
import { formatDate, handleErrors } from '@/utils/helpers';

export async function removeUserFromList(action: ACTION): Promise<unknown> {
  try {
    const { payload } = action as { payload: KEYPAIR };
    const res: ReturnType<any> = await api(`/api/administrator/delete-admin/${payload?.id}`, 'DELETE', {
      data: payload,
    });
    return res;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}

export async function changeUserStatus(action: ACTION): Promise<unknown> {
  try {
    const { payload } = action as { payload: KEYPAIR };
    const res: ReturnType<any> = await api(`/api/administrator/change-status/${payload?.id}`, 'POST');
    return res;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}

export async function getUserDetailById(action: ACTION): Promise<unknown> {
  try {
    const { payload } = action as { payload: KEYPAIR };
    const res: ReturnType<any> = await api(`/api/administrator/get-details/${payload?.id}`);
    return res;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}

export async function exportTable(action: ACTION): Promise<unknown> {
  const { payload } = action as { payload: KEYPAIR };
  const { moduleName } = payload as any;
  const { userId } = payload as any;
  const { instructorId } = payload as any;

  const options = {
    responseType: 'blob',
    params: {
      moduleName,
      userId,
      instructorId,
    },
  } as any;

  try {
    const res: ReturnType<any> = (await api(`/api/administrator/get-data`, 'GET', options)) as any;

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
