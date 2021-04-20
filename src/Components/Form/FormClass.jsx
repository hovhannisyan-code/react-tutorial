import React from 'react';
import { Form, Button } from "react-bootstrap";
import Preloader from '../Loader/Preloader';
import styles from './form.module.css';
import Notifications, {notify} from 'react-notify-toast';
import { isRequired, maxLength, minLength, emailValidation, formValid } from '../helpers/validators';
class ContactForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
            },
            loading: false,
            errorMsg: "",
            formValid: false
        }
        this.inputRef = React.createRef();
    }
    handleAddContactForm = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        const formData = { ...this.state };
        for (let key in formData) {
            formData[key] = formData[key].value
        }
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
                notify.show('Your message has been sent successfully!', 'success');
                this.setState({
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
                    },
                    errorMsg: "",
                    formValid: false
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
                this.setState({
                    loading: false
                });
            });
    }
    handleChange = (e) => {
        
        const { name, value } = e.target;
        let valid = true;
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
        this.setState({
            [name]: {
                value,
                valid:!!!error,
                error
            },
            formValid: formValid(this.state)
        })
    }
    componentDidMount() {
        this.inputRef.current.focus();
    }
    render() {
        const { name,
            email,
            message,
            loading,
            errorMsg,
            formValid
        } = this.state;
        return (
            <>
                <Form onSubmit={(e)=> e.preventDefault()}>
                    <Notifications />
                    <Form.Text className="text-danger">
                        {errorMsg}
                    </Form.Text>
                    <Form.Group className={styles.formGroup} controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name="name"
                            onChange={this.handleChange}
                            value={name.value}
                            type="text"
                            ref={this.inputRef}
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
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
                        disabled={!formValid} //remove disabled 
                        onClick={this.handleAddContactForm}
                        variant="primary"
                        type="submit">
                        Submit
                    </Button>
                </Form>
                {loading && <Preloader />}
            </>
        )
    }
}

export default ContactForm;