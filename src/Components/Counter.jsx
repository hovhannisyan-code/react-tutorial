import { Component } from "react";
import Action from "./Action";
import Result from "./Result";
class Counter extends Component {
    constructor(props) {
        super();
        this.state = {
            counter: props.counter
        }
    }
    //Second variant
    /**
    state = {
        counter: this.props.counter
    } 
    **/
    handlePlusCount = () => {
        this.setState({
            counter: this.state.counter + 1
        })
    }
    handleMinusCount = () => {
        this.setState({
            counter: this.state.counter - 1
        })
    }
    render() {
        const { counter } = this.state;
        return (
            <div className="counter">
                <Result
                    counter={counter}
                />
                <Action
                    handlePlusCount={this.handlePlusCount}
                    handleMinusCount={this.handleMinusCount}
                />
            </div>
        )
    }
}
export default Counter;