import { useState } from "react"
import './block/weather.css'
import './block/search.jsx'
import SearchSidebar from "./block/search.jsx"

export default function (){
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)

  const API_KEY = '86e7c94ef0f44136b95135634252503'


  const getWeather = async ()=> {
    if(!city) return;

     const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&lang=ru`;


      try{
        const response = await fetch(url)
        const data = await response.json()

        setWeather({
          temp: data.current.temp_c,
          description: data.current.condition.text,
          icon: data.current.condition.icon,
          city: data.location.name,
          time: data.location.localtime,
          cloud: data.current.cloud,
          humidity: data.current.humidity,
          wind: data.current.wind_kph, 
          rain: data.forecast.forecastday[0].day.totalprecip_mm,
          feelslike: data.current.feelslike_c,
          pressure: data.current.pressure_mb,
          windDir: data.current.wind_dir,
          visibility: data.current.vis_km,
        })
      }
      catch (error){
        console.log('ошибка погоду не дам', error)
      }
  }
  return(
      <div className="main">

        <div  className="weather-wrapper">
          {weather && (
            <div className="weather">
              <div className="weather-temp">
              <p >{weather.temp}°</p>
              </div>
              <div>
                <h2 className="weather-city">{weather.city}</h2>
                <p className="weather-time">{weather.time}</p>
              </div>
              <div>
                <img className="weather-icon" width={'50px'} src={weather.icon} alt="" /> 
                <p className="weather-disc">{weather.description}</p>
              </div>
             
            </div>
            )
          }
        </div>


        <div className="search-block">
          <SearchSidebar 
          city={city}
          setCity={setCity}
          weather={weather}
          setWeather={setWeather}
          getWeather={getWeather}
          />
        </div>



      </div>
  )
}
