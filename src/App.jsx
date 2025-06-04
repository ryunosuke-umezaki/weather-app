import {Route, Routes} from 'react-router-dom'
import './App.css'
import WeatherCity from './pages/WeatherCity'
import WeatherList from './pages/WeatherList'
import WeatherDetail from './pages/WeatherDetail'

function App() {
  const cities = [
    { id: "Tokyo", name: "Tokyo", lat: 35.6895, lon: 139.6917 },
    { id: "NewYork", name: "New York", lat: 40.7128, lon: -74.0060 },
    { id: "London", name: "London", lat: 51.5074, lon: -0.1278 },
    { id: "Paris", name: "Paris", lat: 48.8566, lon: 2.3522 },
    { id: "Singapore", name: "Singapore", lat: 1.3521, lon: 103.8198 },
    { id: "Beijing", name: "Beijing", lat: 39.9042, lon: 116.4074 },
    { id: "Sydney", name: "Sydney", lat: -33.8688, lon: 151.2093 },
    { id: "Mumbai", name: "Mumbai", lat: 19.0760, lon: 72.8777 },
    { id: "SaoPaulo", name: "Sao Paulo", lat: -23.5505, lon: -46.6333 },
    { id: "Cairo", name: "Cairo", lat: 30.0444, lon: 31.2357 },
    { id: "Moscow", name: "Moscow", lat: 55.7558, lon: 37.6173 },
    { id: "Istanbul", name: "Istanbul", lat: 41.0082, lon: 28.9784 },
    { id: "Johannesburg", name: "Johannesburg", lat: -26.2041, lon: 28.0473 },
    { id: "LosAngeles", name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
    { id: "Berlin", name: "Berlin", lat: 52.52, lon: 13.4050 }
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
