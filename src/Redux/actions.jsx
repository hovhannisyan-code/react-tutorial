import actionTypes from './actionTypes';

export const setTasksThunk = () => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
    fetch("http://localhost:3001/task")
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error;
            }
            dispatch({ type: actionTypes.SET_TASKS, data });
        })
        .catch(error => {
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
        fetch(`http://localhost:3001/task/${taskdata._id}`, {
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
            })
            .catch(error => {
                console.log(error)
                // todo notify
            })
            .finally(() => {
                dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
            });
    } else {
        fetch("http://localhost:3001/task", {
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
            })
            .catch(error => {
                console.log('catch Error', error);
            })
            .finally(() => {
                dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
            });
    }

}

export const deleteOneTaskThunk = (_id) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
    fetch(`http://localhost:3001/task/${_id}`, {
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
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
        });
}

export const removeAnyTasksThunk = (removeTasks) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
    fetch("http://localhost:3001/task", {
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
            dispatch({ type: actionTypes.DELETE_CHECKED_TASKS});
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
        });
}