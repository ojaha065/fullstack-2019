"use strict";

const mongoose = require("mongoose");

if(!process.env.MONGOPWD){
    throw "Missing db password";
}

const dbUrl = `mongodb+srv://puhelinluettelo:${process.env.MONGOPWD}@cluster0-rcbjk.mongodb.net/${(process.env.NODE_ENV === "test") ? "bloglist-test" : "bloglist"}?retryWrites=true&w=majority`;

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});
const Blog = mongoose.model("Blog",blogSchema);

mongoose.connect(dbUrl,{
    useNewUrlParser: true
});

module.exports = {
    Blog: Blog,
    findAll: () => {
        return Blog.find({});
    },
    saveNew: (body) => {
        const newBlog = new Blog(body);
        return newBlog.save();
    }
};