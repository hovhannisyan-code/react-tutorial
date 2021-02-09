import { Component } from "react";

class C extends Component {
    constructor(props) {
        super();
    }
    state = {
        
    }
    render() {
        const {inputValue} = this.props;
        return(
            <div>
                <h1>Component C</h1>
                <div>Res {inputValue}</div>
            </div>
        )
    }
}
export default C;