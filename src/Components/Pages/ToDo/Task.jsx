import React, { memo } from "react";
import styles from './index.module.css';
import { Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Proptypes from 'prop-types';
import DateYMD from '../../helpers/date';
import { Link } from 'react-router-dom';
const Task = ({
    task,
    disabled,
    handleDelete,
    toggleSetRemoveIds,
    checked,
    handleSetEditTask
}) => {
    return (
        <Card className={`rounded border-0 ${styles.custom_card} ${checked && styles.checked}`}>
            <Form.Check
                type="checkbox"
                className="justify-content-end d-flex"
                onChange={() => toggleSetRemoveIds(task._id)}
                checked={checked}
            />
            <Card.Body>
                <Link to={`/task/${task._id}`}>
                    <Card.Title>{task.title}</Card.Title>
                </Link>

                <Card.Text className={styles.cardtext}>
                    {task.description}
                </Card.Text>
                <Card.Text>
                    <Link to={`/task/${task._id}`}>
                        Read More →
                    </Link>
                </Card.Text>
                <Card.Text>
                    End date: {DateYMD(task.date)}
                </Card.Text>
                <Card.Text>
                    Created: {DateYMD(task.created_at)}
                </Card.Text>
                

                <Button
                    disabled={disabled}
                    variant="danger"
                    onClick={() => handleDelete(task._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button
                    disabled={disabled}
                    variant="warning"
                    className="ml-3"
                    onClick={() => handleSetEditTask(task)}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
            </Card.Body>
        </Card>

    )

};
Task.propTypes = {
    task: Proptypes.shape({
        _id: Proptypes.string.isRequired,
        title: Proptypes.string.isRequired,
        description: Proptypes.string.isRequired
    }),
    disabled: Proptypes.bool.isRequired,
    handleDelete: Proptypes.func.isRequired,
    toggleSetRemoveIds: Proptypes.func.isRequired,
    checked: Proptypes.bool.isRequired,
    handleSetEditTask: Proptypes.func.isRequired
}
export default memo(Task);