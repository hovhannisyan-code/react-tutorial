import { Button, Modal } from 'react-bootstrap';
const Confirm = (props) => {
    const { handleClose, onSubmit, modalTitle, modalBody } = props;
    const handleSubmit = () => {
        onSubmit();
        handleClose();
    }
    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalBody}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
          </Button>
                <Button variant="danger" onClick={handleSubmit}>
                    Remove
          </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default Confirm;