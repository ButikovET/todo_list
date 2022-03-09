import { tasksAPI } from "../api/axiosAPI";
import { toast } from "react-toastify";

const GET_ALL_TASKS = "todoItemsReducer/GET_ALL_TASKS";
const ADD_TASK = "todoItemsReducer/ADD_TASK";
const UPDATE_TASK = "todoItemsReducer/UPDATE_TASK";
const DELETE_TASK = "todoItemsReducer/DELETE_TASK";
const CHECK_ALL_TASKS = "todoItemsReducer/CHECK_ALL_TASKS";
const DELETE_ALL_CHECKED_TASKS = "todoItemsReducer/DELETE_ALL_CHECKED_TASKS";

const initialState = {
  todoItems: [],
};

const todoItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TASKS: {
      return { ...state, todoItems: action.tasks };
    }
    case ADD_TASK: {
      return { ...state, todoItems: [...state.todoItems, action.task] };
    }
    case UPDATE_TASK: {
      const newTaskArray = state.todoItems.map((el) => {
        return el._id === action.id 
            ? {...el, ...action.change} 
            : el;
      });
      return { ...state, todoItems: newTaskArray };
    }
    case DELETE_TASK: {
      return {
        ...state,
        todoItems: state.todoItems.filter((el) => el._id !== action.id),
      };
    }
    case CHECK_ALL_TASKS: {
      const newTaskArray = state.todoItems.map((el) => {
        el.isDone = action.isDone;
        return el;
      });
      return { ...state, todoItems: newTaskArray };
    }
    case DELETE_ALL_CHECKED_TASKS: {
      return {
        ...state,
        todoItems: state.todoItems.filter((el) => !el.isDone),
      };
    }
    default:
      return state;
  }
};

const getAllTasksActionCreator = (tasks) => ({ type: GET_ALL_TASKS, tasks });
const addTaskActionCreator = (task) => ({ type: ADD_TASK, task });
const updateTaskActionCreator = (id, change) => ({ type: UPDATE_TASK, id, change });
const selectAllTasksActionCreator = (isDone) => ({type: CHECK_ALL_TASKS, isDone});
const deleteAllCheckedTasksActionCreator = () => ({type: DELETE_ALL_CHECKED_TASKS});
const deleteSingleTaskActionCreator = (id) => ({ type: DELETE_TASK, id });

export const getAllTasksThunk = () => {
  return async (dispatch) => {
    tasksAPI
      .getAllTasks()
      .then((response) => dispatch(getAllTasksActionCreator(response.data)))
      .catch((error) =>
        toast.error("Can not add new task, server error: " + error)
      );
  };
};

export const addTaskThunk = (text) => {
  return async (dispatch) => {
    try {
      const resposne = await tasksAPI.addTask({ text });
      toast.success("New task added");
      dispatch(addTaskActionCreator(resposne.data));
    } catch (error) {
      toast.error("Can not add new task, server error: " + error);
    }
  };
};

export const updateTaskThunk = (id, change) => {
  return async (dispatch) => {
    try {
      await tasksAPI.updateTask(
        id,
        change
      );
      toast.success("Task successfully changed");
      dispatch(updateTaskActionCreator(id, change));
    } catch (error) {
      toast.error("Can not add new task, server error: " + error);
    }
  };
};

export const deleteTaskThunk = (id) => {
  return async (dispatch) => {
    try {
      await tasksAPI.deleteTask(id);
      toast.success("Task has been deleted");
      dispatch(deleteSingleTaskActionCreator(id));
    } catch (error) {
      toast.error("Can not add new task, server error: " + error);
    }
  };
};

export const selectAllTasksThunk = (isDone) => {
  return async (dispatch) => {
    try {
      await tasksAPI.updateAllIsDone({ isDone });
      toast.success("All tasks successfully changed");
      dispatch(selectAllTasksActionCreator(isDone));
    } catch (error) {
      toast.error("Can not add new task, server error: " + error);
    }
  };
};

export const deleteAllCheckedTasksThunk = () => {
  return async (dispatch) => {
    try {
      await tasksAPI.deleteAllDoneTasks();
      toast.success("All completed tasks have been deleted");
      dispatch(deleteAllCheckedTasksActionCreator());
    } catch (error) {
      toast.error("Can not add new task, server error: " + error);
    }
  };
};
export default todoItemsReducer;
