import { FC, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { Nav } from './Nav/Nav';
import { SignUpPage } from '../pages/SignUpPage/SignUpPage';
import { useTypedSelector } from '../hooks/useTypedSelectors';
import { useDispatchAcions } from '../hooks/useDispatchActions';
import Contacts from './Contacts/Contacts';
import ContactPage from '../pages/ContactPage/ContactPage';
import HomePage from '../pages/HomePage/HomePage';

const App: FC = () => {
  const { isAuthenticated } = useTypedSelector(s => s.user);
  const { auth } = useDispatchAcions();

  useEffect(() => {
    !isAuthenticated && auth();
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Nav isAuthenticated={isAuthenticated} />{' '}
      <Routes>
        <Route path="/" element={<HomePage />} />{' '}
        <Route path="/login" element={<LoginPage />} />{' '}
        <Route path="/signup" element={<SignUpPage />} />{' '}
        <Route path="/contacts" element={<Contacts />} />{' '}
        <Route path="/contacts/:contact" element={<ContactPage />} />
      </Routes>
    </>
  );
};

export default App;
