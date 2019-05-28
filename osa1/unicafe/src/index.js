import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
    const [good,setGood] = useState(0);
    const [neutral,setNeutral] = useState(0);
    const [bad,setBad] = useState(0);

    return (
        <div>
            <h1>Unicafe asiakaspalaute</h1>

            <button type="button" onClick={() => setGood(good + 1)}>Hyvä</button>
            <button type="button" onClick={() => setNeutral(neutral + 1)}>Neutraali</button>
            <button type="button" onClick={() => setBad(bad + 1)}>Huono</button>

            <h2>Tilastot</h2>
            <p>Hyvä {good}</p>
            <p>Neutraali {neutral}</p>
            <p>Huono {bad}</p>
        </div>
    );
};

ReactDOM.render(<App />,document.getElementById("root"));