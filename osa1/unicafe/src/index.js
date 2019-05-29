import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = (props) => {
    const palautteitaYhteensa = props.palautteet[0] + props.palautteet[1] + props.palautteet[2];

    if(palautteitaYhteensa > 0){
        return (
            <div>
                <table>
                    <tbody>
                        <Statistic text="Hyvä" value={props.palautteet[0]} />
                        <Statistic text="Neutraali" value={props.palautteet[1]} />
                        <Statistic text="Huono" value={props.palautteet[2]} />
                        <Statistic text="Palautteita yhteensä" value={palautteitaYhteensa} />
                        <Statistic text="Keskiarvo" value={(props.palautteet[0] - props.palautteet[2]) / palautteitaYhteensa} />
                        <Statistic text="Positiivisia palautteita" value={`${props.palautteet[0] * 100 / palautteitaYhteensa} %`} />
                    </tbody>
                </table>
            </div>
        );
    }
    else{
        return (<p>Yhtään palautetta ei ole annettu.</p>);
    }
};
const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    );
};

const Button = (props) => {
    return (<button type="button" onClick={props.handleClick}>{props.text}</button>);
};

const App = () => {
    const [good,setGood] = useState(0);
    const [neutral,setNeutral] = useState(0);
    const [bad,setBad] = useState(0);

    return (
        <div>
            <h1>Unicafe asiakaspalaute</h1>

            <Button handleClick={() => setGood(good + 1)} text="Hyvä" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="Neutraali" />
            <Button handleClick={() => setBad(bad + 1)} text="Huono" />

            <h2>Tilastot</h2>
            <Statistics palautteet={[good,neutral,bad]} />
        </div>
    );
};

ReactDOM.render(<App />,document.getElementById("root"));