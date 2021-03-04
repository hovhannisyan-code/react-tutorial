import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class EditTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.editTask
        };
        this.inputRef = React.createRef();
    }
    handleSubmit = ({ key, type }) => {
        if (type === 'keypress' && key !== 'Enter') return;
        const { onSubmit, onHide } = this.props;
        onSubmit(this.state);
        onHide();
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    componentDidMount() {
        this.inputRef.current.focus();
    }
    render() {
        const { onHide } = this.props;
        const { title, description } = this.state;
        console.log(this.state)
        return (
            <Modal
                show={true}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column align-items-center">
                    <Form.Control
                        name="title"
                        type="text"
                        placeholder="Add Task"
                        onChange={this.handleChange}
                        onKeyPress={this.handleSubmit}
                        value={title}
                        style={{ width: "70%" }}
                        //disabled={disabled}
                        ref={this.inputRef}
                    />
                    <Form.Control
                        name="description"
                        onChange={this.handleChange}
                        as="textarea"
                        rows={3}
                        style={{ width: "70%" }}
                        className="my-3"
                        placeholder="Description"
                        value={description}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Close</Button>
                    <Button onClick={this.handleSubmit}>Save</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default EditTask;