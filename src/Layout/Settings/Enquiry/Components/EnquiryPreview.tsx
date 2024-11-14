'use client';
import React, { memo } from 'react';
import moment from 'moment';

interface ENQUIRY {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  isActive: number;
  createdAt?: string;
  updatedAt?: string;
  action: JSX.Element;
  replies: REPLY | null;
}
interface REPLY {
  enquiryId: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PROPS {
  enquiryDetail: ENQUIRY;
  handleEdit: () => void;
  onDelete: () => void;
}

function EnquiryPreview(props: PROPS) {
  const { enquiryDetail } = props;

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-md-12">
          <span className="fw-bold d-block">Enquiry Details</span>
          <div className="mt-2 mb-2">
            <h6>Email</h6>
            <p>{enquiryDetail.email}</p>
          </div>
          <div className="mt-2 mb-2">
            <h6>Phone Number</h6>
            <p>{enquiryDetail.phoneNumber}</p>
          </div>
          <div className="mt-2 mb-2">
            <h6>Message</h6>
            <div dangerouslySetInnerHTML={{ __html: enquiryDetail?.message }} />
          </div>
          <div className="mt-2 mb-2">
            <span className="fw-bold">Date Added</span>
            <p>{moment(enquiryDetail.createdAt).format('LLL')}</p>
          </div>
          <div className="mt-2 mb-2">
            <span className="fw-bold">Last Updated</span>
            <p>{moment(enquiryDetail.updatedAt).format('LLL')}</p>
          </div>

          {enquiryDetail.replies && (
            <div className="mt-4">
              <span className="fw-bold d-block">Reply Details</span>
              <div className="mt-2 mb-2">
                <h6>Email</h6>
                <p>{enquiryDetail?.replies?.email}</p>
              </div>
              <div className="mt-2 mb-2">
                <h6>Subject</h6>
                <p>{enquiryDetail?.replies?.subject}</p>
              </div>
              <div className="mt-2 mb-2">
                <h6>Message</h6>
                <div dangerouslySetInnerHTML={{ __html: enquiryDetail?.replies?.message }} />
              </div>
              <div className="mt-2 mb-2">
                <span className="fw-bold">Date Added</span>
                <p>{moment(enquiryDetail?.replies?.createdAt).format('LLL')}</p>
              </div>
              <div className="mt-2 mb-2">
                <span className="fw-bold">Last Updated</span>
                <p>{moment(enquiryDetail?.replies?.updatedAt).format('LLL')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(EnquiryPreview);
