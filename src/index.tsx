import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ErrorPage } from './pages/ErrorPage';
import { ListOfPets } from './pages/ListOfPets';
import { PetDetailPage } from './pages/PetDetailPage';
import { PetsProvider } from './store/PetsContext';
import { AccessPage } from './pages/AccessPage';
import { DonatePage } from './pages/DonatePage';
import { UserPage } from './pages/UserPage';
import { RegistrationForm } from './components/RegistrationForm';
import { LogInForm } from './components/LogInForm';

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
      },
      {
        path: '/access',
        element: <AccessPage />,
        children: [
          {
            path: '/access/registration',
            element: <RegistrationForm />
          },
          {
            path: '/access/login',
            element: <LogInForm />
          }
        ]
      },
      {
        path: '/donation',
        element: <DonatePage />,
      },
      {
        path: '/user',
        element: <UserPage />,
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
