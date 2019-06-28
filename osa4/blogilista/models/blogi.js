"use strict";

const mongoose = require("mongoose");
mongoose.set("useFindAndModify",false);

if(!process.env.MONGOPWD){
    throw "Missing db password";
}

const dbUrl = `mongodb+srv://puhelinluettelo:${process.env.MONGOPWD}@cluster0-rcbjk.mongodb.net/${(process.env.NODE_ENV === "test") ? "bloglist-test" : "bloglist"}?retryWrites=true&w=majority`;

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});
blogSchema.set("toJSON",{
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Blog = mongoose.model("Blog",blogSchema);

mongoose.connect(dbUrl,{
    useNewUrlParser: true
});

module.exports = {
    Blog: Blog,
    findAll: () => {
        return Blog.find({}).populate("user",{
            username: true,
            name: true,
            id: true
        });
    },
    saveNew: (body) => {
        const newBlog = new Blog(body);
        return newBlog.save();
    },
    deleteBlog: async (id,userId) => {
        let blog;
        try{
            blog = await Blog.findById(id);
        }
        catch(error){
            return -2;
        }
        if(blog && blog.user && blog.user.toString() === userId){
            return Blog.findByIdAndDelete(id);
        }
        else{
            return -1;
        }
    },
    modifyBlog: (id,body) => {
        const newBlog = new Blog(body);
        return Blog.findByIdAndUpdate(id,{
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        });
    }
};