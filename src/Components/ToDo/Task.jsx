import { Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import styles from './index.module.css';

const Task = ({ task, handleDelete, toggleSetRemoveIds }) => {
    return (
        <Card className={styles.taskcard}>
            <Form.Check type="checkbox" className="justify-content-end d-flex" onClick={() => toggleSetRemoveIds(task._id)} />
            <Card.Body>
                <Card.Title>{task.title}</Card.Title>

                <Card.Text>
                    {task.text}
                </Card.Text>
                <Button
                    variant="danger"
                    onClick={() => handleDelete(task._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button variant="warning" className="ml-3"><FontAwesomeIcon icon={faEdit} /></Button>
            </Card.Body>
        </Card>

    )

}
export default Task;