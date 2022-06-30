import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatchAcions } from '../../hooks/useDispatchActions';
import './Nav.scss';
interface INav {
  isAuthenticated: boolean;
}
export const Nav: FC<INav> = ({ isAuthenticated }) => {
  const { logOut } = useDispatchAcions();
  return (
    <nav className="nav">
      <>
        <NavLink to="/">Home</NavLink>
        {!isAuthenticated && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
        {isAuthenticated && (
          <>
            <NavLink to="/contacts">Contacts</NavLink>{' '}
            <button type="button" onClick={() => logOut()}>
              LogOut
            </button>
          </>
        )}
      </>{' '}
    </nav>
  );
};
