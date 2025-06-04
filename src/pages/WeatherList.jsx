import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const WeatherList = ({cities, getWeatherIcon}) => {
    const [weatherList, setWeatherList] = useState([])
    const navigate = useNavigate()
    

    useEffect(() => {
    const fetchWeather = async () => {
        const results = await Promise.all(
            cities.map(async city => {
                try {
                    const response = await axios.get(
                        `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code&forecast_days=1`
                    )
                    const weather = response.data.current
                    console.log(city.name, weather)
                    return {
                        id: city.id,
                        name: city.name,
                        temperature: weather.temperature_2m,
                        code: weather.weather_code
                    }
                } catch (error) {
                    console.log('Error: ', error)
                    return null
                }
            })
        );
        setWeatherList(results.filter(Boolean))
        }
        fetchWeather()
    }, [])

    const displayDetail = (id) => {
        const cityDetail = cities.find(city => city.id === id)
        console.log(cityDetail?.name)
        navigate(`city/${id}`)
    }

    return (
        <>
            <ul>
                {weatherList.map((city) => (
                    <li key={city.id} onClick={() => displayDetail(city.id)}>
                        {city.name}  現在気温: {city.temperature}℃ {getWeatherIcon(city.code)}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default WeatherList