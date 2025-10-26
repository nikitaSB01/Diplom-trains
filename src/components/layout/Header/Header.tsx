import React from 'react';
import styles from './Header.module.css';
import SearchForm from '../../../modules/SearchForm/SearchForm';

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
          <div className={styles.textBlock}>
            <h1>
              Вся жизнь — <br />
              <span>путешествие!</span>
            </h1>
          </div>
          <div className={styles.formBlock}>
            <SearchForm />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
