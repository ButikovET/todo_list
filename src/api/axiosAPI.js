import axios from "axios";

const todoURL = 'http://localhost:8000/todo/';
const loginURL = 'http://localhost:8000/login';
axios.defaults.withCredentials = true;

export const tasksAPI = {
    getOneTask(id){
        return axios.get(todoURL + id);
    },
    getAllTasks(){
        return axios.get(todoURL);
    },
    addTask(text){
        return axios.post(todoURL, text);
    },
    updateTask(id, updates){
        return axios.patch(todoURL+id, updates);
    },
    updateAllIsDone(isSomethingActive){
        return axios.patch(todoURL, isSomethingActive);
    },
    deleteTask(id){
        return axios.delete(todoURL+id);
    },
    deleteAllDoneTasks(){
        return axios.delete(todoURL);
    }
}

export const loginAPI = {
    logIn(username, password){
        return axios.post(loginURL, {username, password});
    },
    logOut(){
        return axios.post();
    }
}