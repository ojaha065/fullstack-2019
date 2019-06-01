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
        return (<li key={person.phone}>{person.name} {person.phone}</li>);
    });

    return (
        <ul>
            {rows}
        </ul>
    );
};

export default Persons;