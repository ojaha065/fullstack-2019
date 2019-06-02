import React, { useState, useEffect } from "react";

import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

import phonebookService from "../phonebookService"

const App = () => {
    // Tilat
    const [persons,setPersons] = useState([]);
    const [newPerson,setNewPerson] = useState({
        name: null,
        phone: null
    });
    const [filter,setFilter] = useState(null);

    // Alkutilan hakeminen
    useEffect(() => {
        phonebookService.getAll().then((response) => {
            // OK
            setPersons(response.data);
        }).catch((error) => {
            // Virhe
            throw error;
        });
    },[]);

    const handleInputChange = (e) => {
        // Minusta on fiksumpaa, että on vain yksi muutoksenkäsittelijä input-kentille
        switch(e.target.name){
            case "name":
                setNewPerson({
                    name: e.target.value,
                    number: newPerson.number
                });
                break;
            case "number":
                setNewPerson({
                    name: newPerson.name,
                    number: e.target.value
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

        if(!persons.some(person => person.number === newPerson.number)){
            setPersons(persons.concat(newPerson));
        }
        else{
            alert(`Number ${newPerson.number} is already added to the phonebook!`);
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