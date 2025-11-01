import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import SearchResultsPage from '../pages/SearchResultsPage/SearchResultsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/search',
    element: <SearchResultsPage />,
  },
]);
