'use client';
import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useLoading, useRequest } from '@/components/App';
import { toastr } from '@/utils/helpers';
import CustomInput from '@/components/Default/FormControl/CustomInput';

const FormikSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required.')
    .matches(/^\S+$/, 'Email address cannot contain spaces.')
    .email('Please enter a valid email address.'),
});

const Index = () => {
  const router = useRouter();
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();

  return (
    <div>
      <div className="text-center">
        <h2>
          Forgot password <span>Please enter your details.</span>
        </h2>
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          email: '',
        }}
        validationSchema={FormikSchema}
        onSubmit={async values => {
          const { message, data } = await request('FORGOT_PASSWORD', values);
          if (data) {
            toastr(message as string, 'success', 'Forgot Password');
            router.push('/login');
          }
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span style={{ color: 'red' }}>*</span>
                  </label>
                  <CustomInput
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    value={values.email}
                    error={errors.email}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <button type="submit" className="btn loginBtn customBtn mt20 fullBtn fs14">
                  {loading?.FORGOT_PASSWORD_LOADING ? ButtonLoader() : 'verify email'}
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-center p-3">
              <div className="forgot">
                <Link href="/login"> Sign In</Link>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Index;
