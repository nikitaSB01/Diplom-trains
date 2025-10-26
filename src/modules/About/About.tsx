import styles from './About.module.css';

const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.content}>
        <h2 className={styles.title}>О нас</h2>
        <p className={styles.text}>
          Мы помогаем путешественникам быстро и удобно находить и покупать билеты на поезда по всей
          России.
        </p>
        <p className={styles.text}>
          Наш сервис объединяет лучшие предложения, упрощает поиск и экономит ваше время — чтобы
          поездки были комфортными с самого начала.
        </p>
      </div>
      <div className={styles.imageWrapper}>
        <img src="/assets/about/train.png" alt="Поезд на фоне заката" className={styles.image} />
      </div>
    </section>
  );
};

export default About;
