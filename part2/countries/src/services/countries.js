import axios from 'axios';

const countriesURL = "https://studies.cs.helsinki.fi/restcountries/api/all"
const weatherURL = "https://api.openweathermap.org/data/2.5/weather"

const getAll = () => {
    const request = axios.get(countriesURL)
    return request.then(response => response.data)
}

const getWeather = (lat, lon) => {
    const APIkey = import.meta.env.VITE_WEATHER_API_KEY
    const request = axios.get(
        weatherURL, {
            params: {
                lat, 
                lon,
                units: "metric",
                appid: APIkey
            }
        }
    )
    return request.then(response => response.data)
}

export default { getAll, getWeather }