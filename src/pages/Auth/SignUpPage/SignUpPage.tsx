import React, { FC } from 'react';
import { RegisterForm } from '../../../components/shared/RegisterForm/RegisterForm';
import { useTypedSelector } from '../../../hooks/useTypedSelectors';
import { useNavigate } from 'react-router-dom';

const SignUpPage: FC = () => {
  const { isAuthenticated } = useTypedSelector(s => s.user);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/contacts');
    }
  }, [isAuthenticated, navigate]);
  return <RegisterForm type="sign up" />;
};

export default SignUpPage;
