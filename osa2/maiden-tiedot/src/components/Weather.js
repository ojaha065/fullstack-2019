import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = "https://api.apixu.com/v1/current.json";
const apiKey = "[PUT HERE]";

const Weather = ({city}) => {
    const [weather,setWeather] = useState(null);

    useEffect(() => {
        console.info("Pyydetään säätietoja...");
        axios.get(`${apiUrl}?key=${apiKey}&q=${city}`).then((response) => {
            // OK
            setWeather(response.data);
        }).catch((error) => {
            console.warn("Virhe haettaessa säätietoja. Virheilmoitus alla.");
            console.info("Tämä johtuu todennäköisesti siitä, että API-avain ei kelpaa.");
            console.error(error);
        });
    },[city]);

    if(weather){
        return (
            <div>
                <h2>Weather in {city}</h2>
                <p><b>Temperature</b>: {weather.current.temp_c} Celsius</p>
                <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
                <p><b>Wind:</b>: {weather.wind_kph} direction {weather.wind_dir}</p>
            </div>
        );
    }
    else{
        return (<div></div>);
    }
};

export default Weather;