import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatchAcions } from '../../hooks/useDispatchActions';
import './Nav.scss';
import MyButton from '../shared/Buttons/MyButton/MyButton';

interface INav {
  isAuthenticated: boolean;
}

export const Nav: FC<INav> = ({ isAuthenticated }) => {
  const { logOut } = useDispatchAcions();

  return (
    <nav className="nav">
      <>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'nav__link active' : 'nav__link unactive'
          }
        >
          Home
        </NavLink>
        {!isAuthenticated && (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? 'nav__link active' : 'nav__link unactive'
              }
            >
              Logins
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? 'nav__link active' : 'nav__link unactive'
              }
            >
              Sign Up
            </NavLink>
          </>
        )}
        {isAuthenticated && (
          <>
            <NavLink
              to="/contacts"
              className={({ isActive }) =>
                isActive ? 'nav__link active' : 'nav__link unactive'
              }
            >
              Contacts
            </NavLink>{' '}
            <NavLink
              to="/books"
              className={({ isActive }) =>
                isActive ? 'nav__link active' : 'nav__link unactive'
              }
            >
              Books
            </NavLink>{' '}
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                isActive ? 'nav__link active' : 'nav__link unactive'
              }
            >
              Tasks
            </NavLink>{' '}
            <NavLink
              to="/datebooks"
              className={({ isActive }) =>
                isActive ? 'nav__link active' : 'nav__link unactive'
              }
            >
              DateBook
            </NavLink>{' '}
            <MyButton type="button" cb={logOut} text="LogOut" />
          </>
        )}
      </>{' '}
    </nav>
  );
};
