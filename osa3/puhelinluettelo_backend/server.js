"use strict";

if(!process.env.MONGOPWD){
    require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// Omat tietomallit
const puhelinluettelo = require("./models/puhelinluettelo.js");

const app = express();

app.use(express.static("./public"));

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
    puhelinluettelo.getAll().then((result) => {
        // OK
        res.status(200).json(result);
    }).catch((error) => {
        // Virhe
        console.error(error);
        res.status(503).send();
    });
});
app.get("/api/persons/:id",(req,res) => {
    puhelinluettelo.getPerson(req.params.id).then((result) => {
        if(result.length > 0){
            res.status(200).json(result);
        }
        else{
            res.status(404).send();
        }
    }).catch((error) => {
        res.status(500).send();
    });
});

app.get("/info",(req,res) => {
    puhelinluettelo.getAll().then((result) => {
        // OK
        res.status(200).send(`Phonebook has info for ${result.length} people.<br />${new Date().toString()}`);
    }).catch((error) => {
        // Virhe
        console.error(error);
        res.status(503).send();
    });
});

// Numeron lisääminen
app.post("/api/persons",(req,res) => {
    if(req.body.name && req.body.number){
        puhelinluettelo.saveNew(req.body.name,req.body.number).then((response) => {
            // OK
            res.status(201).send();
        }).catch((error) => {
            console.error(error);
            res.status(500).send();
        });
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