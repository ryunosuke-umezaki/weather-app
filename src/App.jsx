import {Route, Routes} from 'react-router-dom'
import './App.css'
import WeatherCity from './pages/WeatherCity'
import WeatherList from './pages/WeatherList'
import WeatherDetail from './pages/WeatherDetail'

function App() {
  const cities = [
    { id: "Tokyo", name: "Tokyo", lat: 35.6895, lon: 139.6917 },
    { id: "NewYork", name: "NewYork", lat: 40.7128, lon: -74.0060 },
    { id: "London", name: "London", lat: 51.5074, lon: -0.1278 }
  ]

  const getWeatherIcon = (code) => {
      if (code === 0) return "☀️ 快晴";
      if ([1, 2].includes(code)) return "🌤 晴れ";
      if (code === 3) return "☁️ 曇り";
      if ([45, 48].includes(code)) return "🌫 霧";
      if ([51, 53, 55].includes(code)) return "🌦 霧雨";
      if ([61, 63, 65, 80, 81, 82].includes(code)) return "🌧 雨";
      if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️ 雪";
      if ([95, 96, 99].includes(code)) return "⛈ 雷雨";
      return "undefined";
    }

  return (
    <>
    <Routes>
      <Route index element={<WeatherList cities={cities} getWeatherIcon={getWeatherIcon} />} />
      <Route path='/city' element={<WeatherCity />}>
        <Route path=':id' element={<WeatherDetail cities={cities} getWeatherIcon={getWeatherIcon} />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
