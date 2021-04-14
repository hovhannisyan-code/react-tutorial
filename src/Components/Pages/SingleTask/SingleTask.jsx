import React, { useEffect } from "react";
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
import {
    setSingleTaskThunk,
    deleteSTThunk,
    editSingleTaskThunk
} from '../../../Redux/actions';
import actionTypes from '../../../Redux/actionTypes';
const SingleTask = (props) => {

    //Effects
    const { id } = props.match.params;
    const { history, setSingleTask } = props;
    useEffect(() => {
        setSingleTask(id, history);
    }, [id, setSingleTask, history]);

    const {
        singleTask,
        showModal,
        openTaskModal,
        loading
    } = props;


    if (!singleTask) { // todo check error from server
        return <Preloader />
    }
    return (
        <div className={`m-auto ${styles.taskpage}`}>
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
                    <Button variant="danger" onClick={props.toggleConfirmModal} className="mr-2">Delete</Button>
                    <Button variant="warning" onClick={props.toggleEditModal}>Edit</Button>
                </div>
            </div>
            {showModal && <Confirm
                handleClose={props.toggleConfirmModal}
                onSubmit={() => props.deleteTask(singleTask._id, history)}
                modalTitle={`Are you sure ?`}
                modalBody={`Do you want to delete ${singleTask.title} task ?`}
            />}
            {openTaskModal && <TaskModal
                editTask={singleTask}
                onHide={props.toggleEditModal}
                onSubmit={props.editTask}
            />}
            {loading && <Preloader />}
        </div>
    )
}
const mapStateToProps = (state) => {
    const {
        singleTask,
        showModal,
        openTaskModal,
        loading
    } = state.singleTaskState;
    return {
        singleTask,
        showModal,
        openTaskModal,
        loading
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setSingleTask: (id, history) => dispatch(setSingleTaskThunk(id, history)),
        editTask: (singleTask) => dispatch(editSingleTaskThunk(singleTask)),
        deleteTask: (_id, history) => dispatch(deleteSTThunk(_id, history)),

        toggleEditModal: () => dispatch({ type: actionTypes.TOGGLE_ST_MODAL }),
        toggleConfirmModal: () => {
            console.log('asdasd')
            dispatch({ type: actionTypes.TOGGLE_ST_CONFIRM_MODAL });
        }
    }
}
const singletaskProvider = connect(mapStateToProps, mapDispatchToProps)(SingleTask)
export default singletaskProvider;