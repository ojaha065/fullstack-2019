import React from "react";

import { useField } from "../hooks";

import blogsService from "../services/blogs";

const UusiBlogi = (props) => {
    const titleField = useField("text","title",true);
    const authorField = useField("text","author",false);
    const urlField = useField("url","url",true);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newBlog = {
            title: titleField.fieldData.value,
            author: authorField.fieldData.value,
            url: urlField.fieldData.value
        };
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
                <input {...titleField.fieldData} />
                <br />
                <label htmlFor="author">Author:</label>
                <input {...authorField.fieldData} />
                <br />
                <label htmlFor="url">Url:</label>
                <input {...urlField.fieldData} />
                <br />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default UusiBlogi;