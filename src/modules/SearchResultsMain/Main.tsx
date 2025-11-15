import React from 'react';

import styles from './Main.module.css';
import Steps from '../../components/Steps/Steps';
import Filters from '../../components/SearchPageMain/Filters/Filters';
import FiltersLastTickets from '../../components/SearchPageMain/FiltersLastTickets/FiltersLastTickets';
import Trains from '../../components/SearchPageMain/Trains/Trains';
import { useLocation } from 'react-router-dom';

const Main: React.FC = () => {
  const location = useLocation();
  const { from, to, dateStart, dateEnd } = location.state || {};
  /*   проверки в виде вывода в консоль   */
  console.log("FROM CITY:", from);
  console.log("TO CITY:", to);
  console.log("DATE START:", dateStart);
  console.log("DATE END:", dateEnd);

  return (
    <section className={styles.main}>
      <Steps currentStep={2} />
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <Filters />
          <FiltersLastTickets />
        </div>
        <div className={styles.rightColumn}>
          {from && to && (
            <Trains
              fromCity={from}
              toCity={to}
              dateStart={dateStart}
              dateEnd={dateEnd}
            />
          )}
        </div>
        {/*   <Trains
            fromCity={{ _id: "67ceb6548c75f00047c8f78f", name: "астрахань" }}
            toCity={{ _id: "67ceb6548c75f00047c8f78d", name: "москва" }}
            dateStart="2024-01-11"
            dateEnd="2024-01-13"
          />
           */}
      </div>
    </section>
  );
};

export default Main;
