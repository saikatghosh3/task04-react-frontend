import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, action, onHide, onConfirm, confirmingAction }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm {action}</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you want to {action?.toLowerCase()} the selected users?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Cancel
      </Button>
      <Button variant="primary" onClick={onConfirm} disabled={confirmingAction}>
        {confirmingAction ? "Processing..." : "Confirm"}
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ConfirmModal;
