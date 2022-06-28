import { useState } from 'react';
import './RegisterFor.scss';
import React from 'react';
import { useDispatchAcions } from '../../../hooks/useDispatchActions';

interface IUser {
  email: string;
  password: string;
  _password: string;
}

export const RegisterForm = ({ type = 'login' }) => {
  const [user, setUser] = useState<IUser>({
    email: '',
    password: '',
    _password: '',
  });
  const [message, setMessage] = useState<string>('');

  const { signUp, login } = useDispatchAcions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { email, password, _password } = user;

    if (type === 'sign up' && password !== _password) {
      return setMessage(() => 'Passwords need be same');
    }
    type === 'login' ? login(email, password) : signUp(email, password);

    setUser({ email: '', password: '', _password: '' });
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>
          Email :
          <input
            type='email'
            name='email'
            id='email'
            value={user.email}
            onChange={handleChange}
          />
        </label>{' '}
        <label htmlFor='password'>
          Password :
          <input
            type='password'
            name='password'
            id='password'
            value={user.password}
            onChange={handleChange}
          />
        </label>{' '}
        {type === 'sign up' && (
          <label htmlFor='_password'>
            Repeat password :
            <input
              type='password'
              name='_password'
              id='_password'
              value={user._password}
              onChange={handleChange}
            />
          </label>
        )}
        <button>{type.capitalize()}</button>
      </form>
    </section>
  );
};
