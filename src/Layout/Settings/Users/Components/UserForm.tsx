'use client';

import { Formik } from 'formik';
import React, { memo, useMemo } from 'react';
import * as Yup from 'yup';

import { useLoading, useRequest } from '@/components/App';
import { KEYPAIR } from '@/types/interfaces';
import { confirmDialog, toastr } from '@/utils/helpers';
import CustomInput from '@/components/Default/FormControl/CustomInput';
import CustomPhone from '@/components/Default/FormControl/CustomPhone';
import CustomSelect from '@/components/Default/FormControl/CustomSelect';

const FormikSchema = Yup.object().shape({
  firstname: Yup.string()
    .trim('Please do not include leading or trailing spaces in your name.')
    .min(2, 'First name must be between 2 and 50 characters.')
    .max(50, 'First name must be between 2 and 50 characters.')
    .required('First name is required.')
    .matches(/^[A-Z]/, 'Make sure to capitalize the first letter of your name.'),
  lastname: Yup.string()
    .trim('Please do not include leading or trailing spaces in your name.')
    .min(2, 'Last name must be between 2 and 50 characters.')
    .max(50, 'Last name must be between 2 and 50 characters.')
    .required('Last name is required')
    .matches(/^[a-zA-Z\s']+$/, 'Last name must not contain alphanumeric characters, spaces, hyphens, or apostrophes.')
    .matches(/^\S+$/, 'Last name cannot contain spaces.'),
  email: Yup.string()
    .required('Email field is required.')
    .matches(
      /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/,
      'The domain part of the email address is invalid or does not contain a recognized top-level domain.',
    )
    .matches(/^(?!.*\.{2})[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/, 'Email addresses cannot contain consecutive dots.')
    .matches(/^\S*$/, 'Spaces are not allowed in the email address.')
    .email('Email is required.'),
  phone: Yup.string()
    .trim()
    .required('Phone number is required.')
    .matches(/^[1-9]\d*$/, 'Phone number cannot start with zero and can only contain digits.')
    .min(10, 'Phone number must be between 10 and 15 digits.')
    .max(15, 'Phone number must be between 10 and 15 digits.')
    .matches(/^\+?[1-9]\d{9,14}$/, 'Please enter a valid phone number format (e.g., +1234567890).'),
  role: Yup.string()
    .trim()
    .required('Role is required.')
    .oneOf(['SUPERADMIN', 'ADMIN', 'USER'], 'Role value is not valid'),
});

interface PROPS {
  state: {
    userDetail?: KEYPAIR;
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
      // values.status = values?.status === 'Active' ? true : false;
      const req = !state.edit
        ? await request('CREATE_USER', values)
        : await request('UPDATE_USER', { ...values, id: state?.userDetail?.id });
      if (req) {
        toastr('The user has been successfully saved.', 'success', !state.edit ? 'New User created' : 'User updated');
        dispatch({ viewCustomerModal: false, isEditLoading: false, userSelected: [] });
        return props.handleClose();
      }
    }
  };

  const initData = useMemo(() => {
    return {
      firstname: (state?.userDetail?.firstname ?? '') as string,
      lastname: (state?.userDetail?.lastname ?? '') as string,
      email: (state?.userDetail?.email ?? '') as string,
      phone: (state?.userDetail?.phone ?? '') as string,
      role: (state?.userDetail?.role ?? '') as string,
    };
  }, [state?.userDetail]);

  return (
    <div className="canvasData mt-2">
      <div className="inner">
        {/* <div className="head d-flex justify-content-between align-items-center p24 offcanvas-header">
          <div>
            <h2>Add new User details</h2>
          </div>
        </div> */}
        <div className="mt-3">
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={initData}
            validationSchema={FormikSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, errors, setFieldValue }) => (
              <div className="inner">
                <div className="topSection">
                  <form id="user-form" noValidate onSubmit={handleSubmit}>
                    <div className="row details border-0 insideSection">
                      <div className="col-md-12 form-group  mb-3">
                        <label htmlFor="firstname" className="form-label">
                          First Name <span style={{ color: 'red' }}>*</span>
                        </label>
                        <CustomInput
                          id="firstname"
                          name="firstname"
                          placeholder="First name"
                          onChange={handleChange}
                          defaultValue={initData.firstname}
                          error={errors.firstname}
                        />
                      </div>
                      <div className="col-md-12 form-group mb-3">
                        <label htmlFor="lastname" className="form-label">
                          Last Name <span style={{ color: 'red' }}>*</span>
                        </label>
                        <CustomInput
                          id="lastname"
                          name="lastname"
                          placeholder="Last name"
                          onChange={handleChange}
                          defaultValue={initData.lastname}
                          error={errors.lastname}
                        />
                      </div>
                      <div className="col-md-12 form-group mb-3">
                        <label htmlFor="email" className="form-label">
                          Email address <span style={{ color: 'red' }}>*</span>
                        </label>
                        <CustomInput
                          id="email"
                          name="email"
                          placeholder="Email Address"
                          onChange={handleChange}
                          defaultValue={initData.email}
                          error={errors.email}
                          readOnly={state.edit ? true : false}
                          disabled={state.edit ? true : false}
                        />
                      </div>
                      <div className="col-md-12 form-group mb-3">
                        <label htmlFor="phone" className="form-label">
                          Phone No. <span style={{ color: 'red' }}>*</span>
                        </label>
                        <CustomPhone
                          id="phone"
                          name="phone"
                          placeholder="Phone No."
                          onChange={data => setFieldValue('phone', data)}
                          defaultValue={initData.phone}
                          error={errors.phone}
                        />
                      </div>
                      <div className="col-md-12 form-group mb-3">
                        <label htmlFor="role" className="form-label">
                          Role <span style={{ color: 'red' }}>*</span>
                        </label>
                        <CustomSelect
                          id="role"
                          name="role"
                          placeholder="Select User Role"
                          // disabled={!!initData.role}
                          options={[
                            { value: 'USER', label: 'USER' },
                            { value: 'ADMIN', label: 'ADMIN' },
                          ]}
                          onChange={handleChange}
                          defaultValue={initData.role}
                          error={errors.role}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="plr24 canvasFooter">
                  <button className="btn OutlineBtnDanger fs12" onClick={props.handleClose}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="user-form"
                    className="btn customBtn fs12"
                    disabled={!!loading?.updateUser_LOADING}
                  >
                    {loading?.updateUser_LOADING ? ButtonLoader() : 'Save'}
                  </button>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default memo(UserForm);
