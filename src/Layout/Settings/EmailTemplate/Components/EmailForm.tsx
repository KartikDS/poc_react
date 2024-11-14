'use client';

import { Formik } from 'formik';
import React, { memo, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import JoditEditor from 'jodit-react';

import { useLoading, useRequest } from '@/components/App';
import { KEYPAIR } from '@/types/interfaces';
import { confirmDialog, toastr } from '@/utils/helpers';
import InstructionBox from '@/components/Default/InstructionBox';

const FormikSchema = Yup.object().shape({
  title: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Title is required.'),
  slug: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Slug is required.'),
  subject: Yup.string().trim().min(2, 'Too Short!').max(255, 'Too Long!').required('Subject is required.'),
  content: Yup.string().trim().required('Content is required.'),
});

interface PROPS {
  state: {
    emailDetail?: KEYPAIR;
    edit?: string;
  };
  dispatch: React.Dispatch<KEYPAIR>;
  handleClose: () => void;
}

function EmailForm(props: PROPS) {
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const { state, dispatch } = props;
  const editor = useRef(null);

  const handleSubmit = async (values: KEYPAIR) => {
    dispatch({ isEditLoading: true });
    const confirm = await confirmDialog('Are you sure you want to save these changes?', 'Save changes');
    if (confirm) {
      const options = { slug: state?.emailDetail?.slug };
      values.status = values?.status === '1' ? true : false;
      const req = !state.edit
        ? ((await request('CREATE_EMAIL', values)) as any)
        : ((await request('UPDATE_EMAIL', values, options)) as any);
      if (req) {
        toastr(
          'The Email Template has been successfully saved.',
          'success',
          !state.edit ? 'New Email Template created' : 'Email Template updated',
        );
        dispatch({ isEditLoading: false, userSelected: [] });

        return props.handleClose();
      }
    }
  };

  return (
    <div className="canvasData">
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: (state?.emailDetail?.title || '') as string,
          slug: (state?.emailDetail?.slug || '') as string,
          subject: (state?.emailDetail?.subject || '') as string,
          content: (state?.emailDetail?.content || '') as string,
          status: state?.emailDetail?.status ? state.emailDetail.status.toString() : '0',
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={FormikSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, setFieldValue, values, errors, touched }) => (
          <div className="inner">
            <div className="mr-4">
              <InstructionBox
                text={
                  <p>
                    Use these dynamic variables in your email template:
                    <br />
                    <strong>##USER_NAME##</strong>, <strong>##USER_EMAIL##</strong>, <strong>##STATUS##</strong>
                  </p>
                }
                variant="warning"
              />
            </div>
            <div className="topSection">
              <Form id="user-form" noValidate onSubmit={handleSubmit}>
                <div className="row details border-0 insideSection">
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Title <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="title"
                          name="title"
                          placeholder="Title"
                          onChange={handleChange}
                          value={values.title}
                          isInvalid={!!errors.title}
                        />
                        {errors.title && touched.title ? (
                          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Slug <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="slug"
                          name="slug"
                          placeholder="Slug"
                          onChange={handleChange}
                          value={values.slug}
                          isInvalid={!!errors.slug}
                          readOnly={!!state.edit}
                        />
                        {errors.slug && touched.slug ? (
                          <Form.Control.Feedback type="invalid">{errors.slug}</Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Subject <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="subject"
                          name="subject"
                          placeholder="Subject"
                          onChange={handleChange}
                          value={values.subject}
                          isInvalid={!!errors.subject}
                        />
                        {errors.subject && touched.subject ? (
                          <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Content <span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <JoditEditor
                        ref={editor}
                        value={values.content}
                        onChange={val => {
                          setFieldValue('content', val);
                        }}
                      />
                      {errors.content && touched.content ? <div className="text-danger">{errors.content}</div> : null}
                    </Form.Group>
                  </div>

                  <div className="col-md-12">
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <div>
                        <Form.Check
                          type="checkbox"
                          id="status-checkbox"
                          label="Active"
                          name="status"
                          checked={values.status === '1'}
                          onChange={e => {
                            handleChange({ target: { name: 'status', value: e.target.checked ? '1' : '0' } });
                          }}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
              </Form>
            </div>
            <div className="plr24 canvasFooter">
              <Button className="OutlineBtnDanger fs12" onClick={props.handleClose}>
                Cancel
              </Button>
              <Button type="submit" form="user-form" className="customBtn fs12">
                {loading?.updateUser_LOADING ? ButtonLoader() : 'Save'}
              </Button>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default memo(EmailForm);
