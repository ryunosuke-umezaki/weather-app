import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../login/SignInForm"


const WeatherList = ({cities, getWeatherIcon, session}) => {
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
        if(!session) {
            navigate("/signin")
        }
    }, [session])

    const displayDetail = (id) => {
        const cityDetail = cities.find(city => city.id === id)
        console.log(cityDetail?.name)
        navigate(`city/${id}`)
    }

    const SignOut = async () => {
        await supabase.auth.signOut()
        navigate("/signin")
    }

    return (
        <>
        <div style = {{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            padding: '0',
        }}>
            <button onClick={()=> SignOut()}>ログアウト</button>
                {weatherList.map((city) => (
                    <div key={city.id} onClick={() => displayDetail(city.id)}
                        style={{
                            border: '2px solid #gray',
                            padding: '24px 32px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            flex: '0 0 220px'
                        }}>
                        <h2>{city.name}</h2>  現在気温: {city.temperature}℃ {getWeatherIcon(city.code)}
                    </div>
                ))}
        </div>
        </>
    )
}

export default WeatherList