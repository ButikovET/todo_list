import "./App.css";
import TodoFrame from "./components/TodoFrame";
import LoginWindowContainer from "./components/LoginWindow/LoginWindowContainer";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasksThunk } from "./redux/todoSlice";
import { useEffect } from "react";

function App() {

  const isAuth = useSelector((state) => state.todoSlice.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllTasksThunk())
  },[]);

  console.log(isAuth)

  return (
    isAuth?<TodoFrame/>:<LoginWindowContainer/>
  );
}

export default App;
