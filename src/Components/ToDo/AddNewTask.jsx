import React  from "react";
import { Form, Button } from 'react-bootstrap';
import Proptypes from 'prop-types';
class AddNewTask extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        }
        this.inputRef = React.createRef();
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
    componentDidMount() {
        this.inputRef.current.focus();
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
                    ref={this.inputRef}
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
AddNewTask.propTypes = {
    disabled: Proptypes.bool.isRequired,
    onSubmit: Proptypes.func.isRequired
}
export default AddNewTask;