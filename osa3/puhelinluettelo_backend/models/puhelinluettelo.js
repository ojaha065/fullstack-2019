"use strict";

const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

if(!process.env.MONGOPWD){
    throw "Missing db password";
}

const dbPassword = process.env.MONGOPWD;

const connectionString = `mongodb+srv://puhelinluettelo:${dbPassword}@cluster0-rcbjk.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`;
mongoose.connect(connectionString,{
    useNewUrlParser: true
});

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    number: {
        type: String,
        required: true,
        minlength: 8
    }
});
PersonSchema.plugin(validator);
PersonSchema.set("toJSON",{
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Person = mongoose.model("Person",PersonSchema);

module.exports = {
    getAll: () => {
        return Person.find({});
    },
    saveNew: (newName,newNumber) => {
        const person = new Person({
            name: newName,
            number: newNumber
        });
        return person.save();
    },
    getPerson: (id) => {
        return Person.findById(id);
    },
    removePerson: (id) => {
        return Person.findByIdAndRemove(id,{
            useFindAndModify: false
        });
    },
    modifyPerson: (id,newNumber) => {
        return Person.findByIdAndUpdate(id,{
            number: newNumber
        },{
            runValidators: true,
            useFindAndModify: false
        });
    }
};