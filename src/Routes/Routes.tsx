import { lazy } from 'react';

/* ==================== CONTACT ==================== */
export const ContactPage = lazy(
  () => import('../pages/Contacts/ContactPage/ContactPage'),
);
export const ContactsPage = lazy(
  () => import('../pages/Contacts/ContactsPage/ContactsPage'),
);

/* ==================== AUTH ==================== */
export const LoginPage = lazy(
  () => import('../pages/Auth/LoginPage/LoginPage'),
);

export const SignUpPage = lazy(
  () => import('../pages/Auth/SignUpPage/SignUpPage'),
);

/* ==================== BOOK ==================== */
export const BooksPage = lazy(
  () => import('../pages/Books/BooksPage/BooksPage'),
);

/* ==================== TASKS ==================== */
export const TasksPage = lazy(
  () => import('../pages/Tasks/TasksPage/TasksPage'),
);

/* ==================== DATEBOOK ==================== */
export const DateBooksPage = lazy(
  () => import('../pages/DateBook/DateBooksPage/DateBooksPage'),
);
export const DateBookPage = lazy(
  () => import('../pages/DateBook/SingleDateBookPage/SingleDateBookPage'),
);

/* ==================== HOME & NEWS ==================== */
export const NewsItemPage = lazy(
  () => import('../pages/NewsItemPage/NewsItemPage'),
);
export const HomePage = lazy(() => import('../pages/Home/HomePage/HomePage'));
