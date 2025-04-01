import { useState } from "react"
import './block/weather.css'
export default function (){
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)

  const API_KEY = '86e7c94ef0f44136b95135634252503'

  const getWeather = async ()=> {
    if(!city) return;

      const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=ru`;

      try{
        const response = await fetch(url)
        const data = await response.json()

        setWeather({
          temp: data.current.temp_c,
          description: data.current.condition.text,
          icon: data.current.condition.icon,
          city: data.location.name,
        })
      }
      catch (error){
        console.log('ошибка погоду не дам', error)
      }
  }
  return(
    <div>
      <div className="main">
      <input 
      className="main-input"
      type="text" 
      value={city}
      onChange={(e)=>setCity(e.target.value)}
      placeholder="введите город"
      />
      <button 
      className="main-button"
      onClick={getWeather}>поиск</button>
      </div>
      <div >
        {weather && (
          <div className="weather">
            <h2>{weather.city}</h2>
            <p>temp: {weather.temp}°C</p>
            <p>{weather.description}</p>
            <img width={'50px'} src={weather.icon} alt="" /> 
          </div>
        )
        }
      </div>
    </div>
  )
}
