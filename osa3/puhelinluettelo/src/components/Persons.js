import React from "react";

const Persons = (props) => {
    // Parsitaan rivit ja otetaan mahdollinen filtteri huomioon
    let filtered = [...props.persons];
    if(props.filter){
        filtered = filtered.filter((person) => {
            return person.name.toLowerCase().includes(props.filter);
        });
    }

    const rows = filtered.map((person) => {
        return (<li key={person.id}>{person.name} {person.number} <button data-id={person.id} type="button" onClick={(e) => props.removeNumber(e.target.getAttribute("data-id"))}>remove</button></li>);
    });

    return (
        <ul>
            {rows}
        </ul>
    );
};

export default Persons;