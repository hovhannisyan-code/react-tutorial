import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Preloader from '../Loader/Preloader';
import styles from './form.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/**
 * Redux
 */
import { connect } from 'react-redux';
import actionTypes from '../../Redux/actionTypes';
import { addContactFormThunk } from '../../Redux/actions';
const FormHook = (props) => {
    const {
        formData,
        loading,
        responseMessage
    } = props;
    const { name, email, message } = formData;
    const isValid = name.valid && email.valid && message.valid;
    useEffect( () => {
        responseMessage.type && toast[responseMessage.type](`🦄 ${responseMessage.text}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    },[responseMessage]);
    return (
        <>
            <Form onSubmit={(e) => e.preventDefault()}>
                <ToastContainer />
                <Form.Group className={styles.formGroup} controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        onChange={(e) => props.changeInput(e.target)}
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
                        onChange={(e) => props.changeInput(e.target)}
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
                        onChange={(e) => props.changeInput(e.target)}
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
                    onClick={() => props.handleAddContact(formData)}
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
    return {
        formData: state.contactFormState.formData,
        loading: state.todoState.loading,
        responseMessage: state.todoState.message,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeInput: (data) => {
            dispatch({ type: actionTypes.CHANGE_CONTACT_FORM, data });
        },
        addContactForm: () => {
            dispatch({ type: actionTypes.ADD_CONTACT_FORM });
        },
        toggleLoading: (isLoading) => {
            dispatch({ type: actionTypes.TOGGLE_CONTACT_LOADING, isLoading });
        },

        handleAddContact: (formData) => dispatch(addContactFormThunk(formData))
    }
}
const FormProvider = connect(mapStateToProps, mapDispatchToProps)(FormHook)
export default FormProvider;