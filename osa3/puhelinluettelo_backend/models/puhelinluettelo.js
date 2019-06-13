"use strict";

const mongoose = require("mongoose");

if(!process.env.MONGOPWD){
    throw "Missing db password";
}

const dbPassword = process.env.MONGOPWD;

const connectionString = `mongodb+srv://puhelinluettelo:${dbPassword}@cluster0-rcbjk.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`;
mongoose.connect(connectionString,{
    useNewUrlParser: true
});

const PersonSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
});
const Person = mongoose.model("Person",PersonSchema);

module.exports = {
    getAll: () => {
        return Person.find({});
    },
    saveNew: (newName,newNumber) => {
        const person = new Person({
            name: newName,
            number: newNumber,
            id: Math.floor(Math.random() * 999999)
        });
        return person.save();
    },
    getPerson : (id) => {
        return Person.find({
            id: id
        })
    }
};