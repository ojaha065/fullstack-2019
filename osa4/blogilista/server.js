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
}));

// Routes
app.get("/api/blogs",async (req,res,next) => {
    try{
        const result = await blogi.findAll();
        res.status(200).json(result);
    }
    catch(error){
        next(error);
    }
});

app.post("/api/blogs",(req,res,next) => {
    console.log(req.body);
    blogi.saveNew(req.body).then((response) => {
        // OK
        res.status(201).json(response);
    }).catch((error) => {
        // Virhe
        next(error);
    });
});

// Virheenkäsittelijä
app.use((error,req,res) => {
    console.error(error);
    res.status(500).send();
});

const port = process.env.NODE_ENV === "test" ? Number(process.env.PORT) + 1 : process.env.PORT;
app.listen(port,() => {
    if(process.env.NODE_ENV !== "test"){
        console.info(`Palvelin kuuntelee porttia ${port}`);
    }
});

module.exports = app;