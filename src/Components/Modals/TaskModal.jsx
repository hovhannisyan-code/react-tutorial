import React from "react";
import { Form, Button, Modal } from 'react-bootstrap';
import Proptypes from 'prop-types';

class TaskModal extends React.PureComponent {
    constructor(props) {
        super(props);
        let task = {};
        if (props.editTask) {
            const { _id, title, description } = props.editTask;
            task = {
                _id,
                title,
                description,
                edit: true
            }

        } else {
            task = {
                _id: '',
                title: '',
                description: '',
                edit: false
            }
        }

        this.state = {
            ...task
        }
        this.inputRef = React.createRef();
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    handleSubmit = ({ key, type }) => {
        const { onSubmit, onHide } = this.props;
        const { _id, title, description, edit } = this.state;
        if (
            (type === 'keypress' && key !== 'Enter') ||
            (!title || !description)
        ) return;

        const taskdata = {
            _id,
            title,
            description,
            edit
        };
        onSubmit(taskdata);
        onHide();
    }
    componentDidMount() {
        this.inputRef.current.focus();
    }
    render() {
        const { title, description } = this.state;
        const { onHide } = this.props;
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
                    <Button disabled={!!!title || !!!description} onClick={this.handleSubmit}>Save</Button>
                </Modal.Footer>
            </Modal>

        )
    }
}
TaskModal.propTypes = {
    onHide: Proptypes.func.isRequired,
    onSubmit: Proptypes.func.isRequired,
    editTask: Proptypes.oneOfType([
        Proptypes.object,
        Proptypes.bool
    ])
}
export default TaskModal;