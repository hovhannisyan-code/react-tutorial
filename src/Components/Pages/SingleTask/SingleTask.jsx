import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import styles from "./singletask.module.css";
import { Button } from 'react-bootstrap';
import DateYMD from '../../helpers/date';
import Confirm from '../../Modals/Confirm';
class SingleTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            singleTask: null,
            showModal: false
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
                history.push("/");
            })
            .catch(error => {
                console.log(error)
            })

    }
    componentDidMount() {
        const { id } = this.props.match.params;
        fetch(`http://localhost:3001/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                this.setState({
                    singleTask: data
                })
            })
            .catch(error => {
                console.log('error', error);
            })
    }
    render() {
        const { singleTask, showModal } = this.state;
        if (!singleTask) {
            return <div>
                Loading...
                    </div>
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
                        <Button variant="warning" onClick={this.handleEdit}>Edit</Button>
                    </div>
                </div>
                {showModal && <Confirm
                    handleClose={this.handleToggleModal}
                    onSubmit={this.handleDelete}
                    modalTitle={`Are you sure ?`}
                    modalBody={`Do you want to delete ${singleTask.title} task ?`}
                />}
            </div>
        )
    }

}
export default SingleTask;