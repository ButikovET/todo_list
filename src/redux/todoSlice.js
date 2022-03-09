import { configureStore, createSlice } from "@reduxjs/toolkit";


const sliceTodo = createSlice({
        name: 'allTasks',
        initialState:{todoItems: []},
        reducers: {
            getAllTasks(state, action){
                tasksAPI
      .getAllTasks()
      .then((response) => dispatch(getAllTasksActionCreator(response.data)))
      .catch((error) =>
        toast.error("Can not add new task, server error: " + error)
      );
                state.todoItems = action.payload.tasks
            }
        },
    })

export const {getAllTasks} = sliceTodo.actions;
export default sliceTodo.reducer;
