'use client';

import React, { memo, useEffect, useMemo } from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';
import moment from 'moment';

import Tooltip from '@/components/Default/Tooltip';
import { useRequest } from '@/components/App';
import { useCommonReducer } from '@/components/App/reducer';
import Modal from '@/components/Default/Modal';
import DefaultTable from '@/components/Default/Table';
import { useContainerContext } from '@/Layout/Container/context';
import { deleteDialog, toastr } from '@/utils/helpers';

import HazardCategoryForm from '../HazardCategory/Components/HazardCategoryForm';

import FieldHeader from './Components/FieldHeader';
import FieldForm from './Components/FieldForm';
import FieldPreview from './Components/FieldPreview';

interface Category {
  id: string;
  name: string;
  description: string;
  categoryImage: string;
  createdAt: string;
  updatedAt: string;
}
interface Field {
  id: string;
  name: string;
  description: string;
  feildImage: string;
  categories: Category[];
  createdAt: string;
  updatedAt: string;
  action: JSX.Element;
}

function Index() {
  const { request, loading } = useRequest();
  const searchParams = useSearchParams();
  const industryId = searchParams.get('industryId');
  const industryName = searchParams.get('industryName');
  const icon = searchParams.get('icon');

  const { state: globalState } = useContainerContext();
  const { state, dispatch } = useCommonReducer({
    columns: {
      view: [],
      selected: [],
    },
  });

  const router = useRouter();

  const removeField = async (id: string | string[]) => {
    if (!id) return;

    const fieldId = Array.isArray(id) ? id[0] : id;

    const confirm = await deleteDialog('Are you sure you want to delete the field?', 'Delete Field');
    if (confirm) {
      const options = { id: fieldId };

      const res = await request('DELETE_FIELD', {}, options);
      if (res) toastr('The field has been successfully removed.', 'success', 'Field removed');
      dispatch({ fieldDetail: {}, multirecordSelected: false, viewFieldPreviewModal: false });
    }
  };

  const openModal = () => {
    dispatch({ viewFieldModal: true, edit: false, fieldModalTitle: 'Add new field', fieldDetail: null });
  };

  const openEditModal = (data: Field) => {
    dispatch({ viewFieldModal: true, edit: true, fieldModalTitle: `Edit ${data.name}`, fieldDetail: data });
  };

  const closeModal = (key: string) => {
    dispatch({ [key]: false, fieldDetail: null, columns: state?.columns, fieldModalTitle: '' });
  };

  const openPreviewModal = (data: Field) => {
    dispatch({ viewFieldPreviewModal: true, fieldModalTitle: `View ${data.name}`, fieldDetail: data });
  };

  const editPreviewModal = (data: Field) => {
    dispatch({
      viewFieldPreviewModal: false,
      viewFieldModal: true,
      edit: true,
      fieldDetail: data,
      fieldModalTitle: `Edit ${data.name}`,
    });
  };
  const openCategoryModal = (data: Field) => {
    dispatch({ viewCategoryModal: true, feildId: data.id });
  };

  const columns = [
    {
      dataField: 'id',
      text: '#',
      sort: false,
    },
    {
      dataField: 'icon',
      text: 'Icon',
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
      dataField: 'category',
      text: 'Category',
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
    if (industryId) dispatch({ industryId: { industryId } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFieldsList = useMemo(
    () =>
      globalState?.FIELD_LIST?.result
        ? globalState?.FIELD_LIST?.result?.map((field: Field, index: number) => ({
            id: index + 1,
            icon: (
              <Image
                src={`/images/${field.feildImage}`}
                alt={`Icon for ${field.name}`}
                width={40}
                height={40}
                className="img-fluid rounded-circle"
              />
            ),
            name: field.name,
            description: field.description,
            category: (
              <Tooltip text="View related Categories">
                <span
                  className="rounded ms-2"
                  style={{
                    color: '#fd7e14',
                    padding: '0.25rem 0.5rem',
                    fontSize: '15px',
                  }}
                  role="button"
                  onClick={() => {
                    router.push(
                      `/settings/hazardCategory?feildId=${field.id}&fieldName=${field.name}&icon=${field.feildImage}`,
                    );
                  }}
                >
                  <i className="fa-solid fa-eye"></i>
                </span>
              </Tooltip>
            ),
            createdAt: moment(field.createdAt).format('LLL'),
            updatedAt: moment(field.updatedAt).format('LLL'),
            action: (
              <>
                <Dropdown className="actionDropDown">
                  <Dropdown.Toggle id="dropdown-basic">
                    <Image alt="menu" height={20} width={20} src="/assets/images/menu.svg" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => openEditModal(field)}>
                      <Image alt="editIcon" height={16} width={16} src="/assets/images/edit.svg" /> Edit details
                    </Dropdown.Item>

                    <Dropdown.Item onClick={() => removeField([field.id])}>
                      <Image alt="deleteIcon" height={16} width={16} src="/assets/images/delete.svg" /> Delete
                    </Dropdown.Item>

                    <Dropdown.Item onClick={() => openPreviewModal(field)}>
                      <Image alt="viewIcon" height={16} width={16} src="/assets/images/preview.svg" /> Preview
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => openCategoryModal(field)}>
                      <Image alt="viewIcon" height={16} width={16} src="/assets/images/add.svg" /> Add Category
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ),
          }))
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [globalState?.FIELD_LIST?.result],
  );

  // /* Loading */
  const isLoading = useMemo(
    () => loading?.DELETE_FIELD_LOADING || loading?.UPDATE_FIELD_STATUS_LOADING || state?.isEditLoading,
    [loading, state?.isEditLoading],
  );

  return (
    <>
      <FieldHeader
        title={'Fields'}
        totalRecords={globalState?.getFieldsList?.total}
        handleOpen={openModal}
        industryName={industryName}
        icon={icon}
      />
      <DefaultTable
        api={{
          url: 'FIELD_LIST',
          body: state?.industryId,
        }}
        search={true}
        columns={columns}
        data={getFieldsList}
        loading={Boolean(isLoading)}
        title=""
        placeholder="Search by Name or Description"
      />

      <Modal
        id={'Field' + '_modal'}
        title={state?.fieldModalTitle}
        show={state.viewFieldModal}
        width="40%"
        onClose={() => closeModal('viewFieldModal')}
      >
        <FieldForm
          industryId={industryId}
          state={state}
          dispatch={dispatch}
          handleClose={() => closeModal('viewFieldModal')}
        />
      </Modal>
      {state.viewFieldPreviewModal && state.fieldDetail && (
        <Modal
          id={'FieldPreview' + '_modal'}
          title={state?.fieldModalTitle}
          show={true}
          width="40%"
          onClose={() => closeModal('viewFieldPreviewModal')}
        >
          <FieldPreview
            fieldDetail={state.fieldDetail}
            handleEdit={() => editPreviewModal(state.fieldDetail)}
            onDelete={() => removeField([state.fieldDetail.id])}
          />
        </Modal>
      )}
      {state.viewCategoryModal && state.feildId && (
        <Modal
          id={'Add Category' + '_modal'}
          title={'Add Category'}
          show={true}
          width="40%"
          onClose={() => closeModal('viewCategoryModal')}
        >
          <HazardCategoryForm
            state={state}
            dispatch={dispatch}
            handleClose={() => closeModal('viewCategoryModal')}
            feildId={state.feildId}
          />
        </Modal>
      )}
    </>
  );
}

export default memo(Index);
