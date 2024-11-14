'use client';

import React, { memo, useMemo } from 'react';
import { Button, Dropdown, Image } from 'react-bootstrap';
import moment from 'moment';

import { useRequest } from '@/components/App';
import { useCommonReducer } from '@/components/App/reducer';
import Modal from '@/components/Default/Modal';
import DefaultTable from '@/components/Default/Table';
import { useContainerContext } from '@/Layout/Container/context';
import { confirmDialog, deleteDialog, toastr } from '@/utils/helpers';

import EnquiryForm from './Components/EnquiryForm';
import EnquiryHeader from './Components/EnquiryHeader';
import EnquiryPreview from './Components/EnquiryPreview';
import EnquiryReplyForm from './Components/EnquiryReplyForm';

interface ENQUIRY {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  action: JSX.Element;
  replies: REPLY | null;
}
interface REPLY {
  enquiryId: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
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
    const confirm = await confirmDialog('Are you sure you want to change enquiry status?', 'Change Enquiry Status');
    if (confirm) {
      const options = { id: id };
      const res = await request('changeEnquiryStatus', {}, options);

      if (res) toastr('The status has been succesfully changed', 'success', 'Status changed');
    }
  };

  const removeEnquiry = async (id: string | string[]) => {
    if (!id?.length) return;
    const enquiryId = Array.isArray(id) ? id[0] : id;
    const confirm = await deleteDialog('Are you sure you want to delete the enquiry?', 'Delete Enquiry');
    if (confirm) {
      const options = { id: enquiryId };

      const res = await request('removeEnquiryFromList', {}, options);
      if (res) toastr('The enquiry has been successfully removed.', 'success', 'Enquiry removed');
      dispatch({ enquiryDetail: {}, multirecordSelected: false, viewEnquiryPreviewModal: false });
    }
  };
  const openModal = () => {
    dispatch({ viewCustomerModal: true, edit: false, CustomerModalTitle: '', enquiryDetail: null });
  };

  const closeModal = (key: string) => {
    dispatch({ [key]: false, enquiryDetail: null, columns: state?.columns, CustomerModalTitle: '' });
  };

  const openPreviewModal = (data: ENQUIRY) => {
    dispatch({
      viewEnquiryPreviewModal: true,
      CustomerModalTitle: `View ${data.name}`,
      enquiryDetail: data,
    });
  };

  const openreplyModal = (data: ENQUIRY) => {
    dispatch({ viewEnquiryreplyModal: true, CustomerModalTitle: `Reply to Inquiry`, enquiryDetail: data });
  };

  const editPreviewModal = (data: ENQUIRY) => {
    dispatch({
      viewEnquiryPreviewModal: false,
      viewCustomerModal: true,
      edit: true,
      enquiryDetail: data,
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
      sort: true,
    },
    {
      dataField: 'email',
      text: 'Email',
      sort: false,
    },
    {
      dataField: 'phoneNumber',
      text: 'Phone Number',
      sort: false,
    },
    {
      dataField: 'createdAt',
      text: 'Created At',
      sort: false,
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

  const getEnquiriesList = useMemo(
    () =>
      globalState?.getEnquiriesList?.result
        ? globalState?.getEnquiriesList?.result?.map((enquiry: ENQUIRY, index: number) => ({
            id: index + 1,
            name: (
              <div className="usr-preview">
                <span>{enquiry.name}</span>
                <button onClick={() => openPreviewModal(enquiry)}>Preview</button>
              </div>
            ),
            email: enquiry.email,
            phoneNumber: enquiry.phoneNumber,
            createdAt: moment(enquiry.createdAt).format('LLL'),
            isActive:
              enquiry.isActive === true ? (
                <Button onClick={() => handleClick(enquiry.id)} className="customBtn SmBtn" variant="success">
                  Active
                </Button>
              ) : (
                <Button onClick={() => handleClick(enquiry.id)} className="customBtn SmBtn" variant="danger">
                  Inactive
                </Button>
              ),
            action: (
              <>
                <Dropdown className="actionDropDown">
                  <Dropdown.Toggle id="dropdown-basic">
                    <Image alt="menu" height={20} width={20} src="/assets/images/menu.svg" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => openreplyModal(enquiry)}>
                      <Image alt="viewIcon" height={16} width={16} src="/assets/images/preview.svg" /> Reply
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => removeEnquiry([enquiry.id])}>
                      <Image alt="deleteIcon" height={16} width={16} src="/assets/images/delete.svg" /> Delete
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => openPreviewModal(enquiry)}>
                      <Image alt="viewIcon" height={16} width={16} src="/assets/images/preview.svg" /> View
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ),
          }))
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [globalState?.getEnquiriesList?.result],
  );

  // /* Loading /
  const isLoading = useMemo(
    () => loading?.removeEnquiryFromList_LOADING || loading?.changeEnquiryStatus_LOADING || state?.isEditLoading,
    [loading, state?.isEditLoading],
  );

  return (
    <>
      <EnquiryHeader
        {...{
          title: 'Enquiries',
          totalRecords: globalState?.getEnquiriesList?.total,
          handleOpen: openModal,
        }}
      />
      <DefaultTable
        api={{
          url: 'getEnquiriesList',
        }}
        search={true}
        columns={columns}
        data={getEnquiriesList}
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
        <EnquiryForm {...{ state, dispatch }} handleClose={() => closeModal('viewCustomerModal')} />
      </Modal>

      <Modal
        id={'Customer' + '_modal'}
        title={state?.CustomerModalTitle}
        show={state.viewEnquiryreplyModal}
        onClose={() => closeModal('viewEnquiryreplyModal')}
      >
        <EnquiryReplyForm {...{ state, dispatch }} handleClose={() => closeModal('viewEnquiryreplyModal')} />
      </Modal>

      {state.viewEnquiryPreviewModal && state.enquiryDetail && (
        <Modal
          id={'EnquiryPreview' + '_modal'}
          title={state?.CustomerModalTitle}
          show={state.viewEnquiryPreviewModal}
          onClose={() => closeModal('viewEnquiryPreviewModal')}
        >
          <EnquiryPreview
            enquiryDetail={state.enquiryDetail}
            handleEdit={() => editPreviewModal(state.enquiryDetail)}
            onDelete={() => removeEnquiry([state.enquiryDetail.id])}
          />
        </Modal>
      )}
    </>
  );
}

export default memo(Index);
