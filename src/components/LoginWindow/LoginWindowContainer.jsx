import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUserThunk } from "../../redux/todoSlice";
import LoginWindow from './LoginWindow'

const LoginWindowContainer = () =>{

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onFormSubmit = (e) =>{
        e.preventDefault();
         dispatch(loginUserThunk({username:email, password}));
    }

        return <LoginWindow email={email} setEmail={setEmail} password={password} setPassword={setPassword} onFormSubmit={onFormSubmit}/>
}

export default LoginWindowContainer;