import React from "react";

const PersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name" onChange={props.handleInputChange} required />
            <br />
            <label htmlFor="phone">Number: </label>
            <input type="tel" id="phone" name="phone" onChange={props.handleInputChange} required />
            <br />
            <button type="submit">Add</button>
        </form>
    );
};

export default PersonForm;