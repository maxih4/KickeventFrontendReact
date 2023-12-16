import React from 'react';

const SubmitButton = (props) => {
    return (
        <button type="submit" className="rounded-pill mt-4" style={{
            backgroundColor: "#77BB41",
            borderColor: "#77BB41",
            borderStyle: "solid",
            fontFamily: "Outfit",
            fontSize: props.size,
            textShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",
            boxShadow:"0px 8px 15px rgba(0, 0, 0, 0.35)"
        }}>

            <div className={props.class} >{props.text}</div>
        </button>
    );
};

export default SubmitButton;