import React from 'react';
import styles from './Header.module.css';
import SearchForm from '../../../modules/SearchForm/SearchForm';
import { City } from "../../../types/City";

interface HeaderProps {
  isInner?: boolean;
  from?: City | null;
  to?: City | null;
  dateStart?: string;
  dateEnd?: string;
  variant?: "default" | "success";

}
const Header: React.FC<HeaderProps> = ({
  isInner = false,
  from,
  to,
  dateStart,
  dateEnd,
  variant
}) => {
  return (
    <header
      className={`
      ${styles.header}
      ${isInner ? styles.innerHeader : ""}
      ${variant === "success" ? styles.successHeader : ""}
  `}
    >      <div className={styles.logoBar}>
        <div className={styles.logo}>Лого</div>
      </div>

      <div className={styles.navBar}>
        <nav className={styles.nav}>
          <a href="#/?about">О нас</a>
          <a href="#/?how">Как это работает</a>
          <a href="#/?reviews">Отзывы</a>
          <a href="#/?contacts">Контакты</a>
        </nav>
      </div>

      <div className={styles.hero}>
        <div className={styles.heroContent}>
          {!isInner && (
            <div className={styles.textBlock}>
              <h1>
                Вся жизнь — <br />
                <span>путешествие!</span>
              </h1>
            </div>
          )}

          <div className={styles.formBlock}>
            <SearchForm
              isCompact={isInner}
              from={from}
              to={to}
              dateStart={dateStart}
              dateEnd={dateEnd}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
