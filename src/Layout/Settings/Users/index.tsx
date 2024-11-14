'use client';

import React, { memo, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import { Dropdown, Image } from 'react-bootstrap';

import { useRequest } from '@/components/App';
import { useCommonReducer } from '@/components/App/reducer';
import Modal from '@/components/Default/Modal';
import DefaultTable from '@/components/Default/Table';
import { useContainerContext } from '@/Layout/Container/context';
import { confirmDialog, deleteDialog, toastr } from '@/utils/helpers';
import UserPreview from '@/Layout/Settings/Users/Components/UserPreview';

import UserHeader from './Components/UserHeader';
import UserForm from './Components/UserForm';
import StatusButton from '@/components/Default/FormControl/StatusButton';

interface USER {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  status: boolean;
  role: 'SUPERADMIN' | 'ADMIN' | 'USER';
  action: JSX.Element;
}

const columns = [
  {
    dataField: 'id',
    text: '#',
    sort: false,
  },
  {
    dataField: 'firstname',
    text: 'First Name',
    sort: true,
  },
  {
    dataField: 'lastname',
    text: 'Last Name',
    sort: true,
  },
  {
    dataField: 'email',
    text: 'Email',
    sort: true,
  },
  {
    dataField: 'isActive',
    text: 'Status',
    sort: false,
  },
  {
    dataField: 'action',
    text: 'Action',
  },
];

function Index() {
  const { request, loading } = useRequest();
  const { state: globalState } = useContainerContext();
  const { state, dispatch } = useCommonReducer({
    columns: {
      view: [],
      selected: [],
    },
  });

  // const fetchPermission = async () => {
  //   const values = {
  //     moduleName : "User Module",
  //     role: `${globalState.profileDetail?.role}`
  //   };
  //   const req = await request('GET_PERMISSION', values);
  //       console.log("req : ",req);

  // }

  const handleClick = async (id: string) => {
    const confirm = await confirmDialog('Are you sure you want to change user status?', 'Change User Status');
    if (confirm) {
      const res = await request('UPDATE_USER_STATUS', { id: id });

      if (res) toastr('The status has been succesfully changed', 'success', 'Status changed');
    }
  };

  const removeUser = async (id: string | string[]) => {
    if (!id?.length) return;
    const confirm = await deleteDialog('Are you sure you want to delete the user?', 'Delete User');
    if (confirm) {
      const res = await request('DELETE_USER', { id: id });
      if (res) toastr('The user has been successfully removed.', 'success', 'User removed');
      dispatch({ userDetail: {}, multirecordSelected: false, viewUserPreviewModal: false });
    }
  };
  const openModal = () => {
    dispatch({ viewCustomerModal: true, edit: false, CustomerModalTitle: 'Add new User details', userDetail: null });
  };

  const openEditModal = (data: USER) => {
    dispatch({ viewCustomerModal: true, edit: true, CustomerModalTitle: `Edit ${data.firstname}`, userDetail: data });
  };

  const closeModal = (key: string) => {
    dispatch({ [key]: false, userDetail: null, columns: state?.columns, CustomerModalTitle: '' });
  };

  const openPreviewModal = (data: USER) => {
    dispatch({ viewUserPreviewModal: true, CustomerModalTitle: `View ${data.firstname}`, userDetail: data });
  };

  const editPreviewModal = (data: USER) => {
    dispatch({
      viewUserPreviewModal: false,
      viewCustomerModal: true,
      edit: true,
      userDetail: data,
      CustomerModalTitle: `Edit ${data.firstname}`,
    });
  };

  // useEffect(() => {
  //   if(globalState.profileDetail?.role !== "SUPERADMIN"){
  //   fetchPermission()
  //   }
  // },[]);

  const getUsersList = useMemo(
    () =>
      globalState?.GET_USER_LIST?.result
        ? globalState?.GET_USER_LIST?.result?.map((user: USER, index: number) => ({
            id: index + 1,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            isActive: <StatusButton status={user.status} onClick={() => handleClick(user.id)} />,
            // isActive: user.status ? (
            //   <Button onClick={() => handleClick(user.id)} className="customBtn SmBtn" variant="success">
            //     Active
            //   </Button>
            // ) : (
            //   <Button onClick={() => handleClick(user.id)} className="customBtn SmBtn" variant="danger">
            //     Inactive
            //   </Button>
            // ),
            action: (
              <>
                <Dropdown className="actionDropDown">
                  <Dropdown.Toggle id="dropdown-basic">
                    <Image alt="menu" height={20} width={20} src="/assets/images/menu.svg" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => openEditModal(user)}>
                      <Image alt="editIcon" height={16} width={16} src="/assets/images/edit.svg" /> Edit details
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => removeUser([user.id])}>
                      <Image alt="deleteIcon" height={16} width={16} src="/assets/images/delete.svg" /> Delete
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => openPreviewModal(user)}>
                      <Image alt="viewIcon" height={16} width={16} src="/assets/images/preview.svg" /> Preview
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ),
          }))
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [globalState?.GET_USER_LIST?.result],
  );

  // /* Loading /
  const isLoading = useMemo(
    () => loading?.DELETE_USER_LOADING || loading?.UPDATE_USER_STATUS_LOADING || state?.isEditLoading,
    [loading, state?.isEditLoading],
  );

  return (
    <>
      <UserHeader
        {...{
          title: 'Users',
          totalRecords: globalState?.getUsersList?.total,
          handleOpen: openModal,
        }}
      />
      <DefaultTable
        api={{
          url: 'GET_USER_LIST',
        }}
        search={true}
        columns={columns}
        data={getUsersList}
        loading={Boolean(isLoading)}
        title=""
        placeholder="Search by Name or Email"
      />

      <Modal
        id={'Customer' + '_modal'}
        title={state?.CustomerModalTitle}
        show={state.viewCustomerModal}
        onClose={() => closeModal('viewCustomerModal')}
      >
        <UserForm {...{ state, dispatch }} handleClose={() => closeModal('viewCustomerModal')} />
      </Modal>

      {state.viewUserPreviewModal && state.userDetail && (
        <Modal
          id={'UserPreview' + '_modal'}
          title={state?.CustomerModalTitle}
          show={state.viewUserPreviewModal}
          onClose={() => closeModal('viewUserPreviewModal')}
          width="40%"
        >
          <UserPreview
            userDetail={state.userDetail}
            handleEdit={() => editPreviewModal(state.userDetail)}
            onDelete={() => removeUser([state.userDetail.id])}
          />
        </Modal>
      )}
    </>
  );
}

export default memo(Index);
