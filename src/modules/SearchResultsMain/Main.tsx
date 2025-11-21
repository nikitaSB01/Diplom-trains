import React, { useEffect, useState } from "react";

import styles from './Main.module.css';
import Steps from '../../components/Steps/Steps';
import Filters from '../../components/SearchPageMain/Filters/Filters';
import FiltersLastTickets from '../../components/SearchPageMain/FiltersLastTickets/FiltersLastTickets';
import Trains from '../../components/SearchPageMain/Trains/Trains';
import { useLocation } from 'react-router-dom';
import { FiltersState } from "../../types/filtersTypes/filtersTypes";
import LoaderGif from "../../assets/gif/анимация-загрузки.gif"


const Main: React.FC = () => {
  const location = useLocation();
  const { from, to, dateStart, dateEnd } = location.state || {};

  const [filters, setFilters] = useState<FiltersState>({
    options: {},
    price: null,

    thereDeparture: null,
    thereArrival: null,

    backDeparture: null,
    backArrival: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 400); // минимальное время лоадера
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <section className={styles.main}>

      {/* Лоадер на 780px поверх */}
      {showLoader && (
        <div className={styles.loaderOverlay}>
          <p className={styles.loadingText}>Идёт поиск</p>
          <img src={LoaderGif} alt="" className={styles.loaderGif} />
        </div>
      )}

      {/* Контейнер всегда в DOM */}
      <div
        className={`${styles.mainContainer} ${showLoader ? styles.loadingState : ""}`}
      >
        <Steps currentStep={1} />

        <div className={styles.container}>
          <div className={styles.leftColumn}>
            <Filters onChange={setFilters} dateStart={dateStart}
              dateEnd={dateEnd} />
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
                onLoadingChange={setIsLoading}
              />
            )}
          </div>
        </div>
      </div>

    </section>
  );
}

export default Main;


