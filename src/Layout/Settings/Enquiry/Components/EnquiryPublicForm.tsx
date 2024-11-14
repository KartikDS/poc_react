'use client';

import { Formik } from 'formik';
import React, { memo } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';

import { useLoading, useRequest } from '@/components/App';
import { KEYPAIR } from '@/types/interfaces';
import { confirmDialog, toastr } from '@/utils/helpers';

const FormikSchema = Yup.object().shape({
  name: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required.'),
  phoneNumber: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Phone number is required.'),
  email: Yup.string().trim().email('Invalid email').required('Email is required.'),
  message: Yup.string().trim().min(2, 'Too Short!').max(255, 'Too Long!').required('Message is required.'),
});

function UserForm() {
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();

  const handleSubmit = async (values: KEYPAIR) => {
    const confirm = await confirmDialog('Are you sure you want to save these changes?', 'Save changes');
    if (confirm) {
      const req = await request('CREATE_ENQUIRY', values);

      if (req) {
        toastr('The enquiry has been successfully saved.', 'success', 'New User created');
      }
    }
  };

  return (
    <div className="form-container">
      <h3 className="form-title">Enquiry details</h3>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: '' as string,
          phoneNumber: '' as string,
          email: '' as string,
          message: '' as string,
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={FormikSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <div className="inner">
            <div className="topSection">
              <Form id="user-form" noValidate onSubmit={handleSubmit}>
                <div className="row details border-0 insideSection">
                  <div className="col-md-12">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Name <span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="name"
                        name="name"
                        placeholder="First name"
                        onChange={handleChange}
                        value={values.name}
                        isInvalid={!!errors.name}
                      />
                      {errors.name && touched.name ? (
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                  </div>
                  <div className="col-md-12">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Phone Number <span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="phoneNumber"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        value={values.phoneNumber}
                        isInvalid={!!errors.phoneNumber}
                      />
                      {errors.phoneNumber && touched.phoneNumber ? (
                        <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                  </div>
                  <div className="col-md-12">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Email address <span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Your email address"
                        onChange={handleChange}
                        value={values.email}
                        isInvalid={!!errors.email}
                      />
                      {errors.email && touched.email ? (
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                  </div>
                  <div className="col-md-12">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Message <span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        name="message"
                        placeholder="Your message"
                        onChange={handleChange}
                        value={values.message}
                        isInvalid={!!errors.message}
                        rows={6}
                      />
                      {errors.message && touched.message ? (
                        <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                  </div>
                </div>
              </Form>
            </div>
            <div className="plr24 canvasFooter">
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

export default memo(UserForm);
