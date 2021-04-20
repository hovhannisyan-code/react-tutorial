import actionTypes from './actionTypes';
import DateYMD from '../Components/helpers/date';
let API_URL = "";
if (process.env.NODE_ENV === "production") {
  API_URL = "https://suspicious-varahamihira-6cc41d.netlify.app";
} else {
  API_URL = "http://localhost:3001";
}

export const setTasksThunk = () => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
    fetch(`${API_URL}/task`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error;
            }
            dispatch({ type: actionTypes.SET_TASKS, data });
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_MSG, text: 'Get Tasks Request Error', msgType: 'error' });
            console.error("Get Tasks Request Error", error);

        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
        });
}

export const addOrEditTaskThunk = (taskdata) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
    if (taskdata.edit) {
        dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
        fetch(`${API_URL}/task/${taskdata._id}`, {
            method: "PUT",
            body: JSON.stringify(taskdata),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }

                dispatch({ type: actionTypes.EDIT_TASK, data });
                dispatch({ type: actionTypes.TOGGLE_OPEN_ADD_TASK_MODAL, task: null });
                dispatch({ type: actionTypes.SET_MSG, text: 'Task edited successfully', msgType: 'success' });
            })
            .catch(error => {
                console.log(error)
                dispatch({ type: actionTypes.SET_MSG, text: 'Get Tasks Request Error', msgType: 'error' });
            })
            .finally(() => {
                dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
            });
    } else {
        fetch(`${API_URL}/task`, {
            method: 'POST',
            body: JSON.stringify(taskdata),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                dispatch({ type: actionTypes.ADD_TASK, data });
                dispatch({ type: actionTypes.TOGGLE_OPEN_ADD_TASK_MODAL, task: null });
                dispatch({ type: actionTypes.SET_MSG, text: 'Task added successfully', msgType: 'success' });
            })
            .catch(error => {
                console.log('catch Error', error);
                dispatch({ type: actionTypes.SET_MSG, text: error.message, msgType: 'error' });
            })
            .finally(() => {
                dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
            });
    }

}

export const deleteOneTaskThunk = (_id) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
    fetch(`${API_URL}/task/${_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error;
            }
            dispatch({ type: actionTypes.DELETE_ONE_TASK, _id: _id })
            dispatch({ type: actionTypes.SET_MSG, text: 'Task deleted successfully', msgType: 'success' });
        })
        .catch(error => {
            console.log(error)
            dispatch({ type: actionTypes.SET_MSG, text: error.message, msgType: 'error' });
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
        });
}

export const removeAnyTasksThunk = (removeTasks) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
    fetch(`${API_URL}/task`, {
        method: 'PATCH',
        body: JSON.stringify({ tasks: Array.from(removeTasks) }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error;
            }
            dispatch({ type: actionTypes.DELETE_CHECKED_TASKS });
            dispatch({ type: actionTypes.SET_MSG, text: 'Tasks deleted successfully', msgType: 'success' });
        })
        .catch(error => {
            console.log(error)
            dispatch({ type: actionTypes.SET_MSG, text: error.message, msgType: 'error' });
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
        });
}
export const setSingleTaskThunk = (id, history) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_ST_LOADING, loading: true });
    fetch(`${API_URL}/task/${id}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error;
            }
            dispatch({ type: actionTypes.SET_ST, task: data });
            dispatch({ type: actionTypes.TOGGLE_ST_LOADING, loading: false });
        })
        .catch(error => {
            history.push("/404");
            console.log('error', error);
        })
}
export const editSingleTaskThunk = (taskdata) => (dispatch) => {

    taskdata.date = DateYMD(taskdata.date);
    dispatch({ type: actionTypes.TOGGLE_ST_LOADING, loading: true });
    fetch(`${API_URL}/task/${taskdata._id}`, {
        method: "PUT",
        body: JSON.stringify(taskdata),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error;
            }
            dispatch({ type: actionTypes.TOGGLE_ST_MODAL })
            dispatch({ type: actionTypes.SET_ST, task: data });
            dispatch({ type: actionTypes.SET_MSG, text: 'Task edited successfully', msgType: 'success' });
        })
        .catch(error => {
            console.log(error)
            dispatch({ type: actionTypes.SET_MSG, text: error.message, msgType: 'error' });
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_ST_LOADING, loading: false });
        });
}
export const deleteSTThunk = (_id, history) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_ST_LOADING, loading: true });
    fetch(`${API_URL}/task/${_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error;
            }
            dispatch({ type: actionTypes.TOGGLE_ST_LOADING, loading: false });
            history.push("/");
        })
        .catch(error => {
            console.log(error)
            dispatch({ type: actionTypes.SET_MSG, text: error.message, msgType: 'error' });
        })
}
export const toggleSTEditModal = (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_ST_MODAL })
}


export const addContactFormThunk = (formData) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });//Loading Started
    const contactFormData = { ...formData };
    const isValid = contactFormData.name.valid &&
        contactFormData.email.valid &&
        contactFormData.message.valid;

    let error = "";
    if (!contactFormData.name.valid) {
        error = !contactFormData.name.value ? "Field is Required" : contactFormData.name.error;
    } else if (!contactFormData.email.valid) {
        error = !contactFormData.email.value ? "Field is Required" : contactFormData.email.error;
    } else if (!contactFormData.message.valid) {
        error = !contactFormData.message.value ? "Field is Required" : contactFormData.message.error;
    }

    console.log("error", error);
    // setErrorMessage(error);
    if (!isValid) return;

    for (let key in contactFormData) {
        contactFormData[key] = contactFormData[key].value;
    }


    fetch(`${API_URL}/form`, {
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
            dispatch({ type: actionTypes.SET_MSG, text: 'Your message has been sent successfully!', msgType: 'success' });
            dispatch({ type: actionTypes.ADD_CONTACT_FORM });
        })
        .catch(error => {
            console.log(error)
            if (typeof error.message === 'string') {
                error = error.message.replace('.body.', '').toLowerCase();
                error = error.charAt(0).toUpperCase() + error.slice(1);
            }
            dispatch({ type: actionTypes.SET_MSG, text: error, msgType: 'error' });
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });//Loading Started
        });
}

export const toggleStatusThunk = (task) => (dispatch) => {
    const status = task.status === "active" ? "done" : "active";
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
    fetch(`${API_URL}/task/${task._id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: actionTypes.TOGGLE_STATUS_TASK, task: data });
            dispatch({ type: actionTypes.SET_MSG, text: 'Status changed successfully', msgType: 'success' });
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_MSG, text: error, msgType: 'error' });
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
        });
}

export const sortOrFilterTasksThunk = (queryData) => (dispatch) => {
    let query = "?";
    for (let key in queryData) {
        query += key + "=" + queryData[key] + "&";
    }
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
    fetch(`${API_URL}/task` + query.slice(0, query.length - 1))
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: actionTypes.SET_TASKS, data });
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_MSG, text: error, msgType: 'error' });
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
        });
}