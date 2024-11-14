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
  firstName: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('First name is required.'),
  lastName: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name is required.'),
  email: Yup.string().trim().email('Invalid email').required('Email is required.'),
  gender: Yup.string().oneOf(['male', 'female'], 'Invalid gender').required('Gender is required.'),
});

interface PROPS {
  state: {
    enquiryDetail?: KEYPAIR;
    edit?: string;
  };
  dispatch: React.Dispatch<KEYPAIR>;
  handleClose: () => void;
}

function UserForm(props: PROPS) {
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const { state, dispatch } = props;

  const handleSubmit = async (values: KEYPAIR) => {
    dispatch({ isEditLoading: true });

    const confirm = await confirmDialog('Are you sure you want to save these changes?', 'Save changes');
    if (confirm) {
      const req = !state.edit
        ? await request('createUser', values)
        : await request('updateUser', { ...values, id: state?.enquiryDetail?.id });
      if (req) {
        toastr('The user has been successfully saved.', 'success', !state.edit ? 'New User created' : 'User updated');
        dispatch({ viewCustomerModal: false, isEditLoading: false, userSelected: [] });
        return props.handleClose();
      }
    }
  };

  return (
    <div className="canvasData">
      <h3>User details</h3>
      <Formik
        enableReinitialize={true}
        initialValues={{
          firstName: (state?.enquiryDetail?.firstName || '') as string,
          lastName: (state?.enquiryDetail?.lastName || '') as string,
          email: (state?.enquiryDetail?.email || '') as string,
          gender: (state?.enquiryDetail?.gender || '') as string,
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
                        First name <span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="firstName"
                        name="firstName"
                        placeholder="First name"
                        onChange={handleChange}
                        value={values.firstName}
                        isInvalid={!!errors.firstName}
                      />
                      {errors.firstName && touched.firstName ? (
                        <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                  </div>
                  <div className="col-md-12">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Last name <span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="lastName"
                        name="lastName"
                        placeholder="Last name"
                        onChange={handleChange}
                        value={values.lastName}
                        isInvalid={!!errors.lastName}
                      />
                      {errors.lastName && touched.lastName ? (
                        <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
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
                        Gender <span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <div>
                        <Form.Check
                          type="radio"
                          id="male"
                          label="Male"
                          name="gender"
                          value="male"
                          checked={values.gender === 'male'}
                          onChange={handleChange}
                          isInvalid={!!errors.gender}
                        />
                        <Form.Check
                          type="radio"
                          id="female"
                          label="Female"
                          name="gender"
                          value="female"
                          checked={values.gender === 'female'}
                          onChange={handleChange}
                          isInvalid={!!errors.gender}
                        />
                      </div>
                      {errors.gender && touched.gender ? (
                        <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
                      ) : null}
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

export default memo(UserForm);
