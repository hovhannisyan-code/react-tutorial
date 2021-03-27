import { createContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { notify } from 'react-notify-toast';
import { isRequired, maxLength, minLength, emailValidation } from '../Components/helpers/validators';
export const ContactContext = createContext();

const ContactContextProvider = (props) => {
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
    return <ContactContext.Provider
        value={
            {
                loading,
                formData,
                handleChange,
                handleAddContactForm
            }
        }
    >
        {props.children}
    </ContactContext.Provider>
}
export default withRouter(ContactContextProvider);