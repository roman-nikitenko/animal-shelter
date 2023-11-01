import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ErrorPage } from './pages/ErrorPage';
import { ListOfPets } from './pages/ListOfPets';
import { PetDetailPage } from './pages/PetDetailPage';
import { PetsContext, PetsProvider } from './store/PetsContext';

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
        element: <ListOfPets />,
      },
      {
        path: '/list-of-pets/:petId',
        element: <PetDetailPage />,
      }
    ]
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <PetsProvider>
      <RouterProvider router={router} />
    </PetsProvider>
  </React.StrictMode>
);
