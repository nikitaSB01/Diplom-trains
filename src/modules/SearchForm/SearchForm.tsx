import React from 'react';
import styles from './SearchForm.module.css';

const SearchForm: React.FC = () => {
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <input type="text" placeholder="Откуда" />
        <input type="text" placeholder="Куда" />
      </div>
      <div className={styles.row}>
        <input type="date" />
        <input type="date" />
      </div>
      <button type="submit">Найти билеты</button>
    </form>
  );
};

export default SearchForm;
