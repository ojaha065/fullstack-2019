import React from "react";

import { addNew } from "../reducers/anecdoteReducer";

const AnecdoteForm = ({store}) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={(e) => {e.preventDefault();store.dispatch(addNew(e.target.anecdote.value));}}>
                <div><input name="anecdote" /></div>
            <button>create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;