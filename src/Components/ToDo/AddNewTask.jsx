import { Component } from "react";

class AddNewTask extends Component {
    state = {
        inputValue: ''
    }
    handleChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }
    handleSubmit = (e) => {
        const {onSubmit} = this.props;
        const {inputValue} = this.state;
        onSubmit(inputValue);
        this.setState({
            inputValue: ''
        })
    }
    render() {
        const { inputValue } = this.state;
        return (
            <div>
                <input
                    type="text"
                    placeholder="input"
                    onChange={this.handleChange}
                    value={inputValue}
                />
                <button onClick={this.handleSubmit}>Add Task</button>
            </div>

        )
    }
}
export default AddNewTask;