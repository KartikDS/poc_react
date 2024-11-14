'use client';

import { Formik } from 'formik';
import React, { memo, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import JoditEditor from 'jodit-react';

import { useLoading, useRequest } from '@/components/App';
import { KEYPAIR } from '@/types/interfaces';
import { confirmDialog, toastr } from '@/utils/helpers';

const FormikSchema = Yup.object().shape({
  email: Yup.string().trim().email('Invalid email').required('Email is required.'),
  subject: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Subject is required.'),
  message: Yup.string().trim().required('Message is required.'),
});

interface REPLY {
  enquiryId: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}
interface ENQUIRY {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  isActive: number;
  createdAt?: string;
  updatedAt?: string;
  action: JSX.Element;
  replies: REPLY | null;
}

interface PROPS {
  state: {
    enquiryDetail?: ENQUIRY;
    edit?: string;
  };
  dispatch: React.Dispatch<KEYPAIR>;
  handleClose: () => void;
}

function EnquiryReplyForm(props: PROPS) {
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const { state, dispatch } = props;
  const [enquiryReply, setEnquierReply] = useState<REPLY>();

  const editor = useRef(null);

  const fetchEnquiryReply = async () => {
    const res = await request('ENQUIRY_REPLY', {}, { enquiryId: state.enquiryDetail?.id });
    setEnquierReply(res.data.result);
  };

  const handleSubmit = async (values: KEYPAIR) => {
    dispatch({ isEditLoading: true });

    const confirm = await confirmDialog('Are you sure you want to send this reply?', 'Save changes');
    if (confirm) {
      const req = await request('replyEnquiry', { ...values, enquiryId: state?.enquiryDetail?.id });
      if (req) {
        toastr('The reply has been sent successfully.', 'success', 'Reply Sent Successfully');
        dispatch({ viewEnquiryreplyModal: false, isEditLoading: false, userSelected: [] });
        return props.handleClose();
      }
    }
  };
  useEffect(() => {
    fetchEnquiryReply();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="canvasData">
      <Formik
        enableReinitialize={true}
        initialValues={{
          email: (enquiryReply?.email || '') as string,
          subject: (enquiryReply?.subject || '') as string,
          message: (enquiryReply?.message || '') as string,
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={FormikSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => (
          <div className="inner">
            <div className="topSection">
              <Form id="user-form" noValidate onSubmit={handleSubmit}>
                <div className="row details border-0 insideSection">
                  <div className="col-md-12">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Email <span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Your email address"
                        onChange={handleChange}
                        value={values.email}
                        isInvalid={!!errors.email}
                        readOnly={state.edit ? true : false}
                        disabled={state.edit ? true : false}
                      />
                      {errors.email && touched.email ? (
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                  </div>
                  <div className="col-md-12">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Subject <span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="subject"
                        name="subject"
                        placeholder="Subject"
                        value={values.subject}
                        onChange={handleChange}
                        isInvalid={!!errors.subject}
                      />
                      {errors.subject && touched.subject ? (
                        <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                  </div>
                  <div className="col-md-12">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Message <span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <JoditEditor
                        ref={editor}
                        value={values.message}
                        onChange={val => {
                          setFieldValue('message', val);
                        }}
                      />
                      {errors.message && touched.message ? <div className="text-danger">{errors.message}</div> : null}
                    </Form.Group>
                  </div>
                </div>
                <div className="plr24 canvasFooter">
                  <Button className="OutlineBtnDanger fs12" onClick={props.handleClose}>
                    Cancel
                  </Button>
                  <Button type="submit" className="customBtn fs12">
                    {loading?.updateUser_LOADING ? ButtonLoader() : 'Send Reply'}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default memo(EnquiryReplyForm);
