import { Component } from "react";
import Task from "./Task";
import AddNewTask from "./AddNewTask";
import { Container, Row, Col, Button } from 'react-bootstrap';
import idGenrator from '../Helpers';

class ToDo extends Component {
    constructor(props) {
        super(props);
        const tasks = [
            {
                _id: idGenrator(),
                title: "Task 1",
                text: `Some quick example text to build on the card title and make up the bulk of
                the card's content.`
            },
            {
                _id: idGenrator(),
                title: "Task 2",
                text: `Some quick example text to build on the card title and make up the bulk of
                the card's content.`
            },
            {
                _id: idGenrator(),
                title: "Task 3",
                text: `Some quick example text to build on the card title and make up the bulk of
                the card's content.`
            }
        ];
        // for (let i = 0; i < 20; i++ ) {
        //     tasks.push(`Task ${i+1}`)
        // }
        this.state = {
            tasks,
            removeTasks: new Set(),
            isAllChecked: false
        }
    }

    handleCatchValue = (inputValue) => {
        if (!inputValue) return;
        const tasks = [...this.state.tasks];
        tasks.push({
            _id: idGenrator(),
            title: inputValue,
            text: `Some quick example text to build on the card title and make up the bulk of
            the card's content.`
        });
        this.setState({
            tasks
        })
    }
    handleDelete = (id) => {
        let tasks = [...this.state.tasks];
        tasks = tasks.filter(item => item._id !== id)

        this.setState({
            tasks
        });
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
        let tasks = [...this.state.tasks];
        const { removeTasks, isAllChecked } = this.state;
        tasks = tasks.filter(task => !removeTasks.has(task._id));
        this.setState({
            tasks,
            removeTasks: new Set(),
            isAllChecked: !isAllChecked
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
    render() {
        const { removeTasks, isAllChecked } = this.state;
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
                    />
                </Col>
            )
        });
        return (
            <Container className="todo-list">
                <Row className="justify-content-center my-5">
                    <Col>
                        <AddNewTask disabled={!!removeTasks.size} onSubmit={this.handleCatchValue} />
                    </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                    {tasks}
                </Row>
                <Row className="mt-5">
                    <Col>
                        {!!tasks.length && <Button
                            variant="danger"
                            onClick={this.removeSelectedTasks}
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

        )
    }
}
export default ToDo;