import { Component } from "react";
import Task from "./Task";
class ToDo extends Component {
    constructor(props) {
        super();
        this.state = {
            tasks: ['Task1', 'Task2', 'Task3']
        }
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
                <div>
                    <input type="text" name="task_name" />
                    <button>Add Task</button>
                </div>
            </div>

        )
    }
}
export default ToDo;