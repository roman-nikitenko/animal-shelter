import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ErrorPage } from './pages/ErrorPage';
import { ListPets } from './pages/ListPets';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />
      },
      {
        path: '/list-of-pets',
        element: <ListPets />
      }
    ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
