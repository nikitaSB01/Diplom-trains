import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Лого</div>
      <nav className={styles.nav}>
        <a href="#about">О нас</a>
        <a href="#how">Как это работает</a>
        <a href="#reviews">Отзывы</a>
        <a href="#contacts">Контакты</a>
      </nav>
    </header>
  );
};

export default Header;
