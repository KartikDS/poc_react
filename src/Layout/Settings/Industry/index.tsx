'use client';

import React, { memo, useMemo } from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import moment from 'moment';
import { useRouter } from 'next/navigation';

import Tooltip from '@/components/Default/Tooltip';
import { useRequest } from '@/components/App';
import { useCommonReducer } from '@/components/App/reducer';
import Modal from '@/components/Default/Modal';
import DefaultTable from '@/components/Default/Table';
import { useContainerContext } from '@/Layout/Container/context';
import { deleteDialog, toastr } from '@/utils/helpers';

import FieldForm from '../Field/Components/FieldForm';

import IndustryPreview from './Components/IndustryPreview';
import IndustryHeader from './Components/IndustryHeader';
import IndustryForm from './Components/IndustryForm';

interface Feild {
  id: string;
  name: string;
  description: string;
  feildImage: string;
  createdAt: string;
  updatedAt: string;
}
interface Industry {
  id: string;
  name: string;
  description: string;
  industryImage: string;
  feilds: Feild[];
  createdAt: string;
  updatedAt: string;
  action: JSX.Element;
}

function Index() {
  const { request, loading } = useRequest();
  // const searchParams = useSearchParams();
  const router = useRouter();
  const { state: globalState } = useContainerContext();
  const { state, dispatch } = useCommonReducer({
    columns: {
      view: [],
      selected: [],
    },
  });
  const removeIndustry = async (id: string | string[]) => {
    if (!id) return;

    const industryId = Array.isArray(id) ? id[0] : id;

    const confirm = await deleteDialog('Are you sure you want to delete the industry?', 'Delete Industry');
    if (confirm) {
      const options = { id: industryId };

      const res = await request('DELETE_INDUSTRY', {}, options);
      if (res) toastr('The industry has been successfully removed.', 'success', 'Industry removed');
      dispatch({ industryDetail: {}, multirecordSelected: false, viewIndustryPreviewModal: false });
    }
  };

  const openModal = () => {
    dispatch({ viewIndustryModal: true, edit: false, industryModalTitle: 'Add new industry', industryDetail: null });
  };

  const openEditModal = (data: Industry) => {
    dispatch({ viewIndustryModal: true, edit: true, industryModalTitle: `Edit ${data.name}`, industryDetail: data });
  };

  const closeModal = (key: string) => {
    dispatch({ [key]: false, industryDetail: null, columns: state?.columns, industryModalTitle: '' });
  };

  const openPreviewModal = (data: Industry) => {
    dispatch({ viewIndustryPreviewModal: true, industryModalTitle: `View ${data.name}`, industryDetail: data });
  };
  const openFieldModal = (data: Industry) => {
    dispatch({ viewFieldModal: true, industryId: data.id });
  };

  const editPreviewModal = (data: Industry) => {
    dispatch({
      viewIndustryPreviewModal: false,
      viewIndustryModal: true,
      edit: true,
      industryDetail: data,
      industryModalTitle: `Edit ${data.name}`,
    });
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
      dataField: 'feild',
      text: 'Fields',
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

  const getIndustriesList = useMemo(
    () =>
      globalState?.INDUSTRY_LIST?.result
        ? globalState?.INDUSTRY_LIST?.result?.map((industry: Industry, index: number) => ({
            id: index + 1,
            icon: (
              <Image
                src={`/images/${industry?.industryImage}`}
                alt={`Icon for ${industry.name}`}
                width={40}
                height={40}
                className="img-fluid rounded-circle"
              />
            ),
            name: industry.name,
            description: industry.description,
            feild: (
              <div>
                {' '}
                <Tooltip text="View related Fields">
                  <span
                    className="rounded ms-2"
                    style={{
                      color: '#fd7e14',
                      padding: '0.25rem 0.5rem',
                      fontSize: '15px',
                    }}
                    role="button"
                    onClick={() => {
                      const industryId = industry.id;
                      router.push(
                        `/settings/field?industryId=${industryId}&industryName=${industry.name}&icon=${industry.industryImage}`,
                      );
                    }}
                  >
                    <i className="fa-solid fa-eye"></i>
                  </span>
                </Tooltip>
              </div>
            ),

            createdAt: moment(industry.createdAt).format('LLL'),
            updatedAt: moment(industry.updatedAt).format('LLL'),
            action: (
              <>
                <Dropdown className="actionDropDown">
                  <Dropdown.Toggle id="dropdown-basic">
                    <Image alt="menu" height={20} width={20} src="/assets/images/menu.svg" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => openEditModal(industry)}>
                      <Image alt="editIcon" height={16} width={16} src="/assets/images/edit.svg" /> Edit details
                    </Dropdown.Item>

                    <Dropdown.Item onClick={() => removeIndustry([industry.id])}>
                      <Image alt="deleteIcon" height={16} width={16} src="/assets/images/delete.svg" /> Delete
                    </Dropdown.Item>

                    <Dropdown.Item onClick={() => openPreviewModal(industry)}>
                      <Image alt="viewIcon" height={16} width={16} src="/assets/images/preview.svg" /> Preview
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => openFieldModal(industry)}>
                      <Image alt="viewIcon" height={16} width={16} src="/assets/images/add.svg" /> Add Field
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ),
          }))
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [globalState?.INDUSTRY_LIST?.result],
  );

  // /* Loading */
  const isLoading = useMemo(
    () => loading?.DELETE_INDUSTRY_LOADING || loading?.UPDATE_INDUSTRY_STATUS_LOADING || state?.isEditLoading,
    [loading, state?.isEditLoading],
  );

  return (
    <>
      <IndustryHeader
        {...{
          title: 'Industries',
          totalRecords: globalState?.getIndustriesList?.total,
          handleOpen: openModal,
        }}
      />
      <DefaultTable
        api={{
          url: 'INDUSTRY_LIST',
        }}
        search={true}
        columns={columns}
        data={getIndustriesList}
        loading={Boolean(isLoading)}
        title=""
        placeholder="Search by Name or Description"
      />

      <Modal
        id={'Industry' + '_modal'}
        title={state?.industryModalTitle}
        show={state.viewIndustryModal}
        width="40%"
        onClose={() => closeModal('viewIndustryModal')}
      >
        <IndustryForm state={state} dispatch={dispatch} handleClose={() => closeModal('viewIndustryModal')} />
      </Modal>
      {state.viewIndustryPreviewModal && state.industryDetail && (
        <Modal
          id={'IndustryPreview' + '_modal'}
          title={state?.industryModalTitle}
          show={true}
          width="30%"
          onClose={() => closeModal('viewIndustryPreviewModal')}
        >
          <IndustryPreview
            industryDetail={state.industryDetail}
            handleEdit={() => editPreviewModal(state.industryDetail)}
            onDelete={() => removeIndustry([state.industryDetail.id])}
          />
        </Modal>
      )}
      {state.viewFieldModal && state.industryId && (
        <Modal id={'Add Field' + '_modal'} title={'Add Field'} show={true} onClose={() => closeModal('viewFieldModal')}>
          <FieldForm
            state={state}
            dispatch={dispatch}
            handleClose={() => closeModal('viewFieldModal')}
            industryId={state.industryId}
          />
        </Modal>
      )}
    </>
  );
}

export default memo(Index);
