const GET_ALL_TASKS = 'todoItemsReducer/GET_ALL_TASKS';
const ADD_TASK = 'todoItemsReducer/ADD_TASK';
const UPDATE_TASK = 'todoItemsReducer/UPDATE_TASK';
const DELETE_TASK = 'todoItemsReducer/DELETE_TASK';
const CHECK_ALL_TASKS = 'todoItemsReducer/CHECK_ALL_TASKS';
const DELETE_ALL_CHECKED_TASKS = 'todoItemsReducer/DELETE_ALL_CHECKED_TASKS';

const initialState = {
    todoItems: []
}

const todoItemsReducer = (state=initialState, action) =>{
    switch (action.type) {
        case GET_ALL_TASKS:{

        }
        case ADD_TASK:{

        }
        case UPDATE_TASK:{

        }
        case DELETE_TASK:{

        }
        case CHECK_ALL_TASKS:{

        }
        case DELETE_ALL_CHECKED_TASKS:{

        }
        default: return state
    }
}

const addTaskActionCreator = text => ({type: ADD_TASK, text});
const updateTaskActionCreator = (id, change, isChangeBoolean) => ({type: ADD_TASK, id, change, isChangeBoolean});


export const getAllTasksThunk = () =>{
    return async dispatch =>{

    }
}

export const addTaskThunk = (text) =>{
    return async dispatch =>{

    }
}

export const updateTaskThunk = (id, change, isChangeBoolean) =>{
    return async dispatch =>{

    }
}

export const deleteTaskThunk = (id) =>{
    return async dispatch =>{

    }
}

export const selectAllTasksThunk = (isChecked) =>{
    return async dispatch=>{

    }
}

export const deleteAllCheckedTasksThunk = () =>{
    return async dispatch=>{

    }
}
export default todoItemsReducer;