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

app.post("/api/blogs",async (req,res,next) => {
    //console.log(req.body);
    if(!req.body || !req.body.title || !req.body.url){
        res.status(400).send();
    }
    else{
        if(!req.body.likes){
            req.body.likes = 0;
        }

        try{
            const response = await blogi.saveNew(req.body);
            res.status(201).json(response);
        }
        catch(error){
            next(error);
        }
    }
});

app.delete("/api/blogs/:id",async (req,res,next) => {
    try{
        await blogi.deleteBlog(req.params.id);
        res.status(205).send();
    }
    catch(error){
        next(error);
    }
});

app.put("/api/blogs/:id",async (req,res,next) => {
    if(!req.body || !req.body.title || !req.body.url){
        res.status(400).send();
    }
    else{
        if(!req.body.likes){
            req.body.likes = 0;
        }

        try{
            await blogi.modifyBlog(req.params.id,req.body);
            res.status(205).send();
        }
        catch(error){
            next(error);
        }
    }
});

// Virheenkäsittelijä
app.use((error,req,res,next) => {
    if(error.name === "CastError" && error.kind === "ObjectId"){
        res.status(404).send("Virheellinen ID");
    }
    else{
        console.error(error);
        res.status(500).send();
    }
});

const port = process.env.NODE_ENV === "test" ? Number(process.env.PORT) + 1 : process.env.PORT;
app.listen(port,() => {
    if(process.env.NODE_ENV !== "test"){
        console.info(`Palvelin kuuntelee porttia ${port}`);
    }
});

module.exports = app;