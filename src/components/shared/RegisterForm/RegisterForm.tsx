import { useState } from 'react';
import './RegisterFor.scss';
import React from 'react';
import { useDispatchAcions } from '../../../hooks/useDispatchActions';
import MyButton from '../Buttons/MyButton/MyButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

interface IUser {
  email: string;
  password: string;
  _password: string;
}
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

export const RegisterForm = ({ type = 'login' }) => {
  const [user, setUser] = useState<IUser>({
    email: '',
    password: '',
    _password: '',
  });

  const { signUp, login } = useDispatchAcions();

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>): void =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { email, password, _password } = user;

    if (type === 'sign up' && password !== _password) {
      return console.log(() => 'Passwords need be same');
    }
    type === 'login' ? login(email, password) : signUp(email, password);

    setUser({ email: '', password: '', _password: '' });
  };

  return (
    <section className="register__form--box">
      <form
        onSubmit={handleSubmit}
        className="register__form"
        onChange={handleChange}
      >
        {' '}
        <Box className="register--input__box">
          <TextField
            id="standard-basic"
            label="Email"
            name="email"
            variant="standard"
            value={user.email}
            sx={textFieldStyle}
          />{' '}
        </Box>{' '}
        <Box className="register--input__box">
          <TextField
            id="standard-basic"
            label="Password"
            name="password"
            variant="standard"
            value={user.password}
            sx={textFieldStyle}
            type="password"
          />{' '}
        </Box>{' '}
        {type === 'sign up' && (
          <Box className="register--input__box">
            <TextField
              id="standard-basic"
              label="Repeat password"
              name="_password"
              variant="standard"
              value={user._password}
              sx={textFieldStyle}
              type="password"
            />{' '}
          </Box>
        )}
        <MyButton text={type.capitalize()} type="submit" height="50px" />{' '}
        <span className="register__form--link-span">
          Or{' '}
          <Link
            to={type === 'login' ? '/signup' : '/login'}
            className="register__form--link"
          >
            {type === 'login' ? 'Sign Up' : 'Login'}
          </Link>
        </span>
      </form>{' '}
    </section>
  );
};
