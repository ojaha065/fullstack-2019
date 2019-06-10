"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
];

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Morgan
morgan.token("body",(req,res) => {
    if(req.method === "POST"){
        return JSON.stringify(req.body);
    }
    else{
        return "";
    }
});
app.use(morgan(":method :url :status :response-time ms :body"));

// Routes
app.get(["/","/api"],(req,res) => {
    res.status(200).send("Nothing to see here!");
});

app.get("/api/persons",(req,res) => {
    res.status(200).json(persons);
});
app.get("/api/persons/:id",(req,res) => {
    const selected_person = persons.find((person) => {
        return person.id === Number(req.params.id);
    });
    if(selected_person){
        res.status(200).json(selected_person);
    }
    else{
        res.status(404).send();
    }
});

app.get("/info",(req,res) => {
    res.status(200).send(`Phonebook has info for ${persons.length} people.<br />${new Date().toString()}`);
});

// Numeron lisääminen
app.post("/api/persons",(req,res) => {
    if(req.body.name && req.body.number){
        if(!persons.find(person => person.name === req.body.name)){
            persons.push({
                name: req.body.name,
                number: req.body.number,
                id: Math.floor(Math.random() * 999999)
            });
            res.status(201).send();
        }
        else{
            res.status(409).json({
                error: "Name must be unique"
            });
        }
    }
    else{
        res.status(400).json({
            error: "Name or number missing"
        });
    }
});

// Numeron poistaminen
app.delete("/api/persons/:id",(req,res) => {
    const selected_index = persons.findIndex((person) => {
        return person.id === Number(req.params.id);
    });
    if(selected_index !== -1){
        persons.splice(selected_index,1);
        res.status(205).send();
    }
    else{
        res.status(404).send();
    }
});

// Käynnistetään palvelin
const port = process.env.PORT || 8000;
app.listen(port,() => {
    console.info(`Palvelin kuuntelee porttia ${port}`);
});