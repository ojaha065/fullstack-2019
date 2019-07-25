import React, { useEffect } from "react";

import { connect } from "react-redux";
import { initAnecdotes } from "./reducers/anecdoteReducer";

import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";

const App = (props) => {
  useEffect(() => {
    props.initAnecdotes();
  },[props]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default connect(null,{
  initAnecdotes: initAnecdotes
})(App);