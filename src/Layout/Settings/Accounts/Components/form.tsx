'use client';
import { Formik } from 'formik';
import React, { useMemo } from 'react';
import * as Yup from 'yup';

import { useContainerContext } from '@/Layout/Container/context';
import { useLoading, useRequest } from '@/components/App';
import { AUTH_USER, KEYPAIR } from '@/types/interfaces';
import { toastr } from '@/utils/helpers';
import CustomInput from '@/components/Default/FormControl/CustomInput';
import CustomPassword from '@/components/Default/FormControl/CustomPassword';

const commonPasswords = [
  'password',
  '123456',
  '12345678',
  'qwerty',
  'abc123',
  'letmein',
  'monkey',
  '1234567',
  '111111',
  'welcome',
];

const FormikSchema = Yup.object().shape({
  role: Yup.string(),
  firstname: Yup.string()
    .trim('Please do not include leading or trailing spaces in your name.')
    .min(2, 'First name must be between 2 and 50 characters.')
    .max(50, 'First name must be between 2 and 50 characters.')
    .required('First name is required.')
    .matches(/^[A-Z]/, 'Make sure to capitalize the first letter of your name.')
    .matches(/^\S+$/, 'First name cannot contain spaces.'),
  lastname: Yup.string()
    .trim('Please do not include leading or trailing spaces in your name.')
    .min(2, 'Last name must be between 2 and 50 characters.')
    .max(50, 'Last name must be between 2 and 50 characters.')
    .required('Last name is required')
    .matches(/^[a-zA-Z\s']+$/, 'Last name must not contain alphanumeric characters, spaces, hyphens, or apostrophes.')
    .matches(/^\S+$/, 'Last name cannot contain spaces.'), // payment_amount: Yup.string().when('role', ([role], schema) => {
  //   return role === 'ADMIN' ? schema.required('Payment Amount is required') : schema.nullable();
  // }),
  password: Yup.string()
    .min(8, 'Password must be between 8 and 16 characters long.')
    .max(16, 'Password must be between 8 and 16 characters long.')
    .matches(/[a-z]/, 'Password must include at least one lowercase letter.')
    .matches(/[A-Z]/, 'Password must include at least one uppercase letter.')
    .matches(/[0-9]/, 'Password must include at least one number.')
    .matches(/[\W_]/, 'Password must include at least one special character.')
    .notOneOf(commonPasswords, 'Please do not use common passwords.'),
  confirmPassword: Yup.string()
    .when('password', {
      is: (password: string) => password && password.length !== 0,
      then: Yup.string().required('Confirm password is required.'),
    })
    .oneOf([Yup.ref('password')], "Passwords don't match"),
});
// const stringToNumber = (value: string) => {
//   const allowedChars = /[^0-9.]/g;
//   let newValue = value.replace(allowedChars, '');

//   // Ensure only one decimal point is allowed
//   const parts = newValue.split('.');
//   if (parts.length > 2) {
//     newValue = parts[0] + '.' + parts.slice(1).join('');
//   }
//   return newValue;
// };
const AccountForm = () => {
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const { state: globleState, dispatch: globleDispatch } = useContainerContext();
  const initValue = useMemo(() => {
    return {
      role: globleState.profileDetail?.role ?? '',
      id: globleState.profileDetail?.id,
      firstname: globleState.profileDetail?.firstname ?? '',
      lastname: globleState.profileDetail?.lastname ?? '',
      password: '',
      confirmPassword: '',
      // payment_amount: globleState.profileDetail?.payment_amount ?? '',
    };
  }, [globleState.profileDetail]);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initValue}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={FormikSchema}
      onSubmit={async (values: KEYPAIR) => {
        const { data } = await request('UPDATE_AUTH_USER', values);
        if (data) {
          toastr('The user has been successfully saved.', 'success');
          const password = window.document.getElementById('password') as HTMLInputElement | null;
          const confirmPassword = window.document.getElementById('confirmPassword') as HTMLInputElement | null;
          if (password) {
            password.value = '';
          }
          if (confirmPassword) {
            confirmPassword.value = '';
          }

          globleDispatch({
            profileDetail: { ...data } as AUTH_USER,
          });
        }
      }}
    >
      {({ handleSubmit, handleChange, values, errors, resetForm, handleReset }) => (
        <form className="row gap-2" noValidate onSubmit={handleSubmit} onReset={handleReset}>
          <div className="col-12 form-group">
            <label htmlFor="firstname" className="formlabel">
              First Name <span style={{ color: 'red' }}>*</span>
            </label>
            <CustomInput
              id="firstname"
              name="firstname"
              placeholder="First name"
              onChange={handleChange}
              value={values.firstname as string}
              error={errors.firstname}
            />
          </div>
          <div className="col-12 form-group">
            <label htmlFor="lastname" className="formlabel">
              Last Name <span style={{ color: 'red' }}>*</span>
            </label>
            <CustomInput
              id="lastname"
              name="lastname"
              placeholder="Last name"
              onChange={handleChange}
              value={values.lastname as string}
              error={errors.lastname}
            />
          </div>
          <div className="col-12 form-group">
            <label htmlFor="email" className="formlabel">
              Email
            </label>
            <CustomInput
              readOnly
              disabled
              id="email"
              name="email"
              placeholder="Email"
              onChange={() => console.log('change email')}
              value={globleState.profileDetail?.email ?? ('' as string)}
            />
          </div>

          <div className="col-12 form-group">
            <label htmlFor="password" className="formlabel">
              Password
            </label>
            <CustomPassword
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder="Enter password"
              onChange={handleChange}
              error={errors.password}
            />
            <span className="form-text">
              The password should contain at least 8 characters and include at least one uppercase letter, one lowercase
              letter, and one number
            </span>
          </div>
          <div className="col-12 form-group">
            <label htmlFor="confirmPassword" className="formlabel">
              Confirm Password
            </label>
            <CustomPassword
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Enter confirm password"
              onChange={handleChange}
              error={errors.confirmPassword}
            />
          </div>
          <div className="settingFooter">
            <button
              type="reset"
              className="btn OutlineBtnDanger mr10 "
              onClick={() => {
                resetForm();
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn customBtn " disabled={!!loading?.updateUserAccount_LOADING}>
              {loading?.updateUserAccount_LOADING ? ButtonLoader() : 'Save'}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default AccountForm;
