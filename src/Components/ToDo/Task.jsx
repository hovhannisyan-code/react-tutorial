import React, { memo } from "react";
import styles from './index.module.css';
import { Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Proptypes from 'prop-types';

const Task = ({
    task,
    disabled,
    handleDelete,
    toggleSetRemoveIds,
    checked
}) => {
    return (
        <Card className={`${checked && styles.checked}`}>
            <Form.Check
                type="checkbox"
                className="justify-content-end d-flex"
                onChange={() => toggleSetRemoveIds(task._id)}
                checked={checked}
            />
            <Card.Body>
                <Card.Title>{task.title}</Card.Title>

                <Card.Text>
                    {task.text}
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
                    className="ml-3">
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
            </Card.Body>
        </Card>

    )

};
Task.propTypes = {
    task: Proptypes.object.isRequired,
    disabled: Proptypes.bool.isRequired,
    handleDelete: Proptypes.func.isRequired,
    toggleSetRemoveIds: Proptypes.func.isRequired,
    checked: Proptypes.bool.isRequired
}
export default memo(Task);