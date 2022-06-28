import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';

export const Nav: FC = () => {
  return (
    <nav className='nav'>
      <>
        <NavLink to='/contacts'>Contacts</NavLink>
        <NavLink to='/signup'>Sign Up</NavLink>{' '}
        <NavLink to='/login'>Login</NavLink>
      </>
    </nav>
  );
};
