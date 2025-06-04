import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

const WeatherDetail = ({cities, getWeatherIcon}) => {
    const [cityName, setCityName] = useState('')
    const [weather, setWeather] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const cityObject = cities.find(city => city.id === id)
        setCityName(cityObject.name)

        axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${cityObject.lat}&longitude=${cityObject.lon}&daily=weather_code,temperature_2m_max`)
            .then(response => {
                const dailyWeather = response.data.daily
                console.log(response)
                setWeather({
                    temp_max: dailyWeather.temperature_2m_max,
                    code: dailyWeather.weather_code,
                    time: dailyWeather.time
                })
            })
            .catch(e => {
                console.log('error: ', e)
            })
    }, [id])

    const backList = () => navigate('/')


    return (
        <>
            <h2>{cityName}</h2>
            {!weather ? (
                <p>取得中です...</p>
            ) : (
                <ul>
                    {weather.time.map((date, i) => (
                        <li key={date}>{date}：{weather.temp_max[i]}℃ {getWeatherIcon(weather.code[i])}</li>
                    ))}
                </ul>
            )}
            <button onClick={() => backList()}>一覧に戻る</button>
        </>
    )
}

export default WeatherDetail