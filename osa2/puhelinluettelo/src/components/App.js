import React, { useState } from "react";

import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
    // Tilat
    const [persons,setPersons] = useState([
        {
            name: "Jani Haiko",
            phone: "0445551234"
        },
        {
            name: "Matti Meikäläinen",
            phone: "+358 45 555 4321"
        }
    ]);
    const [newPerson,setNewPerson] = useState({
        name: null,
        phone: null
    });
    const [filter,setFilter] = useState(null);

    const handleInputChange = (e) => {
        // Minusta on fiksumpaa, että on vain yksi muutoksenkäsittelijä input-kentille
        switch(e.target.name){
            case "name":
                setNewPerson({
                    name: e.target.value,
                    phone: newPerson.phone
                });
                break;
            case "phone":
                setNewPerson({
                    name: newPerson.name,
                    phone: e.target.value
                });
                break;
            case "filter":
                setFilter(e.target.value.toLowerCase());
                break;
            default:
                console.error("Jokin meni nyt pieleen!");
        }
    };
    const addNumber = (e) => {
        e.preventDefault();

        if(!persons.some(person => person.phone === newPerson.phone)){
            setPersons(persons.concat(newPerson));
        }
        else{
            alert(`Number ${newPerson.phone} is already added to the phonebook!`);
        }
        //console.log(persons);
    };

    return (
        <div>
            <h1>Phonebook</h1>

            <h2>Add new number</h2>
            <PersonForm onSubmit={addNumber} handleInputChange={handleInputChange} />
             
            <h2>Numbers</h2>
            <Filter handleInputChange={handleInputChange} />
            <Persons persons={persons} filter={filter} />
        </div>
    );
};

export default App;