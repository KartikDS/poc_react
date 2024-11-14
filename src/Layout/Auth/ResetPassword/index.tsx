'use client';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';

import { useLoading, useRequest } from '@/components/App';
import { toastr } from '@/utils/helpers';
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

const ResetSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required.')
    .min(8, 'Password must be between 8 and 16 characters long.')
    .max(16, 'Password must be between 8 and 16 characters long.')
    .matches(/[a-z]/, 'Password must include at least one lowercase letter.')
    .matches(/[A-Z]/, 'Password must include at least one uppercase letter.')
    .matches(/[0-9]/, 'Password must include at least one number.')
    .matches(/[\W_]/, 'Password must include at least one special character.')
    .notOneOf(commonPasswords, 'Please do not use common passwords.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords don't match")
    .when('password', {
      is: (password: string) => password && password.length !== 0,
      then: Yup.string().required('Confirm password field is required.'),
    }),
});

interface PROPS {
  type: 'reset' | 'new';
}

function Index({ type }: PROPS) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="text-center">
        {type === 'reset' ? (
          <h2>
            Reset password <span>Please set your new password</span>
          </h2>
        ) : (
          <h2>
            Create new password <span>Please set your new password</span>
          </h2>
        )}
      </div>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={ResetSchema}
        onSubmit={async values => {
          const { data } = await request('RESET_PASSWORD', {
            password: values.password,
            confirmPassword: values.password,
            token,
          });
          if (data) {
            toastr('Password successfully set', 'success');
            router.push('/login');
          }
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <div className="row">
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
                <span className="form-text">
                  The password should contain at least 8 characters and include at least one uppercase letter, one
                  lowercase letter, and one number
                </span>
                {/* <InputGroup>
                    <Form.Control
                      type={viewPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      value={values.password}
                      isInvalid={!!errors.password}
                    />
                    <InputGroup.Text onClick={() => setviewPassword(!viewPassword)} role="button">
                      <i className={`${viewPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}`}></i>
                    </InputGroup.Text>
                    <Form.Text>
                      The password should contain at least 8 characters and include at least one uppercase letter, one
                      lowercase letter, and one number
                    </Form.Text>
                    {errors.password ? (
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    ) : null}
                  </InputGroup> */}
              </div>
              {/* <div className="form-group mb-3">
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
            </div> */}
              <div className="col-md-12 form-group mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password <span style={{ color: 'red' }}>*</span>
                </label>
                <CustomPassword
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                />
                {/* <InputGroup>
                    <Form.Control
                      type={viewConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      value={values.confirmPassword}
                      isInvalid={!!errors.confirmPassword}
                    />

                    <InputGroup.Text onClick={() => setviewConfirmPassword(!viewConfirmPassword)} role="button">
                      <i className={`${viewConfirmPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}`}></i>
                    </InputGroup.Text>

                    {errors.confirmPassword ? (
                      <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                    ) : null}
                  </InputGroup> */}
              </div>
              <div className="col-md-12">
                <Button type="submit" className="loginBtn customBtn mt20 fullBtn fs14">
                  {loading?.RESET_PASSWORD_LOADING
                    ? ButtonLoader()
                    : type === 'new'
                      ? 'Create New password'
                      : 'Update password'}
                </Button>
              </div>
              <div className="col-md-12">
                <div className="createAccount text-center" style={{ padding: '20px' }}>
                  Cancel and Return to{' '}
                  <Link href="/login" className="fogotPass text-primary">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

export default Index;
