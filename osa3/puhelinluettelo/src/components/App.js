import React, { useState, useEffect } from "react";

import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Notification from "./Notification";

import phonebookService from "../phonebookService"

const App = () => {
    // Tilat
    const [persons,setPersons] = useState([]);
    const [newPerson,setNewPerson] = useState({
        name: null,
        phone: null
    });
    const [filter,setFilter] = useState(null);
    const [notificationSettings,setNotificationSettings] = useState({
        message: null,
        style: null
    });

    const showNotification = (message,time,style) => {
        setNotificationSettings({
            message: message,
            style: style
        });
        setTimeout(() => {
            setNotificationSettings({
                message: null,
                style: null
            });
        },time * 1000);
    };

    // Alkutilan hakeminen
    useEffect(() => {
        phonebookService.getAll().then((response) => {
            // OK
            setPersons(response.data);
        }).catch((error) => {
            // Virhe
            showNotification("Error retrieving data",999,"failure");
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
                    // Haetaan kaikki uudelleen palvelimelta, jotta saadaan oikeat id:t
                    phonebookService.getAll().then((response) => {
                        // OK
                        setPersons(response.data);
                        showNotification(`Added ${newPerson.name}`,3,"success");
                    });
                }
                else{
                    showNotification(`Something odd happened while adding ${newPerson.name}. HTTP response was ${response.status} when 201 was expected`,5,"failure");
                }
            }).catch((error) => {
                // Virhe
                console.warn(error);
                showNotification(error.response.data,8,"failure");
            });
        }
        else if(window.confirm("That person is already on the list. Do you want to replace the old number with the new one?")){
            const id = persons.find((person) => {
                return person.name === newPerson.name;
            }).id;
            phonebookService.replacePerson(id,newPerson).then(() => {
                //console.log(persons);
                let copy = [...persons];
                const selected_index = copy.findIndex((person) => {
                    return person.id === id;
                });
                copy[selected_index] = newPerson;
                copy[selected_index].id = id; // Id palvelimella ei muutu päivityksen yhteydessä
                setPersons(copy);
                showNotification(`Modified ${newPerson.name}`,3,"success");
            }).catch((error) => {
                console.warn(error);
                showNotification(error.response.data || `Failed to modify ${newPerson.name}`,8,"failure");
            });
        }
        //console.log(persons);
    };
    const removeNumber = (id) => {
        //console.log(persons);
        // Haetaan tämän henkilön sijainti taulukossa
        const selected_index = persons.findIndex((person) => {
            return person.id === id;
        });

        if(window.confirm(`Are you sure? ${persons[selected_index].name} might get upset...`)){
            phonebookService.deletePerson(id).then(() => {
                let copy = [...persons];
                const removed = copy.splice(selected_index,1); // Poistetaan olio myös paikallisesta kopiosta
                showNotification(`Removed ${removed[0].name}`,3,"success");
                setPersons(copy);
            }).catch((error) => {
                console.error(error);
                showNotification(`Information of ${persons[selected_index].name} has already been removed from the server. Please refresh the page.`,5,"failure");
            });
        }
    };

    return (
        <div>
            <h1>Phonebook</h1>

            <Notification notificationSettings={notificationSettings} />

            <h2>Add new number</h2>
            <PersonForm onSubmit={addNumber} handleInputChange={handleInputChange} />
             
            <h2>Numbers</h2>
            <Filter handleInputChange={handleInputChange} />
            <Persons persons={persons} filter={filter} removeNumber={removeNumber} />
        </div>
    );
};

export default App;