import React from 'react';
import styles from './Header.module.css';
import SearchForm from '../../../modules/SearchForm/SearchForm';

interface HeaderProps {
  isInner?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isInner = false }) => {
  return (
    <header className={`${styles.header} ${isInner ? styles.innerHeader : ''}`}>
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
          {/* Текстовый блок отображаем только на главной */}
          {!isInner && (
            <div className={styles.textBlock}>
              <h1>
                Вся жизнь — <br />
                <span>путешествие!</span>
              </h1>
            </div>
          )}

          {/* Блок формы — SearchForm теперь умеет быть компактным */}
          <div className={styles.formBlock}>
            <SearchForm isCompact={isInner} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
