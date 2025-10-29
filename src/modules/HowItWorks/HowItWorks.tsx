import React from 'react';
import styles from './HowItWorks.module.css';

import icon1 from '../../assets/icons/HowItWorks/icon1.svg';
import icon2 from '../../assets/icons/HowItWorks/icon2.svg';
import icon3 from '../../assets/icons/HowItWorks/icon3.svg';

const HowItWorks: React.FC = () => {
  return (
    <section className={styles.howItWorks}>
      <div className={styles.overlay}>
        <div className={styles.topRow}>
          <h2 className={styles.title}>КАК ЭТО РАБОТАЕТ</h2>
          <button className={styles.button}>Узнать больше</button>
        </div>

        <div className={styles.cards}>
          <div className={styles.card}>
            <img src={icon1} alt="Удобный заказ" className={styles.icon} />
            <p>
              Удобный заказ
              <br />
              на сайте
            </p>
          </div>

          <div className={styles.card}>
            <img src={icon2} alt="Нет необходимости ехать в офис" className={styles.icon} />
            <p>
              Нет необходимости
              <br />
              ехать в офис
            </p>
          </div>

          <div className={styles.card}>
            <img src={icon3} alt="Огромный выбор направлений" className={styles.icon} />
            <p>
              Огромный выбор
              <br />
              направлений
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
