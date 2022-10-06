import { IWeather } from '../../types/weatherTypes/weatherTypes';
export enum WEATHER_TYPES {
  FETCH_WEATHER_BY_LOCATION_NAME_START = 'FETCH_WEATHER_BY_LOCATION_NAME_START',
  FETCH_WEATHER_BY_LOCATION_NAME_SUCCESS = 'FETCH_WEATHER_BY_LOCATION_NAME_SUCCESS',
  FETCH_WEATHER_BY_LOCATION_NAME_ERROR = 'FETCH_WEATHER_BY_LOCATION_NAME_ERROR',

  FETCH_WEATHER_BY_COORS_START = 'FETCH_WEATHER_BY_COORS_START',
  FETCH_WEATHER_BY_COORS_SUCCESS = 'FETCH_WEATHER_BY_COORS_SUCCESS',
  FETCH_WEATHER_BY_COORS_ERROR = 'FETCH_WEATHER_BY_COORS_ERROR',
}

export interface IFetchWeatherByLocaionNameStart {
  type: WEATHER_TYPES.FETCH_WEATHER_BY_LOCATION_NAME_START;
}

export interface IFetchWeatherByLocaionNameSuccess {
  type: WEATHER_TYPES.FETCH_WEATHER_BY_LOCATION_NAME_SUCCESS;
  payload: {
    weather: IWeather;
  };
}
export interface IFetchWeatherByLocaionNameError {
  type: WEATHER_TYPES.FETCH_WEATHER_BY_LOCATION_NAME_ERROR;
  payload: {
    error: any;
  };
}

export interface IFetchWeatherByCoorsStart {
  type: WEATHER_TYPES.FETCH_WEATHER_BY_COORS_START;
}

export interface IFetchWeatherByCoordsSuccess {
  type: WEATHER_TYPES.FETCH_WEATHER_BY_COORS_SUCCESS;
  payload: {
    weather: IWeather;
  };
}
export interface IFetchWeatherByCoordsError {
  type: WEATHER_TYPES.FETCH_WEATHER_BY_COORS_ERROR;
  payload: {
    error: any;
  };
}

export type fetchWeatherByCoordsType =
  | IFetchWeatherByCoorsStart
  | IFetchWeatherByCoordsSuccess
  | IFetchWeatherByCoordsError;

export type fetchWeatherByLocationNameType =
  | IFetchWeatherByLocaionNameStart
  | IFetchWeatherByLocaionNameSuccess
  | IFetchWeatherByLocaionNameError;
