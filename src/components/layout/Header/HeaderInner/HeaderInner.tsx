import React from 'react';
/* import styles from './HeaderInner.module.css'; */
import styles from '../Header.module.css';
import SearchForm from '../../../../modules/SearchForm/SearchForm';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      {/* Верхняя часть — логотип */}
      <div className={styles.logoBar}>
        <div className={styles.logo}>Лого</div>
      </div>

      {/* Навигация */}
      <div className={styles.navBar}>
        <nav className={styles.nav}>
          <a href="#about">О нас</a>
          <a href="#how">Как это работает</a>
          <a href="#reviews">Отзывы</a>
          <a href="#contacts">Контакты</a>
        </nav>
      </div>

      {/* Герой-блок */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.formBlock}>
            <SearchForm isCompact/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
