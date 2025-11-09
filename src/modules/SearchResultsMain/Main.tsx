import React from 'react';

import styles from './Main.module.css';
import Steps from '../../components/Steps/Steps';
import Filters from '../../components/SearchPageMain/Filters/Filters';
import FiltersLastTickets from '../../components/SearchPageMain/FiltersLastTickets/FiltersLastTickets';
import Trains from '../../components/SearchPageMain/Trains/Trains';

const Main: React.FC = () => {
  return (
    <section className={styles.main}>
      <Steps currentStep={2} />
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <Filters />
          <FiltersLastTickets />
        </div>
        <div className={styles.rightColumn}>
          <Trains
            fromCity={{ _id: "67ceb6548c75f00047c8f78d", name: "москва" }}
            toCity={{ _id: "67ceb6548c75f00047c8f78e", name: "санкт-петербург" }}
            dateStart="2024-03-01"
            dateEnd="2024-03-02"
          />
        </div>
      </div>
    </section>
  );
};

export default Main;
