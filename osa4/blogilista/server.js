"use strict";

if(!process.env.MONGOPWD || !process.env.PORT){
    require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const passwordHelper = require("./utils/password_helper.js");

const user = require("./models/user.js");
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
app.get("/api/users",async (req,res,next) => {
    try{
        const allUsers = await user.findAll();
        res.status(200).json(allUsers);
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
            // Blogin lisääjä
            const allUsers = await user.findAll();
            const blogAdderID = allUsers[Math.floor(Math.random() * (allUsers.length - 1))].id;
            req.body.user = blogAdderID;

            const response = await blogi.saveNew(req.body);
            await user.addNewBlogToUser(blogAdderID,response.id);

            res.status(201).json(response);
        }
        catch(error){
            next(error);
        }
    }
});
app.post("/api/users",async (req,res,next) => {
    if(!req.body || !req.body.username || !req.body.password){
        res.status(400).json({
            error: "Required field missing"
        });
    }
    else if(req.body.username.length > 3 && req.body.password.length > 3){        
        try{
            // Validointi
            const allUsers = await user.findAll();
            let usernameIsUnique = true;
            allUsers.forEach((user) => {
                if(user.username === req.body.username){
                    usernameIsUnique = false;
                }
            });

            if(usernameIsUnique){
                req.body.password = passwordHelper.encryptPassword(req.body.password);
                await user.addNew(req.body);
                res.status(201).send();
            }
            else{
                res.status(400).json({
                    error: "Username is not unique"
                });
            }
        }
        catch(error){
            next(error);
        }
    }
    else{
        res.status(400).json({
            error: "Username and/or password is not long enough"
        });
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

const port = process.env.NODE_ENV === "test" ? Number(process.env.PORT) + Math.floor(Math.random() * 200) : process.env.PORT;
app.listen(port,() => {
    if(process.env.NODE_ENV !== "test"){
        console.info(`Palvelin kuuntelee porttia ${port}`);
    }
});

module.exports = app;