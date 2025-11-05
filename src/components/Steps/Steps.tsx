import React from 'react';
import styles from './Steps.module.css';
import cn from 'classnames';

interface StepsProps {
  currentStep: number; // 1–4
}

const steps = [
  { id: 1, title: 'Билеты' },
  { id: 2, title: 'Пассажиры' },
  { id: 3, title: 'Оплата' },
  { id: 4, title: 'Проверка' },
];

const Steps: React.FC<StepsProps> = ({ currentStep }) => {
  return (
    <div className={styles.stepsContainer}>
      <div className={styles.step}>Шаг 1</div>
      <div className={styles.step}>Шаг 2</div>
      <div className={styles.step}>Шаг 3</div>
      <div className={styles.step}>Шаг 4</div>
    </div>
  );
};

export default Steps;
