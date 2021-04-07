import { Component } from "react";
import Task from './Task';
import { Container, Row, Col, Button } from 'react-bootstrap';
import DateYMD from '../../helpers/date';
import Confirm from '../../Modals/Confirm';
import TaskModal from '../../Modals/TaskModal';
import Preloader from "../../Loader/Preloader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import actionTypes from '../../../Redux/actionTypes';
import { Link } from 'react-router-dom';
import {
    setTasksThunk,
    addOrEditTaskThunk,
    deleteOneTaskThunk,
    removeAnyTasksThunk
} from '../../../Redux/actions';

class ToDo extends Component {

    handleCatchValue = (taskdata) => {
        if (!taskdata.title || !taskdata.description) return;
        taskdata.date = DateYMD(taskdata.date);
        this.props.addOrEditTask(taskdata);
        
    }
    handleDelete = (id) => {
        this.props.deleteTask(id);
    }

    removeSelectedTasks = () => {
        this.props.deleteCheckedTasks(this.props.removeTasks);
    }
    componentDidMount() {
        this.props.setTasks();
    }
    render() {
        const {
            //state
            tasks,
            loading,
            editTask,
            removeTasks,
            isAllChecked,
            openTaskModal,
            isConfirmModal,
            //dispatch
            toggleSetRemoveIds,
            toggleCheckAllTasks,
            toggleOpenTaskModal,
            toggleConfirmModal
        } = this.props
        console.log(removeTasks)
        const Tasks = tasks.map((task, index) => {
            return (
                <Col
                    key={task._id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={6}
                    xl={4}
                    className="d-flex justify-content-center mt-3 align-items-center">
                    <Task
                        task={task}
                        disabled={!!removeTasks.size}
                        handleDelete={this.handleDelete}
                        toggleSetRemoveIds={toggleSetRemoveIds}
                        checked={removeTasks.has(task._id)}
                        handleSetEditTask={toggleOpenTaskModal}
                    />
                </Col>
            )
        });
        let TasksList = tasks.reverse().map((task, index) => {
            // if (index === 5) return;
            return (
                <li key={task._id} class="list-group-item">
                    <Link to={`/task/${task._id}`}>{task.title}</Link>
                </li>
            )
        });
        return (
            <>
                <Col xl={3} lg={4} sm={3}>
                    <div class="card bg- mb-3">
                        <div class="card-header bg-dark text-white text-uppercase"><FontAwesomeIcon icon={faList} className="mr-1" />Latest 5 tasks</div>
                        <ul class="list-group category_block">
                            {TasksList}
                        </ul>
                    </div>
                    <div class="card bg- mb-3">
                        <div class="card-header bg-dark text-white text-uppercase">Last Task</div>
                        <div class="card-body">
                            <img class="img-fluid" src="https://dummyimage.com/600x400/55595c/fff" alt="Task" />
                            <h5 class="card-title">Product title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <p class="bloc_left_price">99.00 $</p>
                        </div>
                    </div>
                </Col>
                <Col xl={9} sm={9} md={9} lg={8}>


                    <Container className="todo-list">
                        <Row className="justify-content-center my-5">
                            <Col>
                                <Button
                                    className="ml-3"
                                    variant="primary"
                                    onClick={toggleOpenTaskModal}
                                >
                                    Add Task
                                    </Button>
                            </Col>
                        </Row>
                        <Row className="justify-content-center mt-3">
                            {!Tasks.length && <div>Tasks is Empty</div>}
                            {Tasks}
                        </Row>
                        <Row className="mt-5">
                            <Col>
                                {!!Tasks.length && <Button
                                    variant="danger"
                                    onClick={toggleConfirmModal}
                                    disabled={!!!removeTasks.size}
                                >
                                    Remove Selected
                                </Button>}
                                {!!Tasks.length && <Button
                                    className="ml-3"
                                    variant="primary"
                                    onClick={toggleCheckAllTasks}
                                >
                                    {isAllChecked ? 'Remove All Selected' : 'Select All'}
                                </Button>}
                            </Col>
                        </Row>
                    </Container>
                </Col>
                {isConfirmModal && <Confirm
                    handleClose={toggleConfirmModal}
                    onSubmit={this.removeSelectedTasks}
                    modalTitle={`Modal heading`}
                    modalBody={`Do you want to delete ${removeTasks.size} tasks`}
                />}
                {openTaskModal && <TaskModal
                    editTask={editTask}
                    onHide={toggleOpenTaskModal}
                    onSubmit={this.handleCatchValue}
                />}
                {loading && <Preloader />}
            </>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    const {
        tasks,
        loading,
        removeTasks,
        editTask,
        openTaskModal,
        isAllChecked,
        isConfirmModal
    } = state.todoState;
    return {
        tasks,
        loading,
        removeTasks,
        editTask,
        openTaskModal,
        isAllChecked,
        isConfirmModal
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setTasks: () => dispatch(setTasksThunk()),
        addOrEditTask: (data) => dispatch(addOrEditTaskThunk(data)),
        deleteCheckedTasks: (removeTasks) => dispatch(removeAnyTasksThunk(removeTasks)),
        deleteTask: (_id) => dispatch(deleteOneTaskThunk(_id)),

        toggleLoading: (isLoading) => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading });
        },   
        toggleSetRemoveIds: (_id) => {
            dispatch({ type: actionTypes.TOGGLE_CHECK_TASK, _id });
        },
        
        toggleCheckAllTasks: () => {
            dispatch({ type: actionTypes.TOGGLE_CHECK_ALL_TASKS });
        },
        toggleOpenTaskModal: (task = null) => {
            dispatch({ type: actionTypes.TOGGLE_OPEN_ADD_TASK_MODAL, task });
        },
        toggleConfirmModal: () => {
            dispatch({ type: actionTypes.TOGGLE_CONFIRM_MODAL });
        }
    }
}
const ToDoProvider = connect(mapStateToProps, mapDispatchToProps)(ToDo)
export default ToDoProvider;