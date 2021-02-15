import { Component } from "react";
import Task from "./Task";
import AddNewTask from "./AddNewTask";
import {Container, Row, Col} from 'react-bootstrap';
import idGenrator from '../Helpers';

class ToDo extends Component {
    constructor(props) {
        super();
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
                title: "Task 2",
                text: `Some quick example text to build on the card title and make up the bulk of
                the card's content.`
            }
        ];
        for (let i = 0; i < 20; i++ ) {
            tasks.push(`Task ${i+1}`)
        }
        this.state = {
            tasks
        }
    }

    handleCatchValue = (inputValue) => {
        if(!inputValue) return;
        const tasks = [...this.state.tasks];
        tasks.push(inputValue);
        this.setState({
            tasks
        })
    }
    render() {
        const tasks = this.state.tasks.map((task, index) => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3}  className="d-flex justify-content-center mt-3 align-items-center">
                    <Task task={task}/>
                </Col>                
            )
        });
        return (
            <Container className="todo-list">
                <Row className="justify-content-center my-5">
                    <AddNewTask onSubmit={this.handleCatchValue} />
                </Row>
                <Row className="justify-content-center mt-3">
                    {tasks}
                </Row>
            </Container>

        )
    }
}
export default ToDo;