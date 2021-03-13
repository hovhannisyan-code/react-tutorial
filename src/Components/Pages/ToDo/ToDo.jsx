import { Component } from "react";
import Task from './Task';
import { Container, Row, Col, Button } from 'react-bootstrap';
import DateYMD from '../../helpers/date';
import Confirm from '../../Modals/Confirm';
import TaskModal from '../../Modals/TaskModal';


class ToDo extends Component {
    constructor(props) {
        super(props);
        const tasks = [];
        this.state = {
            tasks,
            removeTasks: new Set(),
            isAllChecked: false,
            showModal: false,
            editTask: null,
            openTaskModal: false
        }
    }

    handleCatchValue = (taskdata) => {
        if (!taskdata.title || !taskdata.description) return;
        taskdata.date = DateYMD(taskdata.date);
        const tasks = [...this.state.tasks];
        if (taskdata.edit) {
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
                    console.log(data)
                    const index = tasks.findIndex(task => task._id === data._id);
                    tasks[index] = data;
                    this.setState({
                        tasks
                    })
                })
                .catch(error => {
                    console.log(error)
                })

        } else {
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
                    tasks.push(data);
                    this.setState({
                        tasks
                    });
                })
                .catch(error => {
                    console.log('catch Error', error);
                });
            // tasks.push({
            //     _id: idGenrator(),
            //     title: taskdata.title,
            //     description: taskdata.description
            // });
        }
        this.setState({
            tasks
        });
    }
    handleDelete = (id) => {
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
                let tasks = [...this.state.tasks];
                tasks = tasks.filter(item => item._id !== id)

                this.setState({
                    tasks
                });
            })
            .catch(error => {
                console.log(error)
            })

    }
    toggleSetRemoveIds = (_id) => {
        let removeTasks = new Set(this.state.removeTasks);
        if (removeTasks.has(_id)) {
            removeTasks.delete(_id);
        } else {
            removeTasks.add(_id);
        }
        this.setState({
            removeTasks
        })
    }
    removeSelectedTasks = () => {
        fetch("http://localhost:3001/task", {
            method: 'PATCH',
            body: JSON.stringify({ tasks: Array.from(this.state.removeTasks) }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                let tasks = [...this.state.tasks];
                const { removeTasks, isAllChecked } = this.state;
                tasks = tasks.filter(task => !removeTasks.has(task._id));
                this.setState({
                    tasks,
                    removeTasks: new Set(),
                    isAllChecked: !isAllChecked
                })
            })
            .catch(error => {
                console.log(error)
            })

    }
    handleToggleSelectAll = () => {
        let removeTasks = new Set(this.state.removeTasks);
        let { tasks, isAllChecked } = this.state;
        if (!isAllChecked) {
            tasks.forEach(task => {
                removeTasks.add(task._id);
            })
        } else {
            removeTasks = new Set()
        }

        this.setState({
            removeTasks,
            isAllChecked: !isAllChecked
        })

    }
    handleToggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }
    handleToggleTaskModal = (task) => {
        const editTask = task && task._id ? task : false;
        this.setState({
            editTask: editTask,
            openTaskModal: !this.state.openTaskModal
        });
    }
    componentDidMount() {
        fetch("http://localhost:3001/task")
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                this.setState({
                    tasks: data
                })
            })
            .catch(error => {
                console.log('error', error);
            })

    }
    render() {
        const { removeTasks, isAllChecked, showModal, editTask, openTaskModal } = this.state;
        const tasks = this.state.tasks.map((task, index) => {
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
                        toggleSetRemoveIds={this.toggleSetRemoveIds}
                        checked={removeTasks.has(task._id)}
                        handleSetEditTask={this.handleToggleTaskModal}
                    />
                </Col>
            )
        });
        return (
            <>
                <Container className="todo-list">
                    <h1 className="welcome">To do list</h1>
                    <Row className="justify-content-center my-5">
                        <Col>
                            <Button
                                className="ml-3"
                                variant="primary"
                                onClick={this.handleToggleTaskModal}
                            >
                                Add Task
                            </Button>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-3">
                        {!tasks.length && <div>Tasks is Empty</div>}
                        {tasks}
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            {!!tasks.length && <Button
                                variant="danger"
                                onClick={this.handleToggleModal}
                                disabled={!!!removeTasks.size}
                            >
                                Remove Selected
                        </Button>}
                            {!!tasks.length && <Button
                                className="ml-3"
                                variant="primary"
                                onClick={this.handleToggleSelectAll}
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
                    onHide={this.handleToggleTaskModal}
                    onSubmit={this.handleCatchValue}
                />}
            </>
        )
    }
}
export default ToDo;