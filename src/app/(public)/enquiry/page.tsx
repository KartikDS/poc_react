// Components
import { Metadata } from 'next';

import { handleErrors } from '@/utils/helpers';
import { API_ERROR } from '@/types/interfaces';
import EnquiryPublicForm from '@/Layout/Settings/Enquiry/Components/EnquiryPublicForm';

export const metadata: Metadata = {
  title: 'Enquiry',
  description: 'Enquiry',
};

async function Index() {
  try {
    return <EnquiryPublicForm />;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}

export default Index;
