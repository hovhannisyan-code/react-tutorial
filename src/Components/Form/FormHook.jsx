import { Form, Button } from "react-bootstrap";
import Preloader from '../Loader/Preloader';
import styles from './form.module.css';
import Notifications, { notify } from 'react-notify-toast';
import { isRequired, maxLength, minLength, emailValidation } from '../helpers/validators';
/**
 * Redux
 */
import { connect } from 'react-redux';
import actionTypes from '../../Redux/actionTypes';
const FormHook = (props) => {


    const handleChange = (e) => { // I can validate in contactReducer js but gesh er 😄 
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
        let data = {
            name,
            value,
            error
        }
        props.changeInput(data);
    }
    const handleAddContactForm = (e) => {
        e.preventDefault();
        props.toggleLoading(true);
        const { name, email, message } = props;
        let formData = {
            name,
            email,
            message
        }
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
                props.addContactForm({
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
                props.toggleLoading(false);
            });
    }
    //const { name, email, message } = formData;
    const {
        name,
        email,
        message,
        loading
    } = props;
    const isValid = name.valid && email.valid && message.valid;
    console.log(props)
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
const mapStateToProps = (state) => {
    const {
        name,
        email,
        message
    } = state.contactFormState;
    return {
        name,
        email,
        message
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeInput: (data) => {
            console.log(data)
            dispatch({ type: actionTypes.CHANGE_CONTACT_FORM, data });
        },
        addContactForm: (data) => {
            dispatch({ type: actionTypes.ADD_CONTACT_FORM, data });
        },
        toggleLoading: (isLoading) => {
            dispatch({ type: actionTypes.TOGGLE_CONTACT_LOADING, isLoading });
        }
    }
}
const FormProvider = connect(mapStateToProps, mapDispatchToProps)(FormHook)
export default FormProvider;