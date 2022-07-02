import { lazy } from 'react';

export const ContactPage = lazy(
  () => import('../pages/Contacts/ContactPage/ContactPage'),
);
export const ContactsPage = lazy(
  () => import('../pages/Contacts/ContactsPage/ContactsPage'),
);
export const HomePage = lazy(() => import('../pages/Home/HomePage/HomePage'));

export const LoginPage = lazy(
  () => import('../pages/Auth/LoginPage/LoginPage'),
);

export const SignUpPage = lazy(
  () => import('../pages/Auth/SignUpPage/SignUpPage'),
);

export const BooksPage = lazy(
  () => import('../pages/Books/BooksPage/BooksPage'),
);

export const TasksPage = lazy(
  () => import('../pages/Tasks/TasksPage/TasksPage'),
);
export const TaskPage = lazy(() => import('../pages/Tasks/TaskPage/TaskPage'));

export const DateBooksPage = lazy(
  () => import('../pages/DateBook/DateBooksPage/DateBooksPage'),
);
export const DateBookPage = lazy(
  () => import('../pages/DateBook/DateBookPage/DateBookPage'),
);
