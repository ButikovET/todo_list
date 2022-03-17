import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginWindow = (props) => {
    const onEmailChange = (e) =>{
        props.setEmail(e.target.value);
    }
    const onPasswordChange = (e) =>{
        props.setPassword(e.target.value);
    }

    const loginFailed = useSelector((state) => state.todoSlice.loginFailed);

  return (
    <form onSubmit={props.onFormSubmit} className="container py-4 align-items-start col mt-5 shadow-lg bg-body rounded">
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
        value={props.email}
        onChange={onEmailChange}
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
        value={props.password}
        onChange={onPasswordChange}
          type="password"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Log In
      </button>
      {!!loginFailed&&<h6 style={{color: "red", textAlign: "center"}}>e-mail or password incorrect</h6>}
      <ToastContainer/>
    </form>
  );
};

export default LoginWindow;
