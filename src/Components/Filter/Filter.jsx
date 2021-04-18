import { DropdownButton, Dropdown, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import actionTypes from '../../Redux/actionTypes';
import styles from './filter.module.css';
import DatePicker from 'react-datepicker';
import { sortOrFilterTasksThunk } from '../../Redux/actions';
import DateYMD from '../helpers/date';

const Search = (props) => {
    const {
        //functions
        changeDropDownValue,
        changeSearchInput,
        handleSetDate,
        handleSubmit,
        resetSearchForm,
        ...state

    } = props;
    const {
        search,
        status,
        sort,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte
    } = state;
    const handleS = () => {
        const queryData = {};
        for (let key in state) {
            if (state[key]) {
                queryData[key] = typeof state[key] === "object" ? DateYMD(state[key]) : state[key];
            }
        }
        handleSubmit(queryData);
    }

    return (
        <div>
            <h1>Filter</h1>
            <div className={styles.searchSection}>
                <div className="text-center">
                    <Form.Control
                        name="title"
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => changeSearchInput(e.target.value)}
                    />
                </div>

                <div className="m-auto">
                    <DropdownButton
                        id="dropdown-baic-button"
                        variant="dark"
                        title={!!!status ? "Status" : status}
                        className={`my-2 w-100 ${styles.btn}`}
                    >
                        <Dropdown.Item onClick={(e) => changeDropDownValue("done", "status")}>Done</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => changeDropDownValue("active", "status")}>Active</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => changeDropDownValue("", "status")}>Reset</Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton 
                    id="dropdown-basic-button" 
                    title={!!!sort ? "Sort" : sort.toUpperCase().replaceAll("_", " ")} 
                    variant="dark"
                    className={`my-2 w-100 ${styles.btn}`}>
                        <Dropdown.Item onClick={(e) => changeDropDownValue("a-z", "sort")}>A-Z</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => changeDropDownValue("z-a", "sort")}>Z-A</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => changeDropDownValue("creation_date_oldest", "sort")}>creation_date_oldest</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => changeDropDownValue("creation_date_newest", "sort")}>creation_date_newest</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => changeDropDownValue("completion_date_oldest", "sort")} >completion_date_oldest</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => changeDropDownValue("completion_date_newest", "sort")}>completion_date_newest</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => changeDropDownValue("", "sort")}>Reset</Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className={styles.datePicker}>
                    create_lte: <DatePicker
                        selected={create_lte ? create_lte : null}
                        onChange={date => handleSetDate("create_lte", date)}
                    />
                </div>
                <div className={styles.datePicker}>
                    create_gte: <DatePicker
                        selected={create_gte}
                        onChange={date => handleSetDate("create_gte", date)}
                    />
                </div>
                <div className={styles.datePicker}>
                    complete_lte: <DatePicker
                        selected={complete_lte}
                        onChange={date => handleSetDate("complete_lte", date)}
                    />
                </div>
                <div className={styles.datePicker}>
                    complete_gte: <DatePicker
                        selected={complete_gte}
                        onChange={date => handleSetDate("complete_gte", date)}
                    />
                </div>
                <div>
                    <Button variant="primary mt-3"
                        onClick={handleS}
                    >
                        Search
                    </Button>
                    <Button variant="primary mt-3 ml-5"
                        onClick={resetSearchForm}
                    >
                        Reset
                    </Button>
                </div>

            </div>
        </div >
    );
}

const mapStateToProps = (state) => {
    const {
        search,
        status,
        sort,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte
    } = state.filterState;
    return {
        search,
        status,
        sort,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeDropDownValue: (value, dropDownType) => dispatch({
            type: actionTypes.SET_STATUS,
            dropDownType,
            value
        }),
        changeSearchInput: (value) => dispatch({
            type: actionTypes.CHANGE_SEARCH_VALUE,
            value
        }),
        handleSetDate: (dateType, date) => dispatch({
            type: actionTypes.SET_SORT_DATE,
            dateType,
            date
        }),
        handleSubmit: (queryData) => dispatch(sortOrFilterTasksThunk(queryData)),
        resetSearchForm: () => dispatch({ type: actionTypes.RESET_SEARCH_FORM })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);