import { FC, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Nav } from './Nav/Nav';
import { useTypedSelector } from '../hooks/useTypedSelectors';
import { useDispatchAcions } from '../hooks/useDispatchActions';
import {
  HomePage,
  LoginPage,
  SignUpPage,
  ContactsPage,
  ContactPage,
  BooksPage,
  TasksPage,
  TaskPage,
  DateBooksPage,
  DateBookPage,
} from '../Routes/Routes';

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
        <Route path="/contacts" element={<ContactsPage />} />{' '}
        <Route path="/contacts/:contact" element={<ContactPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/:task" element={<TaskPage />} />
        <Route path="/datebooks" element={<DateBooksPage />} />
        <Route path="/datebooks/:datebook" element={<DateBookPage />} />
      </Routes>
    </>
  );
};

export default App;
