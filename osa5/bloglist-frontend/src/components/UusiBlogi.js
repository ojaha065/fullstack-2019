import React, { useState } from "react";

import blogsService from "../services/blogs";

const UusiBlogi = (props) => {
    const [newBlog,setNewBlog] = useState({
        title: null,
        author: null,
        url: null
    });

    const handleInputChange = (e) => {
        switch(e.target.id){
            case "title":
                setNewBlog({
                    title: e.target.value,
                    author: newBlog.author,
                    url: newBlog.url
                });
                break;
            case "author":
                setNewBlog({
                    title: newBlog.title,
                    author: e.target.value,
                    url: newBlog.url
                });
                break;
            case "url":
                setNewBlog({
                    title: newBlog.title,
                    author: newBlog.author,
                    url: e.target.value
                });
                break;
            default:
                console.error("Jokin meni nyt pieleen.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        blogsService.addNew(newBlog,props.token).then((response) => {
            // OK
            props.setBlogs(props.blogs.concat(response.data));
            props.showNotification(`${newBlog.title} by ${newBlog.author || "unknown"} added`,5,"success");
        }).catch((error) => {
            // Virhe
            console.error(error);
            props.showNotification(`Operation failed. Status code ${error.response.status} ${(error.response.data.error) ? error.response.data.error : ""}`,5,"failure");
        });
    };

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" required onChange={handleInputChange} />
                <br />
                <label htmlFor="author">Author:</label>
                <input type="text" id="author" onChange={handleInputChange} />
                <br />
                <label htmlFor="url">Url:</label>
                <input type="url" id="url" required onChange={handleInputChange} />
                <br />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default UusiBlogi;