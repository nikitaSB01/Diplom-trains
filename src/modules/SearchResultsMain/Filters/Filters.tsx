import React, { useState, useEffect } from "react";
import styles from "./Filters.module.css";

// модули
import { DateInput } from "../../../modules/SearchForm/input/date/DateInput"
import { FiltersOptions } from "../Filters/FiltersOptions/FiltersOptions";
import { FiltersPrice } from "../Filters/FiltersPrice/FiltersPrice";
import { FiltersThereBack } from "../Filters/FiltersThereBake/FiltersThereBack";
import { FiltersState } from "../../../types/filtersTypes/filtersTypes";



export const Filters: React.FC<{
  onChange: (filters: FiltersState) => void, dateStart?: string;
  dateEnd?: string;
}> = ({
  onChange, dateStart, dateEnd
}) => {
    const [options, setOptions] = useState({
      coupe: false,
      plaz: false,
      seat: false,
      lux: false,
      wifi: false,
      express: false,
    });

    const [price, setPrice] = useState<[number, number] | null>(null);

    const [thereDeparture, setThereDeparture] = useState<{ from: number; to: number } | null>(null);
    const [thereArrival, setThereArrival] = useState<{ from: number; to: number } | null>(null);

    const [backDeparture, setBackDeparture] = useState<{ from: number; to: number } | null>(null);
    const [backArrival, setBackArrival] = useState<{ from: number; to: number } | null>(null);

    useEffect(() => {
      onChange({
        options,
        price,
        thereDeparture,
        thereArrival,
        backDeparture,
        backArrival,
      });
    }, [options, price, thereDeparture, thereArrival, backDeparture, backArrival]);

    return (
      <aside className={styles.filters}>
        <div className={styles.inner}>
          <div className={styles.DateInputs}>
            <div className={styles.InputsOne}>
              <span className={styles.inputsSpan}>Дата  поездки</span>
              <DateInput placeholder="ДД/ММ/ГГ" isCompact value={dateStart}/>
            </div>
            <div className={styles.InputsTwo}>
              <span className={styles.inputsSpan}>Дата возвращения</span>
              <DateInput placeholder="ДД/ММ/ГГ" isCompact value={dateEnd}/>
            </div>
          </div>

          <FiltersOptions onChange={setOptions} />

          <FiltersPrice onChange={(min, max) => setPrice([min, max])} />

          {/* Фильтр времени → ТУДА */}
          <FiltersThereBack
            title="Туда"
            onDepartureChange={setThereDeparture}
            onArrivalChange={setThereArrival}
          />

          {/* Фильтр времени → ОБРАТНО */}
          <FiltersThereBack
            title="Обратно"
            onDepartureChange={setBackDeparture}
            onArrivalChange={setBackArrival}
          />

        </div>
      </aside>
    );
  };

export default Filters;