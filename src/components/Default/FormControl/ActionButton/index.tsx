import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, memo } from 'react';
import Form from 'react-bootstrap/Form';

import Tooltip from '@/components/Default/Tooltip';

interface PROPS {
  id: number;
  view?: string;
  edit?: string;
  redirectLink?: string;
  redirectTooltip?: string;
  status?: number;
  handleChange?: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  handleDelete?: (id: number) => void;
}

const ActionButton = ({
  id,
  edit,
  view,
  status = 0,
  handleChange,
  handleDelete,
  redirectLink,
  redirectTooltip = 'Redirect',
}: PROPS) => {
  return (
    <React.Fragment>
      <div className="d-flex gap-2 align-items-center actionIcons">
        {view ? (
          <Tooltip text="View">
            <Link href={view}>
              <span role="button" className="px-2 ">
                <Image src="/assets/images/view-Icon.svg" alt="Downtime" width={26} height={26} className="me-2" />
              </span>
            </Link>
          </Tooltip>
        ) : null}
        {handleChange ? (
          <Tooltip text="Update Status">
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              checked={status === 1}
              onChange={event => handleChange(event, id)}
            />
          </Tooltip>
        ) : null}
        {edit ? (
          <Tooltip text="Edit">
            <Link href={edit}>
              <span className="px-2 ">
                <Image src="/assets/images/edit-Icon.svg" alt="Downtime" width={26} height={26} className="me-2" />
              </span>
            </Link>
          </Tooltip>
        ) : null}
        {handleDelete ? (
          <Tooltip text="Delete">
            <span>
              <Image
                onClick={() => handleDelete(id)}
                src="/assets/images/delete-Icon.svg"
                alt="Downtime"
                width={26}
                height={26}
              />
            </span>
          </Tooltip>
        ) : null}
        {status === 1 && redirectLink ? (
          <Tooltip text={redirectTooltip}>
            <Link href={redirectLink}>
              <span role="button" className="px-2 ">
                <Image src="/assets/images/icons8-link-50.png" alt="Downtime" width={26} height={26} className="me-2" />
              </span>
            </Link>
          </Tooltip>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default memo(ActionButton);
