import Image from 'next/image';
import React, { memo } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import moment from 'moment';

interface CMS {
  id: string;
  title: string;
  slug: string;
  content: string;
  subTitle: string;
  metaTitle: string;
  metaKeyword: string;
  shortDescription: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
  status: number;
}

interface PROPS {
  dev: string | null;
  pageDetail: CMS;
  handleEdit: () => void;
  onDelete: () => void;
}

function PagePreview(props: PROPS) {
  const { pageDetail } = props;
  return (
    <div className="canvasData">
      <div className="inner">
        <div className="topSection">
          {props.dev && (
            <div className="head d-flex justify-content-between align-items-center p24">
              <div>{/* <h2>{pageDetail.title}</h2> */}</div>

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
              <div className="col-md-12">
                <span className="fw-bold d-block">Title</span>
                <p>{pageDetail.title}</p>

                <span className="fw-bold">Slug</span>
                <p>{pageDetail.slug}</p>

                <span className="fw-bold">Sub Title</span>
                <p>{pageDetail.subTitle}</p>

                <span className="fw-bold">Meta Title</span>
                <p>{pageDetail.metaTitle}</p>

                <span className="fw-bold">Meta Keyword</span>
                <p>{pageDetail.metaKeyword}</p>

                <span className="fw-bold">Short Description</span>
                <p>{pageDetail.shortDescription}</p>

                <span className="fw-bold">Date Added</span>
                <p>{moment(pageDetail.createdAt).format('LLL')}</p>

                <span className="fw-bold">Last Updated</span>
                <p>{moment(pageDetail.updatedAt).format('LLL')}</p>

                <span className="fw-bold">Meta Description</span>
                <p>{pageDetail.metaDescription}</p>

                <span className="fw-bold">Content</span>
                <div className="contentDetail mt-2 mb-2" dangerouslySetInnerHTML={{ __html: pageDetail?.content }} />
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

export default memo(PagePreview);
