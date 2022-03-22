import axios from "axios";

const todoURL = 'http://localhost:8000/todo/';
const loginURL = 'http://localhost:8000/login';
const logoutURL = 'http://localhost:8000/logout';
const usersURL = 'http://localhost:8000/users';
axios.defaults.withCredentials = true;

export const tasksAPI = {
    getOneTask(id){
        return axios.get(todoURL + id);
    },
    getAllTasks(pageNum,todosInOnePage){
        return axios.get(todoURL + '?page='+pageNum+'&ammount='+todosInOnePage);
    },
    addTask(text){
        return axios.post(todoURL, text);
    },
    updateTask(id, updates){
        return axios.patch(todoURL+id, updates);
    },
    updateAllIsDone(isSomethingActive, currentPage, tasks_id){
        return axios.patch(todoURL + '?page='+currentPage, {isDone:isSomethingActive, tasks_id});
    },
    deleteTask(id){
        return axios.delete(todoURL+id);
    },
    deleteAllDoneTasks(tasks_id){
        return axios.delete(todoURL, {data:{tasks_id}});
    }
}

export const loginAPI = {
    logIn(username, password){
        return axios.post(loginURL, {username, password});
    },
    logOut(){
        return axios.post(logoutURL);
    }
}

export const usersAPI = {
    createUser(name, username, password){
        return axios.post(usersURL, {name, username, password})
    }
}