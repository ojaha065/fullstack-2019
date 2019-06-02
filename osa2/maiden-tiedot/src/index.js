import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Weather from "./components/Weather";

const SearchResults = (props) => {
    const showCountry = (country) => {
        // Tämä ei varmaankaan ole oikea tapa toteuttaa tämä, mutta toimii...
        document.getElementById("search").value = country;
        props.inputChangeHandler();
    };

    switch(props.tila){
        case 0:
            return (<div></div>);
        case 1:
            return (<p>Too many matches, please specify another filter</p>);
        case 2:
            const rows = props.showCountries.map((country) => {
                return (<li key={`${country.cioc}${Math.random()}`}>{country.name} <button id={country.name} type="button" onClick={(e) => showCountry(e.target.id)}>show</button></li>);
            });
            return (
                <div>
                    <ul>{rows}</ul>
                </div>
            );
        case 3:
            const languages = props.showCountries[0].languages.map((language) => {
                return (<li key={language.iso639_1}>{language.name}</li>);
            });
            return (
                <div>
                    <h1>{props.showCountries[0].name}</h1>
                    <ul>
                        <li>Capital: {props.showCountries[0].capital}</li>
                        <li>Population: {props.showCountries[0].population}</li>
                    </ul>
                    <h2>Languages</h2>
                    <ul>{languages}</ul>
                    <img src={props.showCountries[0].flag} width="200" alt="Flag of the country" />
                    <Weather city={props.showCountries[0].capital} />
                </div>
            );
        default:
            console.error("Jokin meni nyt pieleen!");
            return (<div></div>);
    }
};

const App = () => {
    // Tilat
    const [maat,setMaat] = useState([]);
    const [tila,setTila] = useState(0);
    const [showCountries,setShowCountries] = useState(null);

    // Haetaan aluksi kaikki maat
    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
            // OK
            //console.log(response);
            setMaat(response.data);
        }).catch((error) => {
            // Virhe
            throw error;
        });
    },[]);

    const inputChangeHandler = (e) => {
        //console.log(e.target.value);
        // Filteröidään maat-listaa
        let filteredCountries = maat.filter((maa) => {
            return maa.name.toLowerCase().includes(e ? e.target.value.toLowerCase() : document.getElementById("search").value.toLowerCase());
        });
        //console.log(filteredCountries);
        if(filteredCountries.length > 10){
            setTila(1);
        }
        else if(filteredCountries.length > 1){
            setShowCountries(filteredCountries);
            setTila(2);
        }
        else if(filteredCountries.length === 1){
            setShowCountries(filteredCountries);
            setTila(3);
        }
        else{
            setTila(0);
        }
    };

    return (
        <div>
            find countries
            <input id="search" type="text" onChange={inputChangeHandler} />
            <br />
            <SearchResults tila={tila} showCountries={showCountries} inputChangeHandler={inputChangeHandler} />
        </div>
    );
};

ReactDOM.render(<App />,document.getElementById("root"));