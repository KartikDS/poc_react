'use client';
import React from 'react';

import { useCommonReducer } from '@/components/App/reducer';
import Modal from '@/components/Default/Modal';

import CategoryHeader from './Components/CategoryHeader';
import CategoryForm from './Components/CategoryForm';

function Index() {
  const { state, dispatch } = useCommonReducer({
    columns: {
      view: [],
      selected: [],
    },
  });
  const openModal = () => {
    dispatch({ viewModal: true, edit: false, ModalTitle: '', categoryDetail: null });
  };

  const closeModal = (key: string) => {
    dispatch({ [key]: false, categoryDetail: null, columns: state?.columns, ModalTitle: '' });
  };

  return (
    <div>
      <CategoryHeader title={'Category'} handleOpen={openModal} />
      <Modal
        id={'Customer' + '_modal'}
        title={state?.ModalTitle}
        show={state.viewModal}
        onClose={() => closeModal('viewModal')}
      >
        <CategoryForm state={state} dispatch={dispatch} handleClose={() => closeModal('viewModal')} />
      </Modal>
    </div>
  );
}

export default Index;
