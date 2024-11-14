import Image from 'next/image';
import React, { memo } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import moment from 'moment';

interface PERMISSION {
  id: string;
  name: string;
  read: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface PROPS {
  dev: string | null;
  permissionDetail: PERMISSION;
  handleEdit: () => void;
  onDelete: () => void;
}

function PermissionPreview(props: PROPS) {
  const { permissionDetail } = props;
  return (
    <div className="canvasData">
      <div className="inner">
        <div className="topSection">
          {props.dev && (
            <div className="head d-flex justify-content-between align-items-center p24 offcanvas-header">
              <div>{/* <h2>{permissionDetail.name}</h2> */}</div>

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
          )}

          <div className="container my-3">
            <div className="row">
              <div className="col-md-4">
                <span className="fw-bold">Name</span>
                <p>{permissionDetail.name}</p>
              </div>
              <div className="col-md-4">
                <span className="fw-bold">Read</span>
                <p>{permissionDetail.read ? 'Yes' : 'No'}</p>
              </div>
              <div className="col-md-4">
                <span className="fw-bold">Create</span>
                <p>{permissionDetail.create ? 'Yes' : 'No'}</p>
              </div>
              <div className="col-md-4">
                <span className="fw-bold">Edit</span>
                <p>{permissionDetail.edit ? 'Yes' : 'No'}</p>
              </div>
              <div className="col-md-4">
                <span className="fw-bold">Delete</span>
                <p>{permissionDetail.delete ? 'Yes' : 'No'}</p>
              </div>
              <div className="col-md-4">
                <span className="fw-bold">Date Added</span>
                <p>{moment(permissionDetail.createdAt).format('LLL')}</p>
              </div>
              <div className="col-md-4">
                <span className="fw-bold">Last Updated</span>
                <p>{moment(permissionDetail.updatedAt).format('LLL')}</p>
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

export default memo(PermissionPreview);
