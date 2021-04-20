import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

const CounterRedux = (props) => {
    const {
        plusCount,
        minusCount,
        resetCount,
        setInputValue,
        resetInputValue,
        inputValue,
        heloText,

    } = props;
    return (
        <div>
            <h1>Counter Redux</h1>
            <div>
                {heloText}
            </div>
            <div>
                <p>{props.counter}</p>
                <Button variant="outline-primary" className="mx-2" onClick={plusCount}>Plus</Button>
                <Button variant="outline-primary" className="mx-2" onClick={minusCount}>Minus</Button>
                <Button variant="outline-danger" className="mx-2" onClick={resetCount}>Reset</Button>
            </div>
            <div className="mt-5">
                <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <p>
                    {inputValue}
                </p>
                <Button variant="outline-danger" className="mx-2" onClick={resetInputValue}>Reset Input Value</Button>
            </div>

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        heloText: state.text,
        counter: state.counter,
        inputValue: state.inputValue,
        test: true
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        plusCount: () => dispatch({ type: "plusCounter" }),
        minusCount: () => dispatch({ type: "minusCounter" }),
        resetCount: () => dispatch({ type: "resetCounter" }),
        setInputValue: (value) => dispatch({ type: "setInputValue", inputValue: value }),
        resetInputValue: () => dispatch({ type: "resetInputValue" })
    }
}
const CounterReduxWithState = connect(mapStateToProps, mapDispatchToProps)(CounterRedux)
export default CounterReduxWithState;