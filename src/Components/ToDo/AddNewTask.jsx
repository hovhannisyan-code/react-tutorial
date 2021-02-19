import { Component } from "react";
import { Form, Button } from 'react-bootstrap';

class AddNewTask extends Component {
    state = {
        inputValue: ''
    }
    handleChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }
    handleSubmit = ({ key, type }) => {
        if (type === 'keypress' && key !== 'Enter') return;
        const { onSubmit } = this.props;
        const { inputValue } = this.state;
        onSubmit(inputValue);
        this.setState({
            inputValue: ''
        })
    }
    render() {
        const { inputValue } = this.state;
        const { disabled } = this.props;
        return (
            <div className="d-flex justify-content-center mt-4">
                <Form.Control
                    type="text"
                    placeholder="Add Task"
                    onChange={this.handleChange}
                    onKeyPress={this.handleSubmit}
                    value={inputValue}
                    style={{ width: "70%" }}
                    disabled={disabled}
                />
                <Button
                    variant="primary"
                    onClick={this.handleSubmit}
                    disabled={!!!inputValue}
                >
                    Add
                </Button>
            </div>

        )
    }
}
export default AddNewTask;