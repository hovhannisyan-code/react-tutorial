import React from "react";
import { Form, Button } from 'react-bootstrap';
import Proptypes from 'prop-types';
class AddNewTask extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: ''
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
        if (type === 'keypress' && key !== 'Enter') return;
        const { onSubmit } = this.props;
        const { title, description } = this.state;
        const taskdata = {
            title,
            description
        };
        onSubmit(taskdata);
        this.setState({
            title: '',
            description: ''
        })
    }
    componentDidMount() {
        this.inputRef.current.focus();
    }
    render() {
        const { title, description } = this.state;
        const { disabled } = this.props;
        return (
            <div className="d-flex flex-column align-items-center mt-4">
                <Form.Control
                    name="title"
                    type="text"
                    placeholder="Add Task"
                    onChange={this.handleChange}
                    onKeyPress={this.handleSubmit}
                    value={title}
                    style={{ width: "70%" }}
                    disabled={disabled}
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
                <Button
                    variant="primary"
                    onClick={this.handleSubmit}
                    disabled={!(!!title && !!description)}
                >
                    Add
                </Button>
            </div>

        )
    }
}
AddNewTask.propTypes = {
    disabled: Proptypes.bool.isRequired,
    onSubmit: Proptypes.func.isRequired
}
export default AddNewTask;