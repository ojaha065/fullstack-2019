import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { createStore } from "redux";
import reducer from "./reducers/anecdoteReducer";

const store = createStore(reducer);

const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById("root")
  );
};

render();
store.subscribe(render);