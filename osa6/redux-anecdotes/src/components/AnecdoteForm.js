import React from "react";
import { connect } from "react-redux";

import { addNew } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
    const formSubmit = (e) => {
        e.preventDefault();
        props.addNew(e.target.anecdote.value);
        props.setNotification("New anecdote added!",5);
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={formSubmit}>
                <div><input name="anecdote" /></div>
            <button>create</button>
            </form>
        </div>
    );
};

const mapDispatchToProps = {
    addNew,
    setNotification
};
const ConnectedAnecdoteList = connect(null,mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteList;