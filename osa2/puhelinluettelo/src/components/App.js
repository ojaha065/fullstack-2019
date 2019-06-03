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

        if(!persons.some(person => person.name === newPerson.name)){
            //setPersons(persons.concat(newPerson));
            phonebookService.saveNewPerson(newPerson).then((response) => {
                // OK
                //console.log(response);
                if(response.status === 201){
                    phonebookService.getAll().then((response) => {
                        // OK
                        setPersons(response.data);
                    });
                }
                else{
                    alert(`Failed! Response status was ${response.status}`);
                }
            }).catch((error) => {
                // Virhe
                console.error(error);
                alert("Failed!");
            });
        }
        else if(window.confirm("That person is already on the list. Do you want to replace the old number with the new one?")){
            const id = persons.find((person) => {
                return person.name === newPerson.name;
            }).id;
            phonebookService.replacePerson(id,newPerson).then(() => {
                let copy = [...persons];
                const selected_index = copy.findIndex((person) => {
                    return person.id === id;
                });
                copy[selected_index] = newPerson;
            }).catch((error) => {
                console.error(error);
                alert("Failed!");
            });
        }
        //console.log(persons);
    };
    const removeNumber = (id) => {
        // Haetaan tämän henkilön sijainti taulukossa
        const selected_index = persons.findIndex((person) => {
            return person.id === id;
        });

        if(window.confirm(`Are you sure? ${persons[selected_index].name} might get upset...`)){
            phonebookService.deletePerson(id).then(() => {
                let copy = [...persons];
                copy.splice(selected_index,1); // Poistetaan olio myös paikallisesta kopiosta
                setPersons(copy);
            }).catch((error) => {
                console.error(error);
            });
        }
    };

    return (
        <div>
            <h1>Phonebook</h1>

            <h2>Add new number</h2>
            <PersonForm onSubmit={addNumber} handleInputChange={handleInputChange} />
             
            <h2>Numbers</h2>
            <Filter handleInputChange={handleInputChange} />
            <Persons persons={persons} filter={filter} removeNumber={removeNumber} />
        </div>
    );
};

export default App;