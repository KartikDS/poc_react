'use client';

import React, { memo, useMemo } from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import { useSearchParams } from 'next/navigation';
import moment from 'moment';

import { useRequest } from '@/components/App';
import { useCommonReducer } from '@/components/App/reducer';
import Modal from '@/components/Default/Modal';
import DefaultTable from '@/components/Default/Table';
import { useContainerContext } from '@/Layout/Container/context';
import { confirmDialog, deleteDialog, toastr } from '@/utils/helpers';
import PagePreview from '@/Layout/Settings/Cms/Components/PagePreview';
import StatusButton from '@/components/Default/FormControl/StatusButton';

import PageHeader from './Components/PageHeader';
import PageForm from './Components/PageForm';
import { CMS_LIST } from './interface';

interface CMS {
  id: string;
  title: string;
  slug: string;
  content: string;
  subTitle: string;
  metaTitle: string;
  metaKeyword: string;
  shortDescription: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
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

  const handleClick = async (id: string) => {
    const confirm = await confirmDialog('Are you sure you want to change page status?', 'Change Page Status');
    if (confirm) {
      const options = { id: id };
      const res = await request('UPDATE_CMS_STATUS', {}, options);

      if (res) toastr('The status has been succesfully changed', 'success', 'Status changed');
    }
  };

  const removePage = async (id: string | string[]) => {
    if (!id) return;

    const pageId = Array.isArray(id) ? id[0] : id;

    const confirm = await deleteDialog('Are you sure you want to delete the page?', 'Delete Page');
    if (confirm) {
      const options = { pageName: pageId };

      const res = await request('DELETE_CMS', {}, options);
      if (res) toastr('The page has been successfully removed.', 'success', 'Page removed');
      dispatch({ pageDetail: {}, multirecordSelected: false, viewPagePreviewModal: false });
    }
  };

  const openModal = () => {
    dispatch({ viewCustomerModal: true, edit: false, CustomerModalTitle: 'Add new page', pageDetail: null });
  };

  const openEditModal = (data: CMS) => {
    dispatch({ viewCustomerModal: true, edit: true, CustomerModalTitle: `Edit ${data.title}`, pageDetail: data });
  };

  const closeModal = (key: string) => {
    dispatch({ [key]: false, pageDetail: null, columns: state?.columns, CustomerModalTitle: '' });
  };

  // const openPreviewModal = (data: CMS) => {
  //   dispatch({ viewPagePreviewModal: true, CustomerModalTitle: `View ${data.title}`, pageDetail: data });
  // };

  const editPreviewModal = (data: CMS) => {
    dispatch({
      viewPagePreviewModal: false,
      viewCustomerModal: true,
      edit: true,
      pageDetail: data,
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
      hidden: true,
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

  const getPagesList = useMemo(
    () =>
      globalState?.CMS_LIST?.result
        ? globalState?.CMS_LIST?.result?.map((page: CMS_LIST, index: number) => ({
            id: index + 1,
            title: (
              <div className="usr-preview">
                <span>{page.title}</span>
                {/* <button onClick={() => openPreviewModal(page)}>Preview</button> */}
              </div>
            ),
            slug: page.slug,
            status: <StatusButton status={page.status} onClick={() => handleClick(page.id)} />,
            updatedAt: moment(page.updatedAt).format('LLL'),
            action: (
              <>
                <Dropdown className="actionDropDown">
                  <Dropdown.Toggle id="dropdown-basic">
                    <Image alt="menu" height={20} width={20} src="/assets/images/menu.svg" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => openEditModal(page)}>
                      <Image alt="editIcon" height={16} width={16} src="/assets/images/edit.svg" /> Edit details
                    </Dropdown.Item>
                    {dev !== null && (
                      <Dropdown.Item onClick={() => removePage([page.id])}>
                        <Image alt="deleteIcon" height={16} width={16} src="/assets/images/delete.svg" /> Delete
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item
                      onClick={() => {
                        window.open(`/${page.slug}`, '_blank');
                      }}
                    >
                      <Image alt="viewIcon" height={16} width={16} src="/assets/images/preview.svg" /> View
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ),
          }))
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [globalState?.CMS_LIST?.result],
  );

  // /* Loading /
  const isLoading = useMemo(
    () => loading?.DELETE_CMS_LOADING || loading?.UPDATE_CMS_STATUS_LOADING || state?.isEditLoading,
    [loading, state?.isEditLoading],
  );

  return (
    <>
      <PageHeader
        {...{
          title: 'Manage Content',
          totalRecords: globalState?.getPagesList?.total,
          handleOpen: openModal,
          dev: dev,
        }}
      />
      <DefaultTable
        api={{
          url: 'CMS_LIST',
        }}
        search={true}
        columns={columns}
        data={getPagesList}
        loading={Boolean(isLoading)}
        title=""
        placeholder="Search by Title"
      />

      <Modal
        id={'Customer' + '_modal'}
        title={state?.CustomerModalTitle}
        show={state.viewCustomerModal}
        width="80%"
        onClose={() => closeModal('viewCustomerModal')}
      >
        <PageForm state={state} dispatch={dispatch} dev={dev} handleClose={() => closeModal('viewCustomerModal')} />
      </Modal>
      {state.viewPagePreviewModal && state.pageDetail && (
        <Modal
          id={'PagePreview' + '_modal'}
          title={state?.CustomerModalTitle}
          show={true}
          onClose={() => closeModal('viewPagePreviewModal')}
          width="30%"
        >
          <PagePreview
            dev={dev}
            pageDetail={state.pageDetail}
            handleEdit={() => editPreviewModal(state.pageDetail)}
            onDelete={() => removePage([state.pageDetail.id])}
          />
        </Modal>
      )}
    </>
  );
}

export default memo(Index);
