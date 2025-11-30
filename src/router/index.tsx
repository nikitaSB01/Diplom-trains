import { createBrowserRouter } from 'react-router-dom';

import HomePage from '../pages/HomePage/HomePage';
import SearchResultsPage from '../pages/SearchResultsPage/SearchResultsPage';
import PassengersPage from '../pages/PassengersPage/PassengersPage';
import PaymentPage from '../pages/PaymentPage/PaymentPage';

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/search', element: <SearchResultsPage /> },
  { path: '/passengers', element: <PassengersPage /> },
  { path: '/payment', element: <PaymentPage /> },
]);