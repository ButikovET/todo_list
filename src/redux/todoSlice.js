import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginAPI, tasksAPI, usersAPI } from "../api/axiosAPI";
import { toast } from "react-toastify";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todoItems: [],
    isLoggedIn: false,
    loginFailed: false,
    name: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasksThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoggedIn = true;
          state.todoItems = action.payload.todoItems;
          state.name = action.payload.name;
        }
      })
      .addCase(addTaskThunk.fulfilled, (state, action) => {
        state.todoItems = [...state.todoItems, action.payload];
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        const newTaskArray = state.todoItems.map((el) => {
          return el._id === action.payload.id
            ? { ...el, ...action.payload.changes }
            : el;
        });
        state.todoItems = newTaskArray;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.todoItems = state.todoItems.filter(
          (el) => el._id !== action.payload
        );
      })
      .addCase(selectAllTasksThunk.fulfilled, (state, action) => {
        const newTaskArray = state.todoItems.map((el) => {
          el.isDone = action.payload;
          return el;
        });
        state.todoItems = newTaskArray;
      })
      .addCase(deleteAllCheckedTasksThunk.fulfilled, (state) => {
        state.todoItems = state.todoItems.filter((el) => !el.isDone);
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        if (action.payload === "ok") {
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
      });
  },
});

export const getAllTasksThunk = createAsyncThunk(
  "todos/getAllTasks",
  async () => {
    try {
      const response = await tasksAPI.getAllTasks();
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
  async (text) => {
    try {
      const resposne = await tasksAPI.addTask({ text });
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
      await tasksAPI.deleteTask(id);
      toast.success("Task has been deleted");
      return id;
    } catch (error) {
      toast.error("Can not delete task, server error: " + error);
      throw new Error("Server error, can not delete task");
    }
  }
);

export const selectAllTasksThunk = createAsyncThunk(
  "todos/selectAllTasksThunk",
  async (isDone) => {
    try {
      await tasksAPI.updateAllIsDone({ isDone });
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
  async () => {
    try {
      await tasksAPI.deleteAllDoneTasks();
      toast.success("All completed tasks have been deleted");
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
      await loginAPI.logIn(username, password);
      return "ok";
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
  async ({ name, username, password }) => {
    try {
      await usersAPI.createUser(name, username, password);
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
    } catch (error) {
      const err = (error + "").split(" ");
      if (err[err.length - 1] === "500") {
        toast.error("User with username: '"+username+"' allready exists", {
          autoClose: 10 ** 10,
          hideProgressBar: true,
        });
      }
      else toast.error("Can not log out, server error: " + error);
      throw new Error("Server error, can not log out");
    }
  }
);

export default todoSlice.reducer;
