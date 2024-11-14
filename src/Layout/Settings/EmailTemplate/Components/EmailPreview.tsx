import moment from 'moment';
import Image from 'next/image';
import React, { memo } from 'react';
import { Button, Dropdown } from 'react-bootstrap';

interface EMAIL {
  id: string;
  title: string;
  slug: string;
  content: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  action: JSX.Element;
}

interface PROPS {
  emailDetail: EMAIL;
  handleEdit: () => void;
  onDelete: () => void;
}

function EmailPreview(props: PROPS) {
  const { emailDetail } = props;
  return (
    <div className="canvasData">
      <div className="inner">
        <div className="topSection">
          <div className="head d-flex justify-content-between align-items-center p-2 offcanvas-header">
            <div className="start-content mt-2">{/* <h6>Enquiry Details</h6> */}</div>
            <div className="end-content">
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

          <div className="container my-3">
            <div className="row">
              <div className="col-md-12">
                <span className="fw-bold d-block">Title</span>
                <p>{emailDetail.title}</p>

                <span className="fw-bold">Slug</span>
                <p>{emailDetail.slug}</p>

                <span className="fw-bold">Subject</span>
                <p>{emailDetail.subject}</p>

                <span className="fw-bold">Date Added</span>
                <p>{moment(emailDetail.createdAt).format('LLL')}</p>

                <span className="fw-bold">Last Updated</span>
                <p>{moment(emailDetail.updatedAt).format('LLL')}</p>

                <div className="pb-4">
                  <span className="fw-bold">Content</span>
                  <div className="contentDetail mt-2 mb-2" dangerouslySetInnerHTML={{ __html: emailDetail?.content }} />
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

export default memo(EmailPreview);
