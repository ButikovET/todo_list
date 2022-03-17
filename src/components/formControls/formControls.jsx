import React from "react";
import classes from "./formControls.module.css";

export const Input = ({ input, meta, ...props }) => {
    const invalidCheck = meta.touched && meta.error;
    return <input {...input} {...props} className={invalidCheck ? classes.error_form : ''} placeholder={!invalidCheck?props.placeholder:props.placeholder+" is required"}/>
}