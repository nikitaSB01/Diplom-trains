import React from 'react';

import styles from './Main.module.css';
import Steps from '../../components/Steps/Steps';
import Filters from '../../components/SearchPageMain/Filters/Filters';
import FiltersLastTickets from '../../components/SearchPageMain/FiltersLastTickets/FiltersLastTickets';
import Trains from '../../components/SearchPageMain/Trains/Trains';


const Main: React.FC = () => {
  return (
    <section className={styles.main}>
      <Steps currentStep={2} /> {/* 1 - активный шаг */}
      <div className={styles.container}>
        <Filters /> 
        <FiltersLastTickets /> 
        <Trains/>
      </div>
    </section>
  );
};

export default Main;
