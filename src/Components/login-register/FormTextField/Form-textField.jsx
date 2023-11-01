import React from "react";
//todo setup custom attribute for default text.
export default function FormTextField(props) {
    return <input className="field" id={props.id} placeholder={props.default_text} type={props.type}></input>
}