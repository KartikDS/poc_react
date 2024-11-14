import { Metadata } from 'next';
import Image from 'next/image';

import Login from '@/Layout/Auth/Login';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to Portal',
  keywords: 'Login ',
};

function Page() {
  return (
    <div className="loginArea">
      <div className="loginarea loginLeft col-sm-12 col-md-6">
        <div>
          <div className="text-center mb-3 ">
            <Image alt="logo" height={100} width={100} src="/assets/images/logoVipr.png" />
          </div>
          <div className="whiteBox loginForm">
            <Login />
          </div>
        </div>
      </div>
      <div className="col-sm-12 col-md-6 loginRight">
        <Image alt="logo" height={100} width={100} src="/assets/images/ViprWhite.svg" />
      </div>
    </div>
  );
}

export default Page;
