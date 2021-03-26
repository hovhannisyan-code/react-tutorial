import { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import Preloader from '../Loader/Preloader';
import styles from './form.module.css';
import Notifications, { notify } from 'react-notify-toast';
import { isRequired, maxLength, minLength, emailValidation } from '../helpers/validators';

const FormHook = () => {
    const [formData, setFormData] = useState({
        name: {
            value: "",
            valid: false,
            error: null
        },
        email: {
            value: "",
            valid: false,
            error: null
        },
        message: {
            value: "",
            valid: false,
            error: null
        }
    });
    // loading state
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;
        let error = null;
        const maxLength25 = maxLength(25);
        const minLength3 = minLength(3);

        switch (name) {
            case "name":
            case "message":
                error = isRequired(value) ||
                    minLength3(value) ||
                    maxLength25(value);
                break;
            case "email":
                error = isRequired(value) ||
                    emailValidation(value)
                break;
            default: ;
        }
        setFormData({
            ...formData,
            [name]: {
                value,
                valid: !!!error,
                error
            },
        });
    }
    const handleAddContactForm = (e) => {
        e.preventDefault();
        setLoading(true);
        const contactFormData = { ...formData };
        for (let key in formData) {
            contactFormData[key] = contactFormData[key].value
        }
        fetch("http://localhost:3001/form", {
            method: 'POST',
            body: JSON.stringify(contactFormData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                notify.show('Your message has been sent successfully!', 'success');
                setFormData({
                    name: {
                        value: "",
                        valid: false,
                        error: null
                    },
                    email: {
                        value: "",
                        valid: false,
                        error: null
                    },
                    message: {
                        value: "",
                        valid: false,
                        error: null
                    }
                });
            })
            .catch(error => {
                console.log(error)
                if (typeof error.message === 'string') {
                    error = error.message.replace('.body.', '').toLowerCase();
                    error = error.charAt(0).toUpperCase() + error.slice(1);
                }
                notify.show(error, 'error');
            })
            .finally(() => {
                setLoading(false);
            });
    }
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