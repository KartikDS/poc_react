import Modal from 'react-bootstrap/Modal';

interface PROPS {
  show: boolean;
  closeModal: () => void;
  title?: JSX.Element | string;
  body?: JSX.Element | string;
}

function CustomModal(props: PROPS) {
  const { show, closeModal, title, body } = props;

  return (
    <>
      <Modal
        show={show}
        onHide={closeModal}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
      </Modal>
    </>
  );
}

export default CustomModal;
