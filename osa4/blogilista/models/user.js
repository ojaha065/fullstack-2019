"use strict";

const mongoose = require("mongoose");
mongoose.set("useFindAndModify",false);

if(!process.env.MONGOPWD){
    throw "Missing db password";
}

const dbUrl = `mongodb+srv://puhelinluettelo:${process.env.MONGOPWD}@cluster0-rcbjk.mongodb.net/${(process.env.NODE_ENV === "test") ? "bloglist-test" : "bloglist"}?retryWrites=true&w=majority`;

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    name: String,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }]
});
userSchema.set("toJSON",{
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const User = mongoose.model("User",userSchema);

mongoose.connect(dbUrl,{
    useNewUrlParser: true
});

module.exports = {
    User: User,
    findAll: () => {
        return User.find({}).populate("blogs",{
            url: true,
            title: true,
            author: true,
            id: true
        });
    },
    addNew: (body) => {
        const newUser = new User(body);
        return newUser.save();
    },
    addNewBlogToUser: (userID,blogID) => {
        return User.findByIdAndUpdate(userID,{
          $push: {
              blogs: blogID
          }  
        });
    },
    getUserInfo: (username) => {
        return User.find({
            username: username
        });
    }
};