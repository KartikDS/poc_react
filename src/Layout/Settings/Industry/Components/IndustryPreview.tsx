import Image from 'next/image';
import React, { memo } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import moment from 'moment';

interface Feild {
  id: string;
  name: string;
  description: string;
  feildImage: string;
  createdAt: string;
  updatedAt: string;
}

interface Industry {
  id: string;
  name: string;
  description: string;
  industryImage: string;
  feilds: Feild[];
  createdAt: string;
  updatedAt: string;
  action: JSX.Element;
}

interface PROPS {
  industryDetail: Industry;
  handleEdit: () => void;
  onDelete: () => void;
}

function IndustryPreview(props: PROPS) {
  const { industryDetail } = props;

  const defaultImage = `/images/${industryDetail?.industryImage}`;

  return (
    <div className="canvasData">
      <div className="inner">
        <div className="topSection">
          <div className="head d-flex justify-content-between align-items-center p-3 ">
            <div></div>
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
                      <Image alt="Delete this industry" height={16} width={16} src="/assets/icons/delete.svg" />
                    </span>{' '}
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          {/* Wrap all details in a single col-md-12 */}
          <div className="container my-3">
            <div className="row">
              <div className="col-md-12">
                <span className="fw-bold d-block">Icon</span>
                <div className="mt-2 mb-2">
                  <Image
                    src={defaultImage}
                    alt={`Icon for ${industryDetail.name}`}
                    width={80}
                    height={80}
                    className="img-fluid rounded-circle"
                  />
                </div>
                <span className="fw-bold">Name</span>
                <p>{industryDetail.name}</p>
                <span className="fw-bold">Description</span>
                <p>{industryDetail.description}</p>
                <span className="fw-bold">Date Added</span>
                <p>{moment(industryDetail.createdAt).format('LLL')}</p>
                <span className="fw-bold">Last Updated</span>
                <p>{moment(industryDetail.updatedAt).format('LLL')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="plr-3 canvasFooter">
          <Button className="OutlineBtn" onClick={() => props.handleEdit()}>
            Edit
          </Button>{' '}
        </div>
      </div>
    </div>
  );
}

export default memo(IndustryPreview);
