import { Component } from "react";

class B extends Component {
    constructor(props) {
        super();
        console.log(props);
    }
    state = {
        inputValue: ''
    }
    handleChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }
    handleSubmit = (e) => {
        console.log(this.props.onSubmit);
        const {onSubmit} = this.props;
        const {inputValue} = this.state;
        onSubmit(inputValue);
    }
    render() {
        const { inputValue } = this.state;
        return (
            <div>
                <h1>B component</h1>
                <input
                    type="text"
                    placeholder="input"
                    onChange={this.handleChange}
                    value={inputValue}
                />
                <button onClick={this.handleSubmit}>Add</button>
            </div>
        )
    }
}
export default B;