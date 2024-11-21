import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import Agenda from './pages/Agenda.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: '/agenda',
    element: <Agenda />,
    errorElement: <ErrorPage />
  },
  {
    path: '*',
    element: <ErrorPage />
  }
]);

export default router;