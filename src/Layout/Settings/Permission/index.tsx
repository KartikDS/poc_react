'use client';

import React, { memo, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import { Dropdown, Image } from 'react-bootstrap';
import { useSearchParams } from 'next/navigation';

import { useRequest } from '@/components/App';
import { useCommonReducer } from '@/components/App/reducer';
import Modal from '@/components/Default/Modal';
import DefaultTable from '@/components/Default/Table';
import { useContainerContext } from '@/Layout/Container/context';
import { confirmDialog, deleteDialog, toastr } from '@/utils/helpers';
import PermissionPreview from '@/Layout/Settings/Permission/Components/PermissionPreview';

import PermissionHeader from './Components/PermissionHeader';
import PermissionForm from './Components/PermissionForm';

interface PERMISSION {
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

function Index() {
  const { request, loading } = useRequest();
  const searchParams = useSearchParams();
  const dev = searchParams.get('dev');

  const { state: globalState } = useContainerContext();
  const { state, dispatch } = useCommonReducer({
    columns: {
      view: [],
      selected: [],
    },
  });

  const handleClick = async (id: string, key: string) => {
    const confirm = await confirmDialog(
      'Are you sure you want to change permission status?',
      'Change Permission Status',
    );
    if (confirm) {
      const options = { id: id };
      const res = await request('UPDATE_PERMISSION_STATUS', { key }, options);

      if (res) toastr('The status has been successfully changed', 'success', 'Status changed');
    }
  };

  const removePermission = async (id: string | string[]) => {
    if (!id) return;

    const permissionId = Array.isArray(id) ? id[0] : id;

    const confirm = await deleteDialog('Are you sure you want to delete the permission?', 'Delete Permission');
    if (confirm) {
      const options = { permissionName: permissionId };

      const res = await request('DELETE_PERMISSION', {}, options);
      if (res) toastr('The permission has been successfully removed.', 'success', 'Permission removed');
      dispatch({ permissionDetail: {}, multirecordSelected: false, viewPermissionPreviewModal: false });
    }
  };

  const openModal = () => {
    dispatch({
      viewCustomerModal: true,
      edit: false,
      CustomerModalTitle: 'Add new permission',
      permissionDetail: null,
    });
  };

  const openEditModal = (data: PERMISSION) => {
    dispatch({ viewCustomerModal: true, edit: true, CustomerModalTitle: `Edit ${data.name}`, permissionDetail: data });
  };

  const closeModal = (key: string) => {
    dispatch({ [key]: false, permissionDetail: null, columns: state?.columns, CustomerModalTitle: '' });
  };

  const openPreviewModal = (data: PERMISSION) => {
    dispatch({ viewPermissionPreviewModal: true, CustomerModalTitle: `View ${data.name}`, permissionDetail: data });
  };

  const editPreviewModal = (data: PERMISSION) => {
    dispatch({
      viewPermissionPreviewModal: false,
      viewCustomerModal: true,
      edit: true,
      permissionDetail: data,
      CustomerModalTitle: `Edit ${data.name}`,
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
      sort: false,
    },

    {
      dataField: 'read',
      text: 'Read',
      sort: false,
    },
    {
      dataField: 'create',
      text: 'Create',
      sort: false,
    },
    {
      dataField: 'edit',
      text: 'Edit',
      sort: false,
    },
    {
      dataField: 'delete',
      text: 'Detele',
      sort: false,
    },
    {
      dataField: 'role',
      text: 'Role',
      sort: false,
    },
    {
      dataField: 'action',
      text: 'Action',
    },
  ];

  const getPermissionsList = useMemo(
    () =>
      globalState?.PERMISSION_LIST?.result
        ? globalState?.PERMISSION_LIST?.result?.map((permission: PERMISSION, index: number) => ({
            id: index + 1,
            name: (
              <div className="usr-preview">
                <span>{permission.name}</span>
                <button onClick={() => openPreviewModal(permission)}>Preview</button>
              </div>
            ),

            read:
              permission.read === true ? (
                <Button
                  onClick={() => handleClick(permission.id, 'read')}
                  className="customBtn SmBtn"
                  variant="success"
                >
                  Active
                </Button>
              ) : (
                <Button onClick={() => handleClick(permission.id, 'read')} className="customBtn SmBtn" variant="danger">
                  Inactive
                </Button>
              ),
            create:
              permission.create === true ? (
                <Button
                  onClick={() => handleClick(permission.id, 'create')}
                  className="customBtn SmBtn"
                  variant="success"
                >
                  Active
                </Button>
              ) : (
                <Button
                  onClick={() => handleClick(permission.id, 'create')}
                  className="customBtn SmBtn"
                  variant="danger"
                >
                  Inactive
                </Button>
              ),
            edit:
              permission.edit === true ? (
                <Button
                  onClick={() => handleClick(permission.id, 'edit')}
                  className="customBtn SmBtn"
                  variant="success"
                >
                  Active
                </Button>
              ) : (
                <Button onClick={() => handleClick(permission.id, 'edit')} className="customBtn SmBtn" variant="danger">
                  Inactive
                </Button>
              ),
            delete:
              permission.delete === true ? (
                <Button
                  onClick={() => handleClick(permission.id, 'delete')}
                  className="customBtn SmBtn"
                  variant="success"
                >
                  Active
                </Button>
              ) : (
                <Button
                  onClick={() => handleClick(permission.id, 'delete')}
                  className="customBtn SmBtn"
                  variant="danger"
                >
                  Inactive
                </Button>
              ),
            role: permission.role,
            action: (
              <>
                <Dropdown className="actionDropDown">
                  <Dropdown.Toggle id="dropdown-basic">
                    <Image alt="menu" height={20} width={20} src="/assets/images/menu.svg" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => openEditModal(permission)}>
                      <Image alt="editIcon" height={16} width={16} src="/assets/images/edit.svg" /> Edit details
                    </Dropdown.Item>
                    {dev !== null && (
                      <Dropdown.Item onClick={() => removePermission([permission.id])}>
                        <Image alt="deleteIcon" height={16} width={16} src="/assets/images/delete.svg" /> Delete
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item onClick={() => openPreviewModal(permission)}>
                      <Image alt="viewIcon" height={16} width={16} src="/assets/images/preview.svg" /> View
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ),
          }))
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [globalState?.PERMISSION_LIST?.result],
  );

  // /* Loading */
  const isLoading = useMemo(
    () => loading?.DELETE_PERMISSION_LOADING || loading?.UPDATE_PERMISSION_STATUS_LOADING || state?.isEditLoading,
    [loading, state?.isEditLoading],
  );

  return (
    <>
      <PermissionHeader
        {...{
          title: 'Permissions',
          totalRecords: globalState?.getPermissionsList?.total,
          handleOpen: openModal,
          dev: dev,
        }}
      />
      <DefaultTable
        api={{
          url: 'PERMISSION_LIST',
        }}
        search={true}
        columns={columns}
        data={getPermissionsList}
        loading={Boolean(isLoading)}
        title=""
        placeholder="Search by Name"
      />

      <Modal
        id={'Customer' + '_modal'}
        title={state?.CustomerModalTitle}
        show={state.viewCustomerModal}
        width="50%"
        onClose={() => closeModal('viewCustomerModal')}
      >
        <PermissionForm
          state={state}
          dispatch={dispatch}
          dev={dev}
          handleClose={() => closeModal('viewCustomerModal')}
        />
      </Modal>
      {state.viewPermissionPreviewModal && state.permissionDetail && (
        <Modal
          id={'PermissionPreview' + '_modal'}
          title={state?.CustomerModalTitle}
          show={true}
          onClose={() => closeModal('viewPermissionPreviewModal')}
        >
          <PermissionPreview
            dev={dev}
            permissionDetail={state.permissionDetail}
            handleEdit={() => editPreviewModal(state.permissionDetail)}
            onDelete={() => removePermission([state.permissionDetail.id])}
          />
        </Modal>
      )}
    </>
  );
}

export default memo(Index);
