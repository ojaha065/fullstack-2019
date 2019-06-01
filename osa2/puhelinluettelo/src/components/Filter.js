import React from "react";

const Filter = ({handleInputChange}) => {
    return (
        <div>
            <label htmlFor="filter">Filter shown with</label>
            <input type="text" id="filter" name="filter" onChange={handleInputChange} />
        </div>
    );
};

export default Filter;