import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';

interface INav {
  online: boolean;
  logOut: () => void;
}

export const Nav: FC<INav> = ({ online }) => {
  return (
    <nav className="nav">
      {!online && (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? 'nav__link active' : 'nav__link unactive'
            }
          >
            Login
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
      {online && (
        <>
          {' '}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav__link active' : 'nav__link unactive'
            }
          >
            Home
          </NavLink>
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
        </>
      )}
    </nav>
  );
};
