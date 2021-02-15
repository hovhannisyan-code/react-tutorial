import { Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
// import styles from './index.module.css';

const Task = ({ task, handleDelete }) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Form.Check type="checkbox" className="justify-content-end d-flex" />
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
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