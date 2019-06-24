"use strict";

if(!process.env.MONGOPWD || !process.env.PORT){
    require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const blogi = require("./models/blogi.js");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

// Routes
app.get("/api/blogs",(req,res) => {
    blogi.findAll().then((blogs) => {
        // OK
        res.status(200).json(blogs);
    }).catch((error) => {
        // Virhe
        console.error(error);
        res.status(500).send();
    });
});

app.post("/api/blogs",(req,res) => {
    console.log(req.body);
    blogi.saveNew(req.body).then((response) => {
        // OK
        res.status(201).json(response);
    }).catch((error) => {
        // Virhe
        console.error(error);
        res.status(500).send();
    });
});

const port = process.env.PORT;
app.listen(port,() => {
    console.info(`Palvelin kuuntelee porttia ${port}`);
});