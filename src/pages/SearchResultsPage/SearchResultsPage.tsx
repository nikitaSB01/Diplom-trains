import React from 'react';

import { useLocation } from "react-router-dom";

import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import SearchResultsMain from '../../modules/SearchResultsMain/Main';
import styles from './SearchResultsPage.module.css';

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const { from, to, dateStart, dateEnd } = location.state || {};

  return (
    <div className={styles.searchResultsPage}>
      <Header isInner
        from={from}
        to={to}
        dateStart={dateStart}
        dateEnd={dateEnd} />
      <main className={styles.main}>
        <SearchResultsMain />
      </main>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
