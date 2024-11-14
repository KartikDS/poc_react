'use client';

import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import * as Yup from 'yup';

import { useLoading, useRequest } from '@/components/App';
import { KEYPAIR } from '@/types/interfaces';
import { setHeader, toastr } from '@/utils/helpers';
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

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required.')
    .matches(/^\S+$/, 'Email address cannot contain spaces.')
    .email('Please enter a valid email address.'),
  password: Yup.string()
    .required('Password is required.')
    .min(8, 'Password must be between 8 and 16 characters long.')
    .max(16, 'Password must be between 8 and 16 characters long.')
    .matches(/[a-z]/, 'Password must include at least one lowercase letter.')
    .matches(/[A-Z]/, 'Password must include at least one uppercase letter.')
    .matches(/[0-9]/, 'Password must include at least one number.')
    .matches(/[\W_]/, 'Password must include at least one special character.')
    .notOneOf(commonPasswords, 'Please do not use common passwords.'),
});

function Index() {
  const router = useRouter();
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const handleSubmit = async (values: KEYPAIR) => {
    const { data } = await request('LOGIN', values);
    if (data) {
      toastr('Login Successful', 'success', 'Login');
      setHeader(data.accessToken, 'accessToken');
      return router.push('/dashboard');
    }
  };

  return (
    <>
      <div className="text-center">
        <h2>
          Sign In to Admin
          <span>Please enter your details.</span>
        </h2>
      </div>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          email: '',
          password: '',
          rememberme: false,
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <input autoComplete="false" name="hidden" type="text" style={{ display: 'none' }}></input>
            <div className="row">
              <div className="col-md-12 form-group mb-3">
                <label htmlFor="email" className="form-label">
                  Email <span style={{ color: 'red' }}>*</span>
                </label>
                <CustomInput
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>
              <div className="col-md-12 form-group mb-3">
                <label htmlFor="password" className="form-label">
                  Password <span style={{ color: 'red' }}>*</span>
                </label>
                <CustomPassword
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  error={errors.password}
                />
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <div className="from-group rememberMe">
                    <div className="form-check">
                      <input
                        id="rememberme"
                        className="form-check-input"
                        type="checkbox"
                        name="rememberme"
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="rememberme">
                        Remember me
                      </label>
                    </div>
                  </div>
                </div>
                <div className="forgot">
                  <Link href="/forgot-password">Forgot password</Link>
                </div>
              </div>
              <div className="col-md-12">
                <button type="submit" className="btn customBtn w-100">
                  {loading?.LOGIN_LOADING ? ButtonLoader() : 'Sign In'}
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

export default Index;
