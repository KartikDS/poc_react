import Image from 'next/image';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="loginArea">
      <div className="loginarea loginLeft col-sm-12 col-md-6">
        <div>
          <div className="text-center mb-3 ">
            <Image alt="logo" height={100} width={100} src="/assets/images/logoVipr.png" />
          </div>
          <div className="whiteBox loginForm">{children}</div>
        </div>
      </div>
      <div className="col-sm-12 col-md-6 loginRight">
        <Image alt="logo" height={100} width={100} src="/assets/images/ViprWhite.svg" />
      </div>
    </div>
  );
};

export default Layout;
