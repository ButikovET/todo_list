import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUserThunk, createUserThunk } from "../../redux/todoSlice";
import LoginWindow from "./LoginWindow";
import { toast } from "react-toastify";

const LoginWindowContainer = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState("");

  const onLogIn = (e) => {
    e.preventDefault();
    dispatch(loginUserThunk({ username: email, password }));
  };

  const signUpUser = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password and Confirm password are not equal");
      setConfirmPassword("");
    } else if (!name.trim()) {
      toast.warn("Field 'Name' is mandatory");
      setName("");
    } else {
      const  reader = new FileReader();
      reader.onload = (e) => {
        dispatch(createUserThunk({ name, username: email, password, photo:e.target.result }))
        console.log(e.target.result);
      };
      reader.onerror = (e) => {
        console.log("Error : " + e.type);
      };
      reader.readAsBinaryString(photo)
    }
  };
  return (
    <LoginWindow
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      onLogIn={onLogIn}
      signUpUser={signUpUser}
      setPhoto={setPhoto}
    />
  );
};

export default LoginWindowContainer;
