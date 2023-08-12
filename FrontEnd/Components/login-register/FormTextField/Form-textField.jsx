import React from "react";
import "./style.css"
//todo setup custom attribute for default text.
export default function FormTextField(props) {
    return <input id={props.id} placeholder={props.default_text} type={props.type}></input>
}