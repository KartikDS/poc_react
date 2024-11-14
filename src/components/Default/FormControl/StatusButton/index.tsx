import React from 'react';

interface PROPS {
  status: boolean;
  onClick: () => void;
}

const StatusButton = ({ status, onClick }: PROPS) => {
  if (status) {
    return (
      <button onClick={onClick} className="btn customBtn SmBtn StatusBtn btn-success">
        Active
      </button>
    );
  } else {
    return (
      <button onClick={onClick} className="btn customBtn SmBtn StatusBtn btn-danger">
        Inactive
      </button>
    );
  }
};

export default StatusButton;
