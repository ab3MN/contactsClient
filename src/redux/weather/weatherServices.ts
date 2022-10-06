import axios from 'axios';
import { Dispatch } from 'react';
import { IWeather } from '../../types/weatherTypes/weatherTypes';
import {
  fetchWeatherByCoordsType,
  fetchWeatherByLocationNameType,
  WEATHER_TYPES,
} from './weatherActions';

export const getWeatherByLocationName =
  (location = 'ukraine') =>
  async (d: Dispatch<fetchWeatherByLocationNameType>) => {
    try {
      d({ type: WEATHER_TYPES.FETCH_WEATHER_BY_LOCATION_NAME_START });

      const { data } = await axios.get<IWeather>(
        '/weather?location=' + location,
      );

      d({
        type: WEATHER_TYPES.FETCH_WEATHER_BY_LOCATION_NAME_SUCCESS,
        payload: { weather: data },
      });
    } catch (e) {
      d({
        type: WEATHER_TYPES.FETCH_WEATHER_BY_LOCATION_NAME_ERROR,
        payload: { error: e },
      });
    }
  };

export const getWeatherByCoords =
  ({ lat = 49, lon = 32 }) =>
  async (d: Dispatch<fetchWeatherByCoordsType>) => {
    try {
      d({ type: WEATHER_TYPES.FETCH_WEATHER_BY_COORS_START });
      const { data } = await axios.get(`/weather?cords?lat=${lat}&lon=${lon}`);

      d({
        type: WEATHER_TYPES.FETCH_WEATHER_BY_COORS_SUCCESS,
        payload: { weather: data },
      });
    } catch (e) {
      d({
        type: WEATHER_TYPES.FETCH_WEATHER_BY_COORS_ERROR,
        payload: { error: e },
      });
    }
  };
