import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import styles from "./singletask.module.css";
import { Button } from 'react-bootstrap';
import DateYMD from '../../helpers/date';
import Confirm from '../../Modals/Confirm';
import TaskModal from '../../Modals/TaskModal';
import Preloader from "../../Loader/Preloader";

class SingleTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            singleTask: null,
            showModal: false,
            openTaskModal: false,
            loading: false
        }
    }
    handleToggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }
    handleDelete = () => {
        const { _id } = this.state.singleTask;
        const { history } = this.props;
        this.setState({
            loading: true
        });
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
                this.setState({
                    loading: false
                });
                history.push("/");
            })
            .catch(error => {
                console.log(error)
            })

    }
    handleToggleTaskModal = () => {
        this.setState({
            openTaskModal: !this.state.openTaskModal
        });
    }
    handleCatchValue = (taskdata) => {
        if (!taskdata.title || !taskdata.description) return;
        console.log('taskdata',taskdata)
        taskdata.date = DateYMD(taskdata.date);
        this.setState({
            loading: true
        });
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
                
                this.setState({
                    singleTask: data
                });
                this.handleToggleTaskModal();
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                this.setState({
                    loading: false
                });
            });
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        this.setState({
            loading: true
        });
        fetch(`http://localhost:3001/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                this.setState({
                    singleTask: data,
                    loading: false
                })
            })
            .catch(error => {
                const { history } = this.props;
                history.push("/404");
                console.log('error', error);
            })
            .finally(() => {
                this.setState({
                    loading: false
                });
            });
    }
    render() {
        const {
            singleTask,
            showModal,
            openTaskModal,
            loading
        } = this.state;
        if (!singleTask) { // todo check error from server
            return  <Preloader />
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
                        <Button variant="danger" onClick={this.handleToggleModal} className="mr-2">Delete</Button>
                        <Button variant="warning" onClick={this.handleToggleTaskModal}>Edit</Button>
                    </div>
                </div>
                {showModal && <Confirm
                    handleClose={this.handleToggleModal}
                    onSubmit={this.handleDelete}
                    modalTitle={`Are you sure ?`}
                    modalBody={`Do you want to delete ${singleTask.title} task ?`}
                />}
                {openTaskModal && <TaskModal
                    editTask={singleTask}
                    onHide={this.handleToggleTaskModal}
                    onSubmit={this.handleCatchValue}
                />}
                {loading && <Preloader />}
            </div>
        )
    }

}
export default SingleTask;