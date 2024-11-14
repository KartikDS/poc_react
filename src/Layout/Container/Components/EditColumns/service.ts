import { ACTION, API_ERROR, KEYPAIR } from '@/types/interfaces';
import { api } from '@/utils/axiosInterceptor';
import { handleErrors } from '@/utils/helpers';

export async function getColumns(action: ACTION): Promise<unknown> {
  try {
    const { payload } = action as { payload: KEYPAIR };
    const res: ReturnType<any> = await api(`/api/tableColumn/get-details/${payload?.model}`, 'GET');
    return res;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}

export async function editColumns(action: ACTION): Promise<unknown> {
  try {
    const { payload } = action;
    const res: ReturnType<any> = await api(`/api/tableColumn/add-update`, 'POST', { data: payload });
    return res;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}

export async function getColumnsNutritions(action: ACTION): Promise<unknown> {
  try {
    const { payload } = action as { payload: KEYPAIR };
    const res: ReturnType<any> = await api(`/api/instructor/nutritions/${payload?.model}`, 'GET');
    return res;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}
