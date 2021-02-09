import { Component } from "react";
import B from './B';
import C from './C';
class A extends Component {
    state = {
        inputValue: ''
    }
    handleCatchValue = (inputValue) => {
        this.setState({
            inputValue
        })
    }
    render() {
        const {inputValue} = this.state;

        return (
            <div>
                <h1>A component</h1>
                <div>
                    <B onSubmit={this.handleCatchValue} />
                </div>
                <div>
                    <C inputValue={inputValue} />
                </div>
            </div>
        )
    }
}
export default A;