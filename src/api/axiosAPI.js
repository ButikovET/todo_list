import axios from "axios";

const baseURL = 'http://localhost:8000/todo/';

export const tasksAPI = {
    getOneTask(id){
        return axios.get(baseURL + id);
    },
    getAllTasks(){
        return axios.get(baseURL);
    },
    addTask(text){
        return axios.post(baseURL, text);
    },
    updateTask(id, updates){
        return axios.patch(baseURL+id, updates);
    },
    updateAllIsDone(isSomethingActive){
        return axios.patch(baseURL, isSomethingActive);
    },
    deleteTask(id){
        return axios.delete(baseURL+id);
    },
    deleteAllDoneTasks(){
        return axios.delete(baseURL);
    }
}