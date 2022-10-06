import React from 'react';
import axios from 'axios';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { IWeather } from './WeatherType';
import './Weather.scss';
import WeatherCard from './WeatherCard/WeatherCard';

const textFieldStyle = {
  input: {
    color: 'white',
    width: '100%',
  },
  label: {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'rgb(3, 233, 244)',
  },
  '& label.Mui-focused': {
    color: 'rgb(3, 233, 244)',
  },
};

const Weather = () => {
  const [weather, setWeather] = React.useState<IWeather | null>(null);
  const [location, setLocation] = React.useState('');

  React.useEffect(() => {
    axios
      .get<IWeather>('/weather?location=Kyiv')
      .then(res =>
        setWeather({
          main: res.data.main,
          weather: res.data.weather,
          name: res.data.name,
          wind: res.data.wind,
        }),
      )
      .catch(e => console.log(e));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLocation(e.target.value);
  const _handleChange = React.useCallback(handleChange, []);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!location) return;
    try {
      const { data } = await axios.get<IWeather>(
        '/weather?location=' + location,
      );
      setWeather({
        main: data.main,
        weather: data.weather,
        name: data.name,
        wind: data.wind,
      });
    } catch (e) {
      console.log(e);
    }
    setLocation('');
  };

  const _handleSubmit = React.useCallback(handleSubmit, [location]);

  return (
    <section className="weather__section">
      <form className="weather__form" onSubmit={_handleSubmit}>
        <TextField
          onChange={_handleChange}
          id="standard-basic"
          label="Choose location"
          name="location"
          variant="standard"
          value={location}
          sx={textFieldStyle}
        />
        <IconButton className="weather__form--button" type="submit">
          <SearchIcon
            sx={{
              color: 'rgb(240, 248, 255)',
              pt: 1.2,
              '&:hover': {
                color: 'rgb(3, 233, 244)',
              },
            }}
          />
        </IconButton>
      </form>
      {weather && <WeatherCard weather={weather} />}
    </section>
  );
};

export default React.memo(Weather);
