'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from 'react-bootstrap';

import { handleErrors, toastr } from '@/utils/helpers';
import { API_ERROR } from '@/types/interfaces';
import { useLoading, useRequest } from '@/components/App';

import OTPInput from './OTPInput';

const VerifyUser = () => {
  const router = useRouter();
  const { ButtonLoader } = useLoading();

  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const userIDString = searchParams.get('id');
  const userID = userIDString ? parseInt(userIDString) : null;

  const { request, loading } = useRequest();

  const handleClick = async () => {
    try {
      const payload = {
        userID: userID,
      };

      const res = (await request('resendOTP', payload)) as any;
      if (res) {
        toastr(res?.message as string, 'success', 'OTP Send Successfully');
      }
    } catch (error) {
      return handleErrors(error as API_ERROR);
    }
  };
  const handleSubmit = async (pin: string) => {
    try {
      const payload = {
        otp: pin,
        email: email,
      };

      const res = (await request('verifyOTP', payload)) as any;
      const accessToken = res?.data?.token;

      if (res) {
        toastr(res?.message as string, 'success', 'OTP Verification');
        router.push(`/reset-password?token=${accessToken}`);
      }
    } catch (error) {
      return handleErrors(error as API_ERROR);
    }
  };

  return (
    <>
      <div className="text-center">
        <h2>
          Verify OTP <span>An OTP has been sent to your email address, kindly enter them here</span>
        </h2>
      </div>
      <OTPInput length={6} onComplete={handleSubmit} />
      <div className="d-flex justify-content-center p-4">
        <button type="submit" className="btn customBtn" onClick={handleClick}>
          {loading?.LoginUser_LOADING ? ButtonLoader() : ' Resend OTP '}
        </button>
      </div>
    </>
  );
};

export default VerifyUser;
