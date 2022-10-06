import React, { FC, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatchAcions } from '../hooks/useDispatchActions';
import Footer from './Footer/Footer';
import AppBar from './AppBar';
import { useTypedSelector } from '../hooks/useTypedSelectors';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import NewsItemPage from '../pages/NewsItemPage/NewsItemPage';
import {
  HomePage,
  LoginPage,
  SignUpPage,
  ContactsPage,
  ContactPage,
  BooksPage,
  TasksPage,
  DateBooksPage,
  DateBookPage,
} from '../Routes/Routes';

const App: FC = () => {
  const { auth } = useDispatchAcions();
  const { token } = useTypedSelector(s => s.user);

  useEffect(() => {
    if (!token) {
      return;
    }
    auth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <main>
        <AppBar />
        <Routes>
          {' '}
          <Route path="/login" element={<LoginPage />} />{' '}
          <Route path="/signup" element={<SignUpPage />} />{' '}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />{' '}
          <Route
            path="/news/:news"
            element={
              <ProtectedRoute>
                <NewsItemPage />
              </ProtectedRoute>
            }
          />{' '}
          <Route
            path="/contacts"
            element={
              <ProtectedRoute>
                <ContactsPage />
              </ProtectedRoute>
            }
          />{' '}
          <Route
            path="/contacts/:contact"
            element={
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <BooksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TasksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/datebooks"
            element={
              <ProtectedRoute>
                <DateBooksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/datebooks/:datebook"
            element={
              <ProtectedRoute>
                <DateBookPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
};
export default App;
