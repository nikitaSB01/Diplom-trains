import React, { useEffect, useState } from "react";

import styles from './Main.module.css';
import Steps from '../../components/Steps/Steps';
import Filters from '../../components/SearchPageMain/Filters/Filters';
import FiltersLastTickets from '../../components/SearchPageMain/FiltersLastTickets/FiltersLastTickets';
import Trains from '../../components/SearchPageMain/Trains/Trains';
import { useLocation } from 'react-router-dom';
import { FiltersState } from "../../types/filtersTypes/filtersTypes";

const Main: React.FC = () => {

  const location = useLocation();
  const { from, to, dateStart, dateEnd } = location.state || {};
  // проверки в виде вывода в консоль
  /* console.log("FROM CITY:", from);
  console.log("TO CITY:", to);
  console.log("DATE START:", dateStart);
  console.log("DATE END:", dateEnd); */
  
  const [filters, setFilters] = useState<FiltersState>({
    options: {},
    price: null,

    thereDeparture: null,
    thereArrival: null,

    backDeparture: null,
    backArrival: null,
  });


  return (
    <section className={styles.main}>
      <Steps currentStep={2} />
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <Filters onChange={setFilters} />
          <FiltersLastTickets />
        </div>
        <div className={styles.rightColumn}>
          {from && to && (
            <Trains
              fromCity={from}
              toCity={to}
              dateStart={dateStart}
              dateEnd={dateEnd}
              filters={filters}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Main;
