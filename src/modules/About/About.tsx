import React from 'react';
import styles from './About.module.css';

const About: React.FC = () => {
  return (
    <section className={styles.about}>
      <div className={styles.content}>
        <h2 className={styles.title}>О НАС</h2>
        <div className={styles.textBlock}>
          <p>
            Мы рады видеть вас! Мы работаем для вас с 2003 года. 14 лет мы наблюдаем, как с каждым{' '}
            <br />
            днём всё больше людей заказывают жд билеты через интернет.
          </p>
          <p>
            Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это
            делать? <br /> Мы расскажем о преимуществах заказа через интернет.
          </p>
          <p className={styles.highlight}>
            <span>
              Покупать жд билеты дешево можно за 90 суток до отправления поезда.
              <br />
              Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
