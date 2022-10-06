import React, { FC } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelectors';
import { useNavigate } from 'react-router-dom';

const WithAuthRedirect = (BaseComponent: FC) => {
  const { isAuthenticated } = useTypedSelector(s => s.user);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return <BaseComponent />;
};

export default WithAuthRedirect;
