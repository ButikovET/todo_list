import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginAPI, tasksAPI, usersAPI } from "../api/axiosAPI";
import { toast } from "react-toastify";
import axios from "axios";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todoItems: [],
    isLoggedIn: false,
    loginFailed: false,
    totalPages: 1,
    currentPage: 1,
    todosInOnePage: 5,
    totalItems: 0,
    name: ""
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasksThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoggedIn = true;
          state.todoItems = action.payload.todoItems;
          state.name = action.payload.name;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.currentPage;
          state.todosInOnePage = action.payload.todosInOnePage;
        }
      })
      .addCase(addTaskThunk.fulfilled, (state, action) => {
        const newArray = [...state.todoItems];
        newArray.unshift(action.payload.newItem);
        if (newArray.length > state.todosInOnePage) newArray.pop();
        state.todoItems = newArray;
        state.totalPages = Math.ceil(
          action.payload.totalItems / state.todosInOnePage
        );
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        const newTaskArray = state.todoItems.map((el) => {
          return el._id === action.payload.id
            ? { ...el, ...action.payload.changes }
            : el;
        });
        newTaskArray.sort(function(a,b){
          return new Date(b.updatedAt) - new Date(a.updatedAt)
        })
        state.todoItems = newTaskArray;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.todoItems = state.todoItems.filter(
          (el) => el._id !== action.payload.deletedItem._id
        );
        state.totalPages = Math.ceil(
          action.payload.totalItems / state.todosInOnePage
        );
      })
      .addCase(selectAllTasksThunk.fulfilled, (state, action) => {
        const newTaskArray = state.todoItems.map((el) => {
          el.isDone = action.payload;
          return el;
        });
        state.todoItems = newTaskArray;
      })
      .addCase(deleteAllCheckedTasksThunk.fulfilled, (state, action) => {
        state.todoItems = state.todoItems.filter((el) => !el.isDone);
        state.totalPages = Math.ceil(
          action.payload.totalItems / state.todosInOnePage
        );
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.loginFailed = false;
          state.isLoggedIn = true;
        } else {
          state.loginFailed = true;
          state.isLoggedIn = false;
        }
      })
      .addCase(logOutUserThunk.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.loginFailed = false;
        state.totalPages = 1;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) =>{
        state.name = action.payload.name;
      })
  },
});

export const getAllTasksThunk = createAsyncThunk(
  "todos/getAllTasks",
  async ({ pageNum, todosInOnePage }) => {
    try {
      const response = await tasksAPI.getAllTasks(pageNum, todosInOnePage);
      return response.data;
    } catch (error) {
      const err = (error + "").split(" ");
      if (err[err.length - 1] === "401") {
        toast.info("Please enter your e-mail and password");
      } else {
        toast.error("Sorry, we cannot load data from server, some error...");
        throw new Error("Server error, cannot get tasks");
      }
    }
  }
);

export const addTaskThunk = createAsyncThunk(
  "todos/addTaskThunk",
  async (text, pageNum) => {
    try {
      const resposne = await tasksAPI.addTask({ text, pageNum });
      toast.success("New task added");
      return resposne.data;
    } catch (error) {
      toast.error("Can not add new task, server error: " + error);
      throw new Error("Server error, can not add new task");
    }
  }
);

export const updateTaskThunk = createAsyncThunk(
  "todos/updateTaskThunk",
  async (changes) => {
    try {
      await tasksAPI.updateTask(changes.id, changes.changes);
      toast.success("Task successfully changed");
      return changes;
    } catch (error) {
      toast.error("Can not change task, server error: " + error);
      throw new Error("Server error, can not update task");
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "todos/deleteTaskThunk",
  async (id) => {
    try {
      const response = await tasksAPI.deleteTask(id);
      toast.success("Task has been deleted");
      return response.data;
    } catch (error) {
      toast.error("Can not delete task, server error: " + error);
      throw new Error("Server error, can not delete task");
    }
  }
);

export const selectAllTasksThunk = createAsyncThunk(
  "todos/selectAllTasksThunk",
  async ({ isDone, currentPage, tasks_id }) => {
    try {
      await tasksAPI.updateAllIsDone(isDone, currentPage, tasks_id);
      toast.success("All tasks successfully changed");
      return isDone;
    } catch (error) {
      toast.error("Can not change tasks, server error: " + error);
      throw new Error("Server error, can not change tasks");
    }
  }
);

export const deleteAllCheckedTasksThunk = createAsyncThunk(
  "todos/deleteAllCheckedTasksThunk",
  async (tasks_id) => {
    try {
      const response = await tasksAPI.deleteAllDoneTasks(tasks_id);
      toast.success("All completed tasks have been deleted");
      return response.data;
    } catch (error) {
      toast.error("Can not delete tasks, server error: " + error);
      throw new Error("Server error, can not delete tasks");
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "todos/loginUserThunk",
  async ({ username, password }) => {
    try {
      const response = await loginAPI.logIn(username, password);
      localStorage.setItem('todo_photo', 'data:image/jpeg;base64,'+ btoa(response.data.photo));
      localStorage.setItem('todo_cropped_photo', 'data:image/jpeg;base64,'+ btoa(response.data.croppedPhoto));
      return response.data;
    } catch (error) {
      toast.error("Oops... Email of password are incorrect. Please try again");
    }
  }
);

export const logOutUserThunk = createAsyncThunk(
  "todos/logOutUserThunk",
  async () => {
    try {
      await loginAPI.logOut();
    } catch (error) {
      toast.error("Can not log out, server error: " + error);
      throw new Error("Server error, can not log out");
    }
  }
);

export const createUserThunk = createAsyncThunk(
  "todos/createUserThunk",
  async ({ name, username, password, photo }) => {
    try {
      const response = await usersAPI.createUser(name, username, password, photo);
      toast.success(
        "Dear " +
          name +
          ", thank your for registation, now you can login in system"
      );
      toast.info("Your username: " + username, {
        autoClose: 10 ** 10,
        hideProgressBar: true,
      });
      toast.info("Your password: " + password, {
        autoClose: 10 ** 10,
        hideProgressBar: true,
      });
      return response.data;
    } catch (error) {
      const err = (error + "").split(" ");
      if (err[err.length - 1] === "500") {
        toast.error("User with username: '" + username + "' allready exists", {
          autoClose: 10 ** 10,
          hideProgressBar: true,
        });
      } else toast.error("Can not log out, server error: " + error);
      throw new Error("Server error, can not log out");
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'todos/updateUserThunk',
  async (updates) => {
    try {
      const response = await usersAPI.updateUser(updates);
      toast.success('Your data updated successfully')
      return response.data
    } catch (error) {
      toast.err('Can not update data, server error')
    }
  }
)

export default todoSlice.reducer;
