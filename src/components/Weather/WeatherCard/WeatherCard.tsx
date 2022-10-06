import React, { FC } from 'react';
import { IWeather } from '../WeatherType';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import './WeatherCard.scss';

interface IWeatherCardProps {
  weather: IWeather;
}

const WeatherCard: FC<IWeatherCardProps> = ({ weather }) => {
  const { main, name, wind } = weather;
  const temp = Math.round(main.temp - 273.15);
  const degreesCelcius = String.fromCodePoint(8451);

  return (
    <article className="weather__card">
      <div className="weather__card--description">
        {' '}
        <ThermostatIcon sx={{ color: '#8B0000' }} />
        <span className="weather__card--name">{name + '   '}</span>
        <span className="weather__card--temp">{temp + degreesCelcius}</span>
        <div>
          <img
            className="weather__card--img"
            alt="weather icon"
            src={
              'http://openweathermap.org/img/w/' +
              weather?.weather[0].icon +
              '.png'
            }
          />
        </div>
      </div>

      <div className="weather__card--info">
        <p className="weather__card--pressure">
          pressure: <span>{main.pressure} mm</span>
        </p>
        <p className="weather__card--humidity">
          humidity: <span>{main.humidity} %</span>
        </p>
        <p className="weather__card--speed">
          wind: <span>{wind.speed} m/s</span>
        </p>
      </div>
    </article>
  );
};

export default React.memo(WeatherCard);
