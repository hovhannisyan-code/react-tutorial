import React from 'react';
import { Form, Button } from "react-bootstrap";
import Preloader from '../Loader/Preloader';
import styles from './form.module.css';

class ContactForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            message: "",
            loading: false
        }
        this.inputRef = React.createRef();
    }
    handleAddContactForm = (e) => {
        this.setState({
            loading: true
        });
        e.preventDefault();
        const formData = this.state;
        fetch("http://localhost:3001/form", {
            method: 'POST',
            body: JSON.stringify(formData),
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
                    name: "",
                    email: "",
                    message: ""
                });
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
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    render() {
        const { name, email, message, loading } = this.state;
        return (
            <>
                <Form>
                    <Form.Group className={styles.formGroup} controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name="name"
                            onChange={this.handleChange}
                            value={name}
                            type="text"
                            ref={this.inputRef}
                            placeholder="Name"
                        />
                    </Form.Group>

                    <Form.Group className={styles.formGroup} controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name="email"
                            onChange={this.handleChange}
                            value={email}
                            type="email"
                            placeholder="Enter email"
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className={styles.formGroup} controlId="formBasicMessage">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            name="message"
                            onChange={this.handleChange}
                            value={message}
                            as="textarea"
                            rows={3}
                        />
                    </Form.Group>

                    <Button onClick={this.handleAddContactForm} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                {loading && <Preloader />}
            </>
        )
    }
}

export default ContactForm;