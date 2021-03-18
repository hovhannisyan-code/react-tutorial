import React from "react";
import { Form, Button, Modal } from 'react-bootstrap';
import Proptypes from 'prop-types';
import DatePicker from "react-datepicker";

class TaskModal extends React.PureComponent {
    constructor(props) {
        super(props);
        const edit = props.editTask ? true : false;
        this.state = {
            _id: '',
            title: '',
            description: '',
            edit,
            ...props.editTask,
            date: props.editTask ? new Date(props.editTask.date) : new Date()
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
        const { onSubmit } = this.props;
        const { title, description } = this.state;
        if (
            (type === 'keypress' && key !== 'Enter') ||
            (!title || !description)
        ) return;

        onSubmit(this.state);
    }
    handleSetDate = (date) => {
        this.setState({
            date
        });
    }
    componentDidMount() {
        this.inputRef.current.focus();
    }
    componentWillUnmount() {
        console.log('componentWillUnmount')
    }
    render() {
        const { title, description, date, edit } = this.state;
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
                    <DatePicker selected={date} onChange={date => this.handleSetDate(date)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Close</Button>
                    <Button
                        disabled={!!!title || !!!description}
                        onClick={this.handleSubmit}>
                        {edit ? "Save" : "Add"}
                    </Button>
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