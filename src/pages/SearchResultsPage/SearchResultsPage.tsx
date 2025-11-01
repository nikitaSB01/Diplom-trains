import React from 'react';

import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import SearchResultsMain from '../../modules/SearchResultsMain/Main'; // создадим новый модуль для этой страницы
import styles from './SearchResultsPage.module.css';

const SearchResultsPage: React.FC = () => {
  return (
    <div className={styles.searchResultsPage}>
      <Header isInner />
      <main className={styles.main}>
        <SearchResultsMain />
      </main>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
