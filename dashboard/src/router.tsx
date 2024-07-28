import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import DashboardLayout from './layouts/DashboardLayout';
import BooksPage from './pages/BooksPage';
import AuthLayout from './layouts/AuthLayout';
import CreateBook from './pages/CreateBook';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/dashboard/home'} />,
  },
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'books',
        element: <BooksPage />,
      },
      {
        path: 'books/create',
        element: <CreateBook />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]);

export default router;
