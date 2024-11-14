'use client';

import React, { memo, useMemo } from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import moment from 'moment';

import { useRequest } from '@/components/App';
import { useCommonReducer } from '@/components/App/reducer';
import Modal from '@/components/Default/Modal';
import DefaultTable from '@/components/Default/Table';
import { useContainerContext } from '@/Layout/Container/context';
import { confirmDialog, deleteDialog, toastr } from '@/utils/helpers';
import EmailPreview from '@/Layout/Settings/EmailTemplate/Components/EmailPreview';
import StatusButton from '@/components/Default/FormControl/StatusButton';

import EmailHeader from './Components/EmailHeader';
import EmailForm from './Components/EmailForm';

interface EMAIL {
  id: string;
  title: string;
  slug: string;
  content: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  action: JSX.Element;
}

function Index() {
  const { request, loading } = useRequest();
  const { state: globalState } = useContainerContext();
  const { state, dispatch } = useCommonReducer({
    columns: {
      view: [],
      selected: [],
    },
  });

  const handleClick = async (id: string) => {
    const options = { id: id };
    const confirm = await confirmDialog(
      'Are you sure you want to change email template status?',
      'Change Email Template Status',
    );

    if (confirm) {
      const res = await request('changeEmailStatus', {}, options);

      if (res) toastr('The status has been succesfully changed', 'success', 'Status changed');
    }
  };

  const removeEmail = async (id: string | string[]) => {
    if (!id?.length) return;
    const emailId = Array.isArray(id) ? id[0] : id;
    const confirm = await deleteDialog('Are you sure you want to delete the email template?', 'Delete Email Template');
    if (confirm) {
      const options = { id: emailId };
      const res = await request('removeEmailFromList', {}, options);
      if (res) toastr('The email template has been successfully removed.', 'success', 'Email template removed');
      dispatch({ emailDetail: {}, multirecordSelected: false, viewPagePreviewModal: false });
    }
  };

  const openModal = () => {
    dispatch({ viewCustomerModal: true, edit: false, CustomerModalTitle: 'Add new email template', emailDetail: null });
  };

  const openEditModal = (data: EMAIL) => {
    dispatch({ viewCustomerModal: true, edit: true, CustomerModalTitle: `Edit ${data.title}`, emailDetail: data });
  };

  const closeModal = (key: string) => {
    dispatch({ [key]: false, emailDetail: null, columns: state?.columns, CustomerModalTitle: '' });
  };

  const openPreviewModal = (data: EMAIL) => {
    dispatch({ viewPagePreviewModal: true, CustomerModalTitle: `View ${data.title}`, emailDetail: data });
  };

  const editPreviewModal = (data: EMAIL) => {
    dispatch({
      viewPagePreviewModal: false,
      viewCustomerModal: true,
      edit: true,
      emailDetail: data,
      CustomerModalTitle: `Edit ${data.title}`,
    });
  };

  const columns = [
    {
      dataField: 'id',
      text: '#',
      sort: false,
    },
    {
      dataField: 'title',
      text: 'Title',
      sort: true,
    },
    {
      dataField: 'slug',
      text: 'Slug',
      sort: true,
    },

    {
      dataField: 'status',
      text: 'Status',
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

  const getEmailsList = useMemo(
    () =>
      globalState?.getEmailsList?.result
        ? globalState?.getEmailsList?.result?.map((email: EMAIL, index: number) => ({
            id: index + 1,
            title: (
              <div className="usr-preview">
                <span>{email.title}</span>
                <button onClick={() => openPreviewModal(email)}>Preview</button>
              </div>
            ),
            slug: email.slug,
            status: <StatusButton status={email.status} onClick={() => handleClick(email.id)} />,

            // status:
            //   email.status === true ? (
            //     <Button onClick={() => handleClick(email.id)} className="customBtn SmBtn" variant="success">
            //       Active
            //     </Button>
            //   ) : (
            //     <Button onClick={() => handleClick(email.id)} className="customBtn SmBtn" variant="danger">
            //       Inactive
            //     </Button>
            //   ),
            updatedAt: moment(email.updatedAt).format('LLL'),
            action: (
              <>
                <Dropdown className="actionDropDown">
                  <Dropdown.Toggle id="dropdown-basic">
                    <Image alt="menu" height={20} width={20} src="/assets/images/menu.svg" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => openEditModal(email)}>
                      <Image alt="editIcon" height={16} width={16} src="/assets/images/edit.svg" /> Edit details
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => removeEmail([email.id])}>
                      <Image alt="deleteIcon" height={16} width={16} src="/assets/images/delete.svg" /> Delete
                    </Dropdown.Item>

                    <Dropdown.Item onClick={() => openPreviewModal(email)}>
                      <Image alt="viewIcon" height={16} width={16} src="/assets/images/preview.svg" /> View
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ),
          }))
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [globalState?.getEmailsList?.result],
  );

  // /* Loading /
  const isLoading = useMemo(
    () => loading?.removeEmailFromList_LOADING || loading?.changeEmailStatus_LOADING || state?.isEditLoading,
    [loading, state?.isEditLoading],
  );

  return (
    <>
      <EmailHeader
        {...{
          title: 'EMAIL TEMPLATES',
          totalRecords: globalState?.getEmailsList?.total,
          handleOpen: openModal,
        }}
      />
      <DefaultTable
        api={{
          url: 'getEmailsList',
        }}
        search={true}
        columns={columns}
        data={getEmailsList}
        loading={Boolean(isLoading)}
        title=""
        placeholder="Search by Title or Slug"
      />

      <Modal
        id={'Customer' + '_modal'}
        title={state?.CustomerModalTitle}
        show={state.viewCustomerModal}
        width="80%"
        onClose={() => closeModal('viewCustomerModal')}
      >
        <EmailForm {...{ state, dispatch }} handleClose={() => closeModal('viewCustomerModal')} />
      </Modal>
      {state.viewPagePreviewModal && state.emailDetail && (
        <Modal
          id={'PagePreview' + '_modal'}
          title={state?.CustomerModalTitle}
          show={true}
          // width="80%"
          width="40%"
          onClose={() => closeModal('viewPagePreviewModal')}
        >
          <EmailPreview
            emailDetail={state.emailDetail}
            handleEdit={() => editPreviewModal(state.emailDetail)}
            onDelete={() => removeEmail([state.emailDetail.id])}
          />
        </Modal>
      )}
    </>
  );
}

export default memo(Index);
