import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

interface PROPS {
  handleClose: () => void;
  show: boolean;
  placement?: 'end' | 'start';
  children?: React.ReactNode | null;
}

const FilterSection = ({ show, handleClose, placement = 'end', children = null }: PROPS) => {
  return (
    <Offcanvas placement={placement} show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filter</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
};

export default FilterSection;
