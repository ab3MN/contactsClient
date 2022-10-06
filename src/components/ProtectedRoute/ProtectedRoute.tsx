import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelectors';

interface IProtectedRouteProps {
  children: React.ReactNode | any;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => {
  const { token } = useTypedSelector(s => s.user);

  return !token ? <Navigate to="/login" replace /> : children;
};

export default ProtectedRoute;
