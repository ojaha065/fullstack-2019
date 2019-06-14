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

// ### Middlewaret ###

app.use(express.static("./public"));

// Body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Morgan
morgan.token("body",(req) => {
    if(req.method === "POST"){
        return JSON.stringify(req.body);
    }
    else{
        return "";
    }
});
app.use(morgan(":method :url :status :response-time ms :body"));

// ### Reitit ###
app.get("/api",(req,res) => {
    res.status(200).send("Nothing to see here!");
});

app.get("/api/persons",(req,res,next) => {
    puhelinluettelo.getAll().then((result) => {
        // OK
        res.status(200).json(result);
    }).catch(error => next(error));
});
app.get("/api/persons/:id",(req,res,next) => {
    puhelinluettelo.getPerson(req.params.id).then((result) => {
        res.status(200).json(result);
    }).catch(error => next(error));
});

app.get("/info",(req,res,next) => {
    puhelinluettelo.getAll().then((result) => {
        // OK
        res.status(200).send(`Phonebook has info for ${result.length} people.<br />${new Date().toString()}`);
    }).catch(error => next(error));
});

// Numeron lisääminen
app.post("/api/persons",(req,res,next) => {
    if(req.body.name && req.body.number){
        puhelinluettelo.saveNew(req.body.name,req.body.number).then(() => {
            // OK
            res.status(201).send();
        }).catch((error) => {
            if(error.name === "ValidationError"){
                res.status(400).send(error.message);
            }
            else{
                next(error);
            }
        });
    }
    else{
        res.status(400).json({
            error: "Name or number missing"
        });
    }
});

// Numeron poistaminen
app.delete("/api/persons/:id",(req,res,next) => {
    puhelinluettelo.removePerson(req.params.id).then((response) => {
        // OK
        // Poistettiinko oikeasti mitään?
        if(response){
            res.status(205).send();
        }
        else{
            res.status(404).send();
        }
    }).catch(error => next(error));
});

// Numeron muokkaaminen
app.put("/api/persons/:id",(req,res,next) => {
    if(req.params.id && req.body.number){
        puhelinluettelo.modifyPerson(req.params.id,req.body.number).then((response) => {
            // OK
            // Muokattiinko oikeasti mitään?
            if(response){
                res.status(205).send();
            }
            else{
                res.status(404).send();
            }
        }).catch((error) => {
            if(error.name === "ValidationError"){
                res.status(400).send(error.message);
            }
            else{
                next(error);
            }
        });
    }
    else{
        res.status(400).json({
            error: "Required parameter missing"
        });
    }
});

// ### Middlewaret ###
// 404
app.use((req,res) => {
    res.status(404).send("Page not found");
});

// Virheenkäsittelijä
app.use((error,req,res) => {
    if(error.name === "CastError" && error.kind === "ObjectId"){
        res.status(400).send("Virheellinen ID");
    }
    else{
        console.error(error);
        res.status(500).send();
    }
});

// Käynnistetään palvelin
const port = process.env.PORT || 8000;
app.listen(port,() => {
    console.info(`The server started listening port ${port}`);
});