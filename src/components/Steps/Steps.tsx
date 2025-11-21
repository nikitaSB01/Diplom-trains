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
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        const isActive = step.id < currentStep;       // прошли
        const isCurrent = step.id === currentStep;    // текущий

        return (
          <div
            key={step.id}
            className={cn(
              styles.step,
              styles[`step${step.id}`],
              { [styles.active]: isActive },
              { [styles.current]: isCurrent },
              { [styles.last]: isLast }
            )}
          >

            {/* Прямоугольник */}
            <div className={styles.box}>
              <div className={styles.numberWrapper}>
                <div className={styles.number}>{step.id}</div>
              </div>

              <div className={styles.title}>{step.title}</div>
            </div>

            {/* Треугольник (кроме последнего) */}
            {!isLast && (
              <div className={styles.containerTriangle}>
                <div className={styles.triangleBg}></div>

                <svg
                  className={styles.line}
                  viewBox="0 0 40 98"
                  preserveAspectRatio="none"
                >
                  <line x1="0" y1="0" x2="40" y2="49" />
                  <line x1="40" y1="49" x2="0" y2="98" />
                </svg>
              </div>
            )}

          </div>
        );
      })}
    </div>
  );
};

export default Steps;