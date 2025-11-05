import React from 'react';

import styles from './Main.module.css';
import Steps from '../../components/Steps/Steps';

const Main: React.FC = () => {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <Steps currentStep={1} /> {/* 1 - активный шаг */}
        <h2>Результаты поиска</h2>
        {/* сюда дальше добавим фильтры, список поездов и шаги */}
      </div>
    </section>
  );
};

export default Main;
