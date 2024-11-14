import Image from 'next/image';
import Link from 'next/link';
import { memo, useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';
import { usePathname } from 'next/navigation';

import styles from '@/styles/Components/Container/Header.module.scss';

import { useContainerContext } from '../context';

function Header() {
  const [isPanelActive, setIsPanelActive] = useState(false); // State to track if panel is active
  const { logout } = useContainerContext();
  const router = usePathname();
  const { state: globalState } = useContainerContext();

  const togglePanel = () => {
    setIsPanelActive(!isPanelActive);
    // Toggle body class
    document.body.classList.toggle('panel-active');
  };

  useEffect(() => {
    togglePanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <>
      <div className="mainHeader">
        <div className="container-fluid topHeader">
          <div className={styles.HeaderInner}>
            <div className="d-flex gap-3">
              <Link className={styles.HeaderSubInner} href={'/dashboard'}>
                <Image alt="mainlogo" height={50} width={50} src={'/assets/images/logoVipr.png'} />
              </Link>
            </div>
            <div className={styles.HeaderRight}>
              <ul>
                <li>
                  <div className={styles.topUserHead}>
                    {/* {globalState?.profileDetail?.role !== 'USER' && (
                      <div className="settingIcon">
                        <Link href={'/settings/accounts'}>
                          <i className="fa-solid fa-gear"></i>
                        </Link>
                      </div>
                    )} */}

                    <div>
                      <Dropdown>
                        <Dropdown.Toggle id="header-dropdown-toogle" style={{ color: 'black' }}>
                          <span className={styles.userIcon}>
                            <i className="fa-solid fa-user"></i>
                          </span>{' '}
                          {globalState?.profileDetail?.fullname}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {/* <Dropdown.Item as={Link} href={`/settings`}>
                            <Image alt="settings" src={'/assets/icons/settings.svg'} height={20} width={20} />
                            &nbsp; Settings
                          </Dropdown.Item> */}
                          <Dropdown.Item href="#" onClick={logout}>
                            &nbsp;
                            <Image alt="logout" src={'/assets/icons/logout-icon.svg'} height={15} width={15} />
                            &nbsp;&nbsp; Logout
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <Button className="leftBtn" onClick={togglePanel}>
                      <i className="fa-solid fa-bars"></i>
                    </Button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Header);
