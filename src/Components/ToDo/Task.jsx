import styles from './index.module.css';
import { Card } from 'react-bootstrap';
const Task = ({ task }) => {
    return (
        <div className={styles.task}>
            <Card style={{ width: '18rem' }}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>
                        {task.text}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </div>

    )

}
export default Task;