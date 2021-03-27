import {  useContext } from 'react';
import { Form, Button } from "react-bootstrap";
import Preloader from '../Loader/Preloader';
import styles from './form.module.css';
import Notifications from 'react-notify-toast';
import { ContactContext } from '../../Context/ContactPageContext';

const FormHook = () => {
    const context = useContext(ContactContext);
    const {
        loading,
        formData,
        handleChange,
        handleAddContactForm
    } = context;
    const { name, email, message } = formData;
    const isValid = name.valid && email.valid && message.valid;
    return (
        <>
            <Form onSubmit={(e) => e.preventDefault()}>
                <Notifications />
                <Form.Group className={styles.formGroup} controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        onChange={handleChange}
                        value={name.value}
                        type="text"
                        placeholder="Name"
                    />
                    <Form.Text className="text-danger">
                        {name.error}
                    </Form.Text>
                </Form.Group>

                <Form.Group className={styles.formGroup} controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="email"
                        onChange={handleChange}
                        value={email.value}
                        type="email"
                        placeholder="Enter email"
                    />
                    <Form.Text className="text-danger">
                        {email.error}
                    </Form.Text>
                </Form.Group>

                <Form.Group className={styles.formGroup} controlId="formBasicMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        name="message"
                        onChange={handleChange}
                        placeholder="Message"
                        value={message.value}
                        as="textarea"
                        rows={3}
                    />
                    <Form.Text className="text-danger">
                        {message.error}
                    </Form.Text>
                </Form.Group>

                <Button
                    disabled={!isValid} //remove disabled 
                    onClick={handleAddContactForm}
                    variant="primary"
                    type="submit">
                    Submit
                </Button>
            </Form>
            {loading && <Preloader />}
        </>
    )
}

export default FormHook;