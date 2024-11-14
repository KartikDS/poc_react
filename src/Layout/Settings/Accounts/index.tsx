import React, { memo } from 'react';

import AccountForm from './Components/form';
import AccountHeader from './Components/AccountHeader';

function Index() {
  return (
    <div>
      <AccountHeader title="Account" />
      <div className="WhtBox mt10 p30 row">
        <div className="col-md-6 col-sm-12">
          <div className="settingInner">
            <AccountForm />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          {/* QR Code */}
          {/* <div className="" style={{ width: 600, height: 600 }}>
            <h2 className="text-center">Register Employee</h2>
            <a href="/assets/qr/qrcode.png" target="_blank" rel="noreferrer">
              <Image src="/assets/qr/qrcode.png" width={600} height={600} alt="QR Code of Employee URL" />
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default memo(Index);
