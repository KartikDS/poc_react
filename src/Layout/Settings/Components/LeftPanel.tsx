'use-client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo } from 'react';

import { useContainerContext } from '@/Layout/Container/context';

function LeftPanel() {
  const asPath = usePathname();
  const { state: globalState } = useContainerContext();

  return (
    <div className="leftPannel plr0">
      <div className="DtlleftTop plr24 mb24"></div>
      {/* <div className="settings">
        <h2>Title</h2>
      </div> */}
      <div className="preferences">
        <h3>Preferences</h3>
        <ul>
          <li>
            <Link className={asPath.includes('accounts') ? 'preference-selected' : ''} href="/settings/accounts">
              <i className="fa-solid fa-user-tie"></i> Account
            </Link>
          </li>
          {/* <li>
            <Link className={asPath.includes('branding') ? 'preference-selected' : ''} href="/settings/branding">
              <i className="fa-brands fa-slack"></i> Branding
            </Link>
          </li> */}
        </ul>

        {/* {globalState?.profileDetail?.role === 'ADMIN' ? ( */}
        {globalState?.profileDetail?.role === 'SUPERADMIN' ? (
          <>
            <h3 className="mt-4">User management</h3>
            <ul>
              <li>
                <Link className={asPath.includes('users') ? 'preference-selected' : ''} href="/settings/users">
                  <i className="fa-solid fa-users"></i> Users
                </Link>
              </li>
            </ul>
          </>
        ) : null}
        {globalState?.profileDetail?.role !== 'USER' ? (
          <>
            <h3 className="mt-4">Industry Management</h3>
            <ul>
              <li>
                <Link className={asPath.includes('industry') ? 'preference-selected' : ''} href="/settings/industry">
                  <i className="fa-solid fa-users"></i> Industries
                </Link>
              </li>
            </ul>
          </>
        ) : null}
        {/* {globalState?.profileDetail?.role !== 'USER' ? (
          <>
            <h3 className="mt-4">Employees</h3>
            <ul> */}
        {/* <li>
                <Link
                  className={asPath.includes('employer') ? 'preference-selected' : ''}
                  href="/settings/employment/employer"
                >
                  <i className="fa-solid fa-users"></i> Employers
                </Link>
              </li> */}
        {/* <li>
                <Link
                  className={asPath.includes('employee') ? 'preference-selected' : ''}
                  href="/settings/employment/employee"
                >
                  <i className="fa-solid fa-users"></i> Employees
                </Link>
              </li>
            </ul> */}
        {/* <h3 className="mt-4">Reports</h3>
            <ul>
              <li>
                <Link
                  className={asPath.includes('new-registrations') ? 'preference-selected' : ''}
                  href="/settings/reports/new-registrations"
                >
                  <i className="fa-solid fa-file-export"></i> New Registrations
                </Link>
              </li>
              <li>
                <Link
                  className={asPath.includes('new-verification') ? 'preference-selected' : ''}
                  href="/settings/reports/new-verification"
                >
                  <i className="fa-solid fa-file-export"></i> New Verification
                </Link>
              </li>
              <li>
                <Link
                  className={asPath.includes('out-verifications') ? 'preference-selected' : ''}
                  href="/settings/reports/out-verifications"
                >
                  <i className="fa-solid fa-file-export"></i> Outstanding
                </Link>
              </li>
            </ul> */}
        {/* </> */}
        {/* ) : null} */}
        {globalState?.profileDetail?.role !== 'USER' ? (
          <>
            <h3 className="mt-4">Settings</h3>
            <ul>
              <li>
                <Link className={asPath.includes('cms') ? 'preference-selected' : ''} href="/settings/cms">
                  <i className="fa-solid fa-file-lines"></i> Manage Content
                </Link>
              </li>
            </ul>
            {/* <ul>
              <li>
                <Link
                  className={asPath.includes('emailTemplate') ? 'preference-selected' : ''}
                  href="/settings/emailTemplate"
                >
                  <i className="fa-solid fa-file-lines"></i> Emails Templates
                </Link>
              </li>
            </ul> */}
            {/* <ul>
              <li>
                <Link
                  className={asPath.includes('complaints') ? 'preference-selected' : ''}
                  href="/settings/complaints"
                >
                  <i className="fa-solid fa-file-lines"></i> Complaints
                </Link>
              </li>
            </ul> */}
            {/* <ul>
              <li>
                <Link className={asPath.includes('enquiry') ? 'preference-selected' : ''} href="/settings/enquiry">
                  <i className="fa-regular fa-circle-question"></i>Enquiry
                </Link>
              </li>
            </ul> */}
          </>
        ) : null}
        {/* {globalState?.profileDetail?.role === 'SUPERADMIN' ? (
          <>
            <h3 className="mt-4">Permission</h3>
            <ul>
              <li>
                <Link
                  className={asPath.includes('permission') ? 'preference-selected' : ''}
                  href="/settings/permission"
                >
                  <i className="fa-solid fa-users"></i> Permissions
                </Link>
              </li>
            </ul>
          </>
        ) : null} */}
        {/* {globalState?.profileDetail?.role !== 'USER' ? (
          <>
            <h3 className="mt-4">Email Template</h3>
            <ul>
              <li>
                <Link
                  className={asPath.includes('emailTemplate') ? 'preference-selected' : ''}
                  href="/settings/emailTemplate"
                >
                  <i className="fa-solid fa-file-lines"></i> Emails
                </Link>
              </li>
            </ul>
          </>
        ) : null} */}

        {/* {globalState?.profileDetail?.role !== 'USER' ? (
          <>
            <h3 className="mt-4">Complaints</h3>
            <ul>
              <li>
                <Link
                  className={asPath.includes('complaints') ? 'preference-selected' : ''}
                  href="/settings/complaints"
                >
                  <i className="fa-solid fa-file-lines"></i> Complaints
                </Link>
              </li>
            </ul>
          </>
        ) : null} */}
        {/* {globalState?.profileDetail?.role !== 'USER' ? (
          <>
            <h3 className="mt-4">Comments</h3>
            <ul>
              <li>
                <Link className={asPath.includes('comments') ? 'preference-selected' : ''} href="/settings/comments">
                  <i className="fa-solid fa-file-lines"></i> Comments
                </Link>
              </li>
            </ul>
          </>
        ) : null} */}
        {/* <h3 className="mt-4">Integrations</h3>
        <ul>
          <li>
            <Link className={asPath.includes('category') ? 'preference-selected' : ''} href="/settings/category">
              <i className="fa-solid fa-table-cells"></i>Category
            </Link>
          </li>
        </ul>
        <h3 className="mt-4">Enquiry Manager</h3>
        <ul>
          <li>
            <Link className={asPath.includes('enquiry') ? 'preference-selected' : ''} href="/settings/enquiry">
              <i className="fa-regular fa-circle-question"></i>Enquiry
            </Link>
          </li>
        </ul>
        <h3 className="mt-4">Email Templates</h3>
        <ul>
          <li>
            <Link
              className={asPath.includes('emailTemplate') ? 'preference-selected' : ''}
              href="/settings/emailTemplate"
            >
              <i className="fa-solid fa-envelope"></i>Email Template
            </Link>
          </li>
        </ul> */}
      </div>
    </div>
  );
}

export default memo(LeftPanel);
