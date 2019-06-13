"use strict";

const mongoose = require("mongoose");

if(process.argv.length < 3){
    throw "Required parameter missing (password)";
}

const password = process.argv[2];
const newName = process.argv[3] || null;
const newNumber = process.argv[4] || null;

const connectionString = `mongodb+srv://puhelinluettelo:${password}@cluster0-rcbjk.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`;

mongoose.connect(connectionString,{
    useNewUrlParser: true
});

const PersonSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
});
const Person = mongoose.model("Person",PersonSchema);

if(!newName || !newNumber){
    Person.find({}).then((result) => {
        // OK
        console.log("Phonebook:");
        result.forEach((person) => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    }).catch((error) => {
        throw error;
    });
}
else{
    const person = new Person({
        name: newName,
        number: newNumber,
        id: Math.floor(Math.random() * 999999)
    });
    person.save().then((response) => {
        // OK
        console.info(`Added ${newName} number ${newNumber} to phonebook`);
        mongoose.connection.close();
    }).catch((error) => {
        throw error;
    });
}