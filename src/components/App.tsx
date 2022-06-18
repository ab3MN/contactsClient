import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { Nav } from './Nav/Nav';
import { SignUpPage } from '../pages/SignUpPage/SignUpPage';
const App: FC = () => (
  <>
    <Nav />
    <Routes>
      <Route path='/login' element={<LoginPage />} />{' '}
      <Route path='/signup' element={<SignUpPage />} />
    </Routes>
  </>
);

export default App;
