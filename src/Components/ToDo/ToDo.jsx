import { Component } from "react";
import Task from "./Task";
import AddNewTask from "./AddNewTask";
class ToDo extends Component {
    constructor(props) {
        super();
        this.state = {
            tasks: ['Task1', 'Task2', 'Task3'],
            inputeValue: ''
        }
    }

    handleCatchValue = (inputValue) => {
        this.setState(prevState => ({
            tasks: [...prevState.tasks, inputValue]
        }))
    }
    render() {
        const tasks = this.state.tasks.map((task, index) => {
            return (
                <Task key={index} task={task} />
            )
        })
        return (
            <div className="todo-list">
                <div className="tasks">
                    {tasks}
                </div>
                <AddNewTask onSubmit={this.handleCatchValue} />
            </div>

        )
    }
}
export default ToDo;