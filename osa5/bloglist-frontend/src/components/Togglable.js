import React, { useState } from "react";
import propTypes from "prop-types";

const Togglable = (props) => {
    const [visible,setVisible] = useState(false);

    const toggle = () => {
        setVisible(!visible);
    };

    // Tyylit
    const hideWhenVisible = {
        display: (visible) ? "none" : "block"
    };
    const showWhenVisible = {
        display: (visible) ? "block" : "none"
    };

    return (
        <div>
            <div style={hideWhenVisible}>
                <button type="button" onClick={toggle}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <br />
                <button type="button" onClick={toggle}>Cancel</button>
            </div>
        </div>
    );
};
Togglable.propTypes = {
    buttonLabel: propTypes.string.isRequired
};

export default Togglable;