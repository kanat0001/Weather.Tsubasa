import React, { useState, useEffect } from 'react';
import './search.css';

const Sidebar = ({ onClose, city, setCity, weather, getWeather }) => {
  const [animClass, setAnimClass] = useState('sidebar-hide');

  const handleClose = () => {
    setAnimClass('sidebar-hide');
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      setAnimClass('sidebar-show');
    });
  }, []);

  return (
    <div className={`sidebar ${animClass}`}>
      <div className="sidebar-header">
        <input
          className='search-input'
          type="text"
          value={city}
          placeholder="введите город"
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e)=>{
            if((e.key) === 'Enter'){
              getWeather();
            }
          }}
        />
        {/* <button className="main-button" onClick={getWeather}>поиск</button> */}
        <button onClick={handleClose} className="close-button"><CrossIcon /></button>
      </div>

      {weather && (
        <>
          <h2 className='details-title'>weather details</h2>
          <p className='details'><span>cloud</span><span>{weather.cloud}%</span> </p>
          <p className='details'><span>humidity</span><span>{weather.humidity}%</span> </p>
          <p className='details'><span>wind </span><span>{weather.wind} km/h</span></p>
          <p className='details'><span>rain</span><span>{weather.rain}mm</span> </p>
          <p className='details'><span>feelslike</span><span>{weather.feelslike}°</span> </p>
          <p className='details'><span>pressure</span><span>{weather.pressure}mb</span> </p>
          <p className='details'><span>wind dir</span><span>{weather.windDir}</span></p>
          <p className='details'><span>visibility</span><span>{weather.visibility}</span> </p>
          
        </>
      )}
    </div>
  );
};

// ✅ Это не App, а SearchSidebar
const SearchSidebar = ({ city, setCity, weather, setWeather, getWeather }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app-container">
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="open-button">
          <SearchIcon/>
        </button>
      )}
      {isOpen && (
        <Sidebar
          city={city}
          setCity={setCity}
          weather={weather}
          setWeather={setWeather}
          getWeather={getWeather}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchSidebar;

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 612.08 612.08"
    fill="currentColor"
    className="icon-search"
  >
    <path d="M237.927,0C106.555,0,0.035,106.52,0.035,237.893c0,131.373,106.52,237.893,237.893,237.893
      c50.518,0,97.368-15.757,135.879-42.597l0.028-0.028l176.432,176.433c3.274,3.274,8.48,3.358,11.839,0l47.551-47.551
      c3.274-3.274,3.106-8.703-0.028-11.838L433.223,373.8c26.84-38.539,42.597-85.39,42.597-135.907C475.82,106.52,369.3,0,237.927,0z
      M237.927,419.811c-100.475,0-181.918-81.443-181.918-181.918S137.453,55.975,237.927,55.975s181.918,81.443,181.918,181.918
      S338.402,419.811,237.927,419.811z"/>
  </svg>
);


const CrossIcon = () => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="icon-x"
  >
    <line x1="7" y1="7" x2="25" y2="25" />
    <line x1="7" y1="25" x2="25" y2="7" />
  </svg>
);

