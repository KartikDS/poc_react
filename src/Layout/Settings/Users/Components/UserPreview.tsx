import Image from 'next/image';
import React, { memo } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import moment from 'moment';

interface USER {
  updatedAt: string;
  id: string;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  createdAt: string;
  phone: string;
}

interface PROPS {
  userDetail: USER;
  handleEdit: () => void;
  onDelete: () => void;
}

function UserPreview(props: PROPS) {
  const { userDetail } = props;
  return (
    <div className="canvasData">
      <div className="inner">
        <div className="topSection">
          <div className="head d-flex justify-content-between align-items-center p24">
            <div>{/* <h2>{userDetail.fullname}</h2> */}</div>
            <div>
              <Dropdown className="ActionDropDown">
                <Dropdown.Toggle id="dropdown-basic">Actions</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={event => {
                      event.preventDefault();
                      props.onDelete();
                    }}
                  >
                    <span className="menuIcon">
                      <Image alt="delete" height={16} width={16} src="/assets/icons/delete.svg" />
                    </span>{' '}
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="mt-3">
            <div>
              <div>
                {/* <h2>User</h2> */}
                {/* <h4>
                  {userDetail.firstname} <span>{userDetail.lastname}</span>
                </h4> */}
              </div>

              <div className="container">
                <div className="row mb-3">
                  <div className="col-md-12">
                    <h6>First Name</h6>
                    <p>{userDetail.firstname}</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <h6>Last Name</h6>
                    <p>{userDetail.lastname}</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <h6>Email</h6>
                    <p>{userDetail.email}</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <h6>Date Added</h6>
                    <p>{moment(userDetail.createdAt).format('LLL')}</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <h6>Last Updated</h6>
                    <p>{moment(userDetail.updatedAt).format('LLL')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="plr24 canvasFooter">
          <Button className="OutlineBtn" onClick={() => props.handleEdit()}>
            Edit
          </Button>{' '}
        </div>
      </div>
    </div>
  );
}

export default memo(UserPreview);
