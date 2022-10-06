import { combineReducers } from 'redux';
import {
  fetchWeatherByCoordsType,
  fetchWeatherByLocationNameType,
  IFetchWeatherByLocaionNameSuccess,
  WEATHER_TYPES,
  IFetchWeatherByCoordsSuccess,
  IFetchWeatherByCoordsError,
  IFetchWeatherByLocaionNameError,
} from './weatherActions';

const weatherReducer = (
  state = null,
  {
    type,
    payload,
  }: IFetchWeatherByLocaionNameSuccess | IFetchWeatherByCoordsSuccess,
) => {
  switch (type) {
    case WEATHER_TYPES.FETCH_WEATHER_BY_LOCATION_NAME_SUCCESS:
    case WEATHER_TYPES.FETCH_WEATHER_BY_COORS_SUCCESS:
      return payload.weather || state;
    default:
      return state;
  }
};

const errorReducer = (
  state: any = null,
  {
    type,
    payload,
  }: IFetchWeatherByCoordsError | IFetchWeatherByLocaionNameError,
) => {
  switch (type) {
    case WEATHER_TYPES.FETCH_WEATHER_BY_COORS_ERROR:
    case WEATHER_TYPES.FETCH_WEATHER_BY_LOCATION_NAME_ERROR:
      return payload.error || state;
    default:
      return state;
  }
};

const loadingReducer = (
  state = false,
  { type }: fetchWeatherByCoordsType | fetchWeatherByLocationNameType,
) => {
  switch (type) {
    case WEATHER_TYPES.FETCH_WEATHER_BY_COORS_START:
    case WEATHER_TYPES.FETCH_WEATHER_BY_LOCATION_NAME_START:
      return true;
    case WEATHER_TYPES.FETCH_WEATHER_BY_COORS_SUCCESS:
    case WEATHER_TYPES.FETCH_WEATHER_BY_LOCATION_NAME_SUCCESS:
    case WEATHER_TYPES.FETCH_WEATHER_BY_COORS_ERROR:
    case WEATHER_TYPES.FETCH_WEATHER_BY_LOCATION_NAME_ERROR:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  weather: weatherReducer,
  error: errorReducer,
  loading: loadingReducer,
});
