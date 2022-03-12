import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tasksAPI } from "../api/axiosAPI";
import { toast } from "react-toastify";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todoItems: [1,2,3]
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasksThunk.fulfilled, (state, action) => {
        state.todoItems = action.payload;
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
      });
  }
});

export const getAllTasksThunk = createAsyncThunk(
  "todos/getAllTasks",
  async () => {
    try {
      const response = await tasksAPI.getAllTasks();
      return response.data;
    } catch (error) {
      toast.error("Sorry, we cannot load data from server, some error...");
      throw new Error('Server error, cannot get tasks');
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
      throw new Error('Server error, can not add new task');
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
      throw new Error('Server error, can not update task');
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
      throw new Error('Server error, can not delete task');
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
      throw new Error('Server error, can not change tasks');
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
      throw new Error('Server error, can not delete tasks');
    }
  }
);

export default todoSlice.reducer;
