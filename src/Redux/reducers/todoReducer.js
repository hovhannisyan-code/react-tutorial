import actionTypes from '../actionTypes';
const initialState = {

    tasks: [],
    editTask: null,
    loading: false,
    removeTasks: new Set(),
    isAllChecked: false,
    openTaskModal: false,
    isConfirmModal: false,
    message: {
        type: "",
        text: ""
    }

};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TASKS: {
            return {
                ...state,
                tasks: action.data
            }
        }
        case actionTypes.SET_MSG: {
            return {
                ...state,
                message: {
                    type: action.msgType,
                    text: action.text
                }
            }
        }
        case actionTypes.TOGGLE_LOADING: {
            return {
                ...state,
                loading: action.isLoading,
                errorMsg: action.isLoading ? "" : state.errorMsg
            }
        }
        case actionTypes.TOGGLE_STATUS_TASK: {
            let tasks = [...state.tasks];
            const idx = tasks.findIndex(task => task._id === action.task._id);
            tasks[idx] = action.task;
            return {
                ...state,
                tasks
            }
        }
        case actionTypes.DELETE_ONE_TASK: {
            let tasks = [...state.tasks];
            tasks = tasks.filter(item => item._id !== action._id);
            return {
                ...state,
                tasks
            }
        }
        case actionTypes.ADD_TASK: {
            let tasks = [...state.tasks];
            tasks.push(action.data);
            return {
                ...state,
                tasks
            }
        }
        case actionTypes.EDIT_TASK: {
            let tasks = [...state.tasks];
            const { data } = action;
            const idx = tasks.findIndex(task => task._id === data._id);
            tasks[idx] = data;
            return {
                ...state,
                tasks
            }
        }
        case actionTypes.TOGGLE_CHECK_TASK: {
            const { _id } = action;
            let removeTasks = new Set(state.removeTasks);
            if (removeTasks.has(_id)) {
                removeTasks.delete(_id);
            } else {
                removeTasks.add(_id);
            }
            return {
                ...state,
                removeTasks
            }

        }
        case actionTypes.DELETE_CHECKED_TASKS: {
            let tasks = [...state.tasks];
            const { removeTasks } = state;
            tasks = tasks.filter(task => !removeTasks.has(task._id));
            return {
                ...state,
                tasks,
                removeTasks: new Set()
            }
        }
        case actionTypes.TOGGLE_CHECK_ALL_TASKS: {
            const { tasks, isAllChecked } = state;
            let removeTasks = new Set();
            if (!isAllChecked) {
                tasks.forEach(task => {
                    removeTasks.add(task._id);
                });
            };
            return {
                ...state,
                removeTasks,
                isAllChecked: !isAllChecked
            }

        }
        case actionTypes.TOGGLE_OPEN_ADD_TASK_MODAL: {
            const { task } = action;
            const editTask = task && task._id ? task : false;
            console.log(editTask)
            return {
                ...state,
                editTask: editTask,
                openTaskModal: !state.openTaskModal
            }
        }
        case actionTypes.TOGGLE_CONFIRM_MODAL: {
            return {
                ...state,
                isConfirmModal: !state.isConfirmModal
            }
        }

        
        default: return state;
    }
}

export default reducer;