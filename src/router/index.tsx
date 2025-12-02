import { createHashRouter } from 'react-router-dom';

import HomePage from '../pages/HomePage/HomePage';
import SearchResultsPage from '../pages/SearchResultsPage/SearchResultsPage';
import PassengersPage from '../pages/PassengersPage/PassengersPage';
import PaymentPage from '../pages/PaymentPage/PaymentPage';
import ConfirmPage from "../pages/ConfirmPage/ConfirmPage";
import SuccessPage from "../pages/SuccessPage/SuccessPage";

export const router = createHashRouter([
  { path: '/', element: <HomePage /> },
  { path: '/search', element: <SearchResultsPage /> },
  { path: '/passengers', element: <PassengersPage /> },
  { path: '/payment', element: <PaymentPage /> },
  { path: "/confirm", element: <ConfirmPage /> },
  { path: "/success", element: <SuccessPage /> }
]);