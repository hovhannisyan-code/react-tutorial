import { Component } from "react";
import Task from './Task';
import { Container, Row, Col, Button } from 'react-bootstrap';
import DateYMD from '../../helpers/date';
import Confirm from '../../Modals/Confirm';
import TaskModal from '../../Modals/TaskModal';
import Preloader from "../../Loader/Preloader";

import {connect} from 'react-redux';
import actionTypes from '../../../Redux/actionTypes';
class ToDo extends Component {
    constructor(props) {
        super(props);
        //const tasks = [];
        this.state = {
            showModal: false,
        }
    }

    handleCatchValue = (taskdata) => {
        if (!taskdata.title || !taskdata.description) return;
        taskdata.date = DateYMD(taskdata.date);
        const {toggleOpenTaskModal} = this.props;
        if (taskdata.edit) {
            this.props.toggleLoading(true);
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

                    this.props.editTaskF(data);
                    toggleOpenTaskModal();
                })
                .catch(error => {
                    console.log(error)
                    // todo notify
                })
                .finally(() => {
                    this.props.toggleLoading(false);
                });

        } else {
            this.props.toggleLoading(true);
            fetch("http://localhost:3001/task", {
                method: 'POST',
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
                    this.props.addTask(data);
                    toggleOpenTaskModal();
                })
                .catch(error => {
                    console.log('catch Error', error);
                })
                .finally(() => {
                    this.props.toggleLoading(false);
                });
        }
    }
    handleDelete = (id) => {
        this.props.toggleLoading(true);
        fetch(`http://localhost:3001/task/${id}`, {
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
                this.props.deleteTask(id);
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                this.props.toggleLoading(false);
            });

    }
    
    removeSelectedTasks = () => {
        this.props.toggleLoading(true);
        fetch("http://localhost:3001/task", {
            method: 'PATCH',
            body: JSON.stringify({ tasks: Array.from(this.props.removeTasks) }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                this.props.deleteCheckedTasks();
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                this.props.toggleLoading(false);
            });

    }
    
    handleToggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }
    componentDidMount() {
        this.props.toggleLoading(true);
        fetch("http://localhost:3001/task")
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                this.props.setTasks(data);
            })
            .catch(error => {
                console.log('error', error);
            })
            .finally(() => {
                this.props.toggleLoading(false);
            });

    }
    render() {
        console.log("Todo", this.props);
        const {
            showModal
        } = this.state;
        const {
            //state
            tasks,
            loading,
            editTask,
            removeTasks,
            isAllChecked,
            openTaskModal,
            //dispatch
            toggleSetRemoveIds,
            toggleCheckAllTasks,
            toggleOpenTaskModal
        } = this.props
        const Tasks = tasks.map((task, index) => {
            return (
                <Col
                    key={task._id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
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
        return (
            <>
                <div>
                    <Container className="todo-list">
                        <h1 className="welcome">To do list</h1>
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
                                    onClick={this.handleToggleModal}
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
                    {showModal && <Confirm
                        handleClose={this.handleToggleModal}
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
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    const {
        tasks,
        loading,
        removeTasks,
        editTask,
        openTaskModal,
        isAllChecked
    } = state.todoState;
    return {
        tasks,
        loading,
        removeTasks,
        editTask,
        openTaskModal,
        isAllChecked
    }
} 
const mapDispatchToProps = (dispatch) => {
    return {
        setTasks: (data) => {
            dispatch({ type: actionTypes.SET_TASKS, data });
        },
        toggleLoading: (isLoading) => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading });
        },
        deleteTask: (_id) => {
            dispatch({ type: actionTypes.DELETE_ONE_TASK, _id });
        },
        addTask: (data) => {
            dispatch({ type: actionTypes.ADD_TASK, data });
        },
        editTaskF: (data) => {
            dispatch({ type: actionTypes.EDIT_TASK, data });
        },
        toggleSetRemoveIds: (_id) => {
            dispatch({ type: actionTypes.TOGGLE_CHECK_TASK, _id });
        },
        deleteCheckedTasks: () => {
            dispatch({ type: actionTypes.DELETE_CHECKED_TASKS });
        },
        toggleCheckAllTasks: () => {
            dispatch({ type: actionTypes.TOGGLE_CHECK_ALL_TASKS });
        },
        toggleOpenTaskModal: (task = null) => {
            dispatch({ type: actionTypes.TOGGLE_OPEN_ADD_TASK_MODAL, task });
        }
    }
}
const ToDoProvider = connect(mapStateToProps,mapDispatchToProps)(ToDo)
export default ToDoProvider;