import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = (props) => {
    const palautteitaYhteensa = props.palautteet[0] + props.palautteet[1] + props.palautteet[2];

    if(palautteitaYhteensa > 0){
        return (
            <div>
                <p>Hyvä {props.palautteet[0]}</p>
                <p>Neutraali {props.palautteet[1]}</p>
                <p>Huono {props.palautteet[2]}</p>
                <br />
                <p>Palautteita yhteensä {palautteitaYhteensa}</p>
    
                <p>Keskiarvo {(props.palautteet[0] - props.palautteet[2]) / palautteitaYhteensa}</p>
                <p>Positiivisia palautteita {props.palautteet[0] * 100 / palautteitaYhteensa} %</p>
            </div>
        );
    }
    else{
        return (<p>Yhtään palautetta ei ole annettu.</p>);
    }
};

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
            <Statistics palautteet={[good,neutral,bad]} />
        </div>
    );
};

ReactDOM.render(<App />,document.getElementById("root"));