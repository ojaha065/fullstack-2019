import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
    const [selected,setSelected] = useState(0);
    const [votes,setVotes] = useState(new Array(props.anecdotes.length).fill(0));

    // Äänestysnapin tapahtumankäsittelijä
    const vote = (i) => {
        const copy = [...votes];
        copy[i]++;
        setVotes(copy);
    };

    // Haetaan anekdootti, jolla on suurin äänestysmäärä
    // Musta tuntuu, että tähän on helpompikin tapa...
    const max = votes.reduce((a,b) => {
        return Math.max(a,b);
    });
    const mostVotes = votes.indexOf(max);

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {props.anecdotes[selected]}
            <p>has {votes[selected]} votes</p>
            <button type="button" onClick={() => vote(selected)}>Vote</button>
            <button type="button" onClick={() => setSelected(Math.floor(Math.random() * 6))}>Next anecdote</button>

            <h2>Anecdote with the most votes</h2>
            {props.anecdotes[mostVotes]}
            <p>has {max} votes</p>
        </div>
    );
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />,document.getElementById("root"));