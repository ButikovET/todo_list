import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DragDrop from "./DragDrop";

const LoginWindow = (props) => {
  const onNameChange = (e) => {
    props.setName(e.target.value);
  };
  const onEmailChange = (e) => {
    props.setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    props.setPassword(e.target.value);
  };
  const onConfirmPasswordChange = (e) => {
    props.setConfirmPassword(e.target.value);
  };
  const [signUp, setSignUp] = useState(false);

  const loginFailed = useSelector((state) => state.todoSlice.loginFailed);

  return (
    <>
      {!signUp && (
        <form
          onSubmit={props.onLogIn}
          className="position-relative container py-4 align-items-start col mt-5 shadow-lg bg-body rounded"
        >
          <div className="mb-3">
            <h3>Log In</h3>
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              value={props.email}
              onChange={onEmailChange}
              placeholder="Enter your email here"
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
              placeholder="Enter your password here"
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
          <button
            type="submit"
            className="btn btn-primary float-start after-submit"
          >
            Log In
          </button>
          <span className="ms-3">or</span>
          <span
            className="btn signup"
            onClick={() => {
              setSignUp(true);
            }}
          >
            Sign Up
          </span>
          {!!loginFailed && (
            <h6 style={{ color: "red", textAlign: "center" }}>
              email or password - incorrect
            </h6>
          )}
          <ToastContainer />
        </form>
      )}

      {!!signUp && (
        <form
          onSubmit={props.signUpUser}
          className="position-relative container py-4 align-items-start col mt-5 shadow-lg bg-body rounded"
        >
          <h3>Registration</h3>

          <div className="row mb-3">
            <label htmlFor="inputName3" className="col-sm-2 col-form-label">
              Name*
            </label>
            <div className="col-sm-10">
              <input
                required={true}
                type="text"
                className="form-control"
                placeholder="Add your name here"
                id="inputName3"
                value={props.name}
                onChange={onNameChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Email*
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email here"
                id="inputEmail3"
                value={props.email}
                onChange={onEmailChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Password*
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                placeholder="Create new password here"
                id="inputPassword3"
                value={props.password}
                onChange={onPasswordChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="confirmPassword3"
              className="col-sm-2 col-form-label"
            >
              Confirm Password*
            </label>
            <div className="col-sm-10">
              <input
                value={props.confirmPassword}
                placeholder="Confirm password here"
                type="password"
                className="form-control"
                id="confirmPassword3"
                onChange={onConfirmPasswordChange}
              />
            </div>           
          </div>
          <div className="row mb-3">
          <label
              htmlFor="photo"
              className="col-sm-2 col-form-label"
            >
              Upload Photo
              
            </label>
            <DragDrop setPhoto={props.setPhoto}/>
          </div>
          <button
            type="submit"
            className="btn btn-primary float-start after-submit"
          >
            Sign In
          </button>
          <span className="ms-3">or if you have an account:</span>
          <span
            className="btn signup"
            onClick={() => {
              setSignUp(false);
            }}
          >
            Log In
          </span>
          <ToastContainer />
        </form>
      )}
    </>
  );
};

export default LoginWindow;
