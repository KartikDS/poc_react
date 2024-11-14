'use client';

import React, { memo, useEffect, useMemo } from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import { useSearchParams } from 'next/navigation';
import moment from 'moment';

import { useRequest } from '@/components/App';
import { useCommonReducer } from '@/components/App/reducer';
import Modal from '@/components/Default/Modal';
import DefaultTable from '@/components/Default/Table';
import { useContainerContext } from '@/Layout/Container/context';
import { deleteDialog, toastr } from '@/utils/helpers';

import HazardCategoryHeader from './Components/HazardCategoryHeader';
import HazardCategoryForm from './Components/HazardCategoryForm';
import HazardCategoryPreview from './Components/HazardCategoryPreview';

interface Field {
  id: string;
  name: string;
  description: string;
  fieldImage: string;
  createdAt: string;
  updatedAt: string;
}
interface Category {
  id: string;
  name: string;
  description: string;
  categoryImage: string;
  fields: Field[];
  createdAt: string;
  updatedAt: string;
  action: JSX.Element;
}

function Index() {
  const { request, loading } = useRequest();
  const searchParams = useSearchParams();
  const feildId = searchParams.get('feildId');
  const fieldName = searchParams.get('fieldName');
  const icon = searchParams.get('icon');

  const { state: globalState } = useContainerContext();
  const { state, dispatch } = useCommonReducer({
    columns: {
      view: [],
      selected: [],
    },
  });

  const removeCategory = async (id: string | string[]) => {
    if (!id) return;

    const categoryId = Array.isArray(id) ? id[0] : id;

    const confirm = await deleteDialog('Are you sure you want to delete the category?', 'Delete Category');
    if (confirm) {
      const options = { id: categoryId };

      const res = await request('DELETE_HAZARD_CATEGORY', {}, options);
      if (res) toastr('The category has been successfully removed.', 'success', 'Category removed');
      dispatch({ categoryDetail: {}, multirecordSelected: false, viewCategoryPreviewModal: false });
    }
  };

  const openModal = () => {
    dispatch({ viewCategoryModal: true, edit: false, categoryModalTitle: 'Add new category', categoryDetail: null });
  };

  const openEditModal = (data: Category) => {
    dispatch({ viewCategoryModal: true, edit: true, categoryModalTitle: `Edit ${data.name}`, categoryDetail: data });
  };

  const closeModal = (key: string) => {
    dispatch({ [key]: false, categoryDetail: null, columns: state?.columns, categoryModalTitle: '' });
  };

  const openPreviewModal = (data: Category) => {
    dispatch({ viewCategoryPreviewModal: true, categoryModalTitle: `View ${data.name}`, categoryDetail: data });
  };

  const editPreviewModal = (data: Category) => {
    dispatch({
      viewCategoryPreviewModal: false,
      viewCategoryModal: true,
      edit: true,
      categoryDetail: data,
      categoryModalTitle: `Edit ${data.name}`,
    });
  };

  const columns = [
    {
      dataField: 'id',
      text: '#',
      sort: false,
    },
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
    },
    {
      dataField: 'description',
      text: 'Description',
      sort: false,
    },

    {
      dataField: 'updatedAt',
      text: 'Updated On',
      sort: false,
    },
    {
      dataField: 'action',
      text: 'Action',
    },
  ];

  useEffect(() => {
    if (feildId) dispatch({ feildId: { feildId } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategoriesList = useMemo(
    () =>
      globalState?.CATEGORY_LIST?.result
        ? globalState?.CATEGORY_LIST?.result?.map((category: Category, index: number) => ({
            id: index + 1,
            name: category.name,
            description: category.description,

            createdAt: moment(category.createdAt).format('LLL'),
            updatedAt: moment(category.updatedAt).format('LLL'),
            action: (
              <Dropdown className="actionDropDown">
                <Dropdown.Toggle id="dropdown-basic">
                  <Image alt="menu" height={20} width={20} src="/assets/images/menu.svg" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => openEditModal(category)}>
                    <Image alt="editIcon" height={16} width={16} src="/assets/images/edit.svg" /> Edit details
                  </Dropdown.Item>

                  <Dropdown.Item onClick={() => removeCategory([category.id])}>
                    <Image alt="deleteIcon" height={16} width={16} src="/assets/images/delete.svg" /> Delete
                  </Dropdown.Item>

                  <Dropdown.Item onClick={() => openPreviewModal(category)}>
                    <Image alt="viewIcon" height={16} width={16} src="/assets/images/preview.svg" /> Preview
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ),
          }))
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [globalState?.CATEGORY_LIST?.result],
  );

  const isLoading = useMemo(
    () => loading?.DELETE_HAZARD_CATEGORY_LOADING || loading?.UPDATE_CATEGORY_STATUS_LOADING || state?.isEditLoading,
    [loading, state?.isEditLoading],
  );

  return (
    <>
      <HazardCategoryHeader
        title={'Category'}
        totalRecords={globalState?.getCategoriesList?.total}
        handleOpen={openModal}
        fieldName={fieldName}
        icon={icon}
      />
      <DefaultTable
        api={{
          url: 'CATEGORY_LIST',
          body: state?.feildId,
        }}
        search={true}
        columns={columns}
        data={getCategoriesList}
        loading={Boolean(isLoading)}
        title=""
        placeholder="Search by Name or Description"
      />

      <Modal
        id={'Category' + '_modal'}
        title={state?.categoryModalTitle}
        show={state.viewCategoryModal}
        width="40%"
        onClose={() => closeModal('viewCategoryModal')}
      >
        <HazardCategoryForm
          state={state}
          dispatch={dispatch}
          handleClose={() => closeModal('viewCategoryModal')}
          feildId={feildId}
        />
      </Modal>
      {state.viewCategoryPreviewModal && state.categoryDetail && (
        <Modal
          id={'CategoryPreview' + '_modal'}
          title={state?.categoryModalTitle}
          show={true}
          onClose={() => closeModal('viewCategoryPreviewModal')}
        >
          <HazardCategoryPreview
            categoryDetail={state.categoryDetail}
            handleEdit={() => editPreviewModal(state.categoryDetail)}
            onDelete={() => removeCategory([state.categoryDetail.id])}
          />
        </Modal>
      )}
    </>
  );
}

export default memo(Index);
