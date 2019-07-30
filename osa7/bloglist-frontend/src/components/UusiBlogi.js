import React from "react";

import { useField } from "../hooks";

import blogsService from "../services/blogs";

import { Form } from "react-bootstrap";

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
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="title">Title:</Form.Label>
                    <Form.Control {...titleField.fieldData} />
                    <Form.Label htmlFor="author">Author:</Form.Label>
                    <Form.Control {...authorField.fieldData} />
                    <Form.Label htmlFor="url">Url:</Form.Label>
                    <Form.Control {...urlField.fieldData} />
                    <button className="btn btn-primary mt-2" type="submit">Create</button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default UusiBlogi;