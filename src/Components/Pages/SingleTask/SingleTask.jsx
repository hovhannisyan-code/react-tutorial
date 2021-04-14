import React,{useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import styles from "./singletask.module.css";
import { Button } from 'react-bootstrap';
import DateYMD from '../../helpers/date';
import Confirm from '../../Modals/Confirm';
import TaskModal from '../../Modals/TaskModal';
import Preloader from "../../Loader/Preloader";
/**
 * Redux
 */
import { connect } from 'react-redux';
import actionTypes from '../../../Redux/actionTypes';
const SingleTask = (props) => {
    

    //Effects
    useEffect(() => {
        const { id } = props.match.params;
        dispatch({ type: "loading", loading: true });
        fetch(`http://localhost:3001/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                dispatch({ type: "setSingleTask", task: data });
                dispatch({ type: "loading", loading: true });
            })
            .catch(error => {
                const { history } = props;
                history.push("/404");
                console.log('error', error);
            })
            .finally(() => {
                dispatch({ type: "loading", loading: false });
            });
    },[props]);

    const {
        singleTask,
        showModal,
        openTaskModal,
        loading
    } = props;

    const handleCatchValue = (taskdata) => {
        if (!taskdata.title || !taskdata.description) return;
        
        taskdata.date = DateYMD(taskdata.date);
        dispatch({ type: "loading", loading: true });
        fetch(`http://localhost:3001/task/${taskdata._id}`, {
            method: "PUT",
            body: JSON.stringify(taskdata),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                dispatch({ type: "openTaskModal" })
                dispatch({ type: "setSingleTask", task: data });
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                dispatch({ type: "loading", loading: false });
            });
    }

    const handleDelete = () => {
        const { _id } = props.singleTask;
        const { history } = props;
        dispatch({ type: "loading", loading: true });
        fetch(`http://localhost:3001/task/${_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                dispatch({ type: "loading", loading: false });
                history.push("/");
            })
            .catch(error => {
                console.log(error)
            })

    }

    if (!singleTask) { // todo check error from server
        return <Preloader />
    }
    return (
        <div className={styles.taskpage}>
            <div className={styles.task}>
                <h2>{singleTask.title}</h2>
                <div>
                    {singleTask.description}
                </div>
                <div>
                    <FontAwesomeIcon icon={faStopwatch} className={`mr-1 ${styles.timer}`} />
                    {DateYMD(singleTask.date)}
                </div>
                <div>
                    <FontAwesomeIcon icon={faClock} className="mr-1" />
                    {DateYMD(singleTask.created_at)}
                </div>
                <div className="mt-2">
                    <Button variant="danger" onClick={() => dispatch({ type: "showModal" })} className="mr-2">Delete</Button>
                    <Button variant="warning" onClick={() => dispatch({ type: "openTaskModal" })}>Edit</Button>
                </div>
            </div>
            {showModal && <Confirm
                handleClose={() => dispatch({ type: "showModal" })}
                onSubmit={handleDelete}
                modalTitle={`Are you sure ?`}
                modalBody={`Do you want to delete ${singleTask.title} task ?`}
            />}
            {openTaskModal && <TaskModal
                editTask={singleTask}
                onHide={() => dispatch({ type: "openTaskModal" })}
                onSubmit={handleCatchValue}
            />}
            {loading && <Preloader />}
        </div>
    )
}
const mapStateToProps = (state) => {
    const {

    } = state.singleTaskState;
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        toggleLoading: (isLoading) => {
            dispatch({ type: actionTypes.TOGGLE_ST_LOADING, isLoading });
        },
        toggleModal: () => dispatch({ type: actionTypes.TOGGLE_ST_MODAL })
    }
}
const singletaskProvider = connect(mapStateToProps, mapDispatchToProps)(SingleTask)
export default singletaskProvider;