import React from "react";

const PersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name" onChange={props.handleInputChange} required />
            <br />
            <label htmlFor="number">Number: </label>
            <input type="tel" id="number" name="number" onChange={props.handleInputChange} required />
            <br />
            <button type="submit">Add</button>
        </form>
    );
};

export default PersonForm;