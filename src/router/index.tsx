import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import SearchResultsPage from '../pages/SearchResultsPage/SearchResultsPage';
import PassengersPage from '../pages/PassengersPage/PassengersPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/search',
    element: <SearchResultsPage />,
  },
  {
    path: "/passengers",
    element: <PassengersPage />
  },

]);
