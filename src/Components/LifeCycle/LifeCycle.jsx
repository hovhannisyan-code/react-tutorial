import { Component } from 'react';

class LifeCycle extends Component {
    constructor(props) {
        console.log("Constructor");
        super(props);
        this.state = {
            test: false
        }
    }
    toggleTest = () => {
        this.setState({
            test: !this.state.test
        })
    }
    shouldComponentUpdate = () => {
        console.log("shouldComponentUpdate");
        return false;
    }
    render() {
        console.log("Render");
        return (
            <div>
                <h1> LifeCycle </h1>
                <button onClick={this.toggleTest}>Change state</button>
            </div>
        )
    }
    getSnapshotBeforeUpdate() {

    }
    componentDidMount() {
        console.log("ComponentDidMount")
    }
    componentDidUpdate(prevProps, prevState) {
        console.log("prevProps", prevProps);
        console.log("prevState", prevState);
        console.log("ComponentDidUpdate");
    }
    componentWillUnmount() {
        console.log("componentWillUnmount")
    }
}
export default LifeCycle;