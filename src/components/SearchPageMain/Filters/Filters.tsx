import React from "react";
import styles from "./Filters.module.css";

// временные заглушки для будущих модулей
import { DateInput } from "../../../modules/SearchForm/input/date/DateInput"
import { FiltersOptions } from "../Filters/FiltersOptions/FiltersOptions";
import { FiltersPrice } from "../Filters/FiltersPrice/FiltersPrice";
import { FiltersThereBack } from "../Filters/FiltersThereBake/FiltersThereBack";


export const Filters: React.FC = () => {
  return (
    <aside className={styles.filters}>
      <div className={styles.inner}>
        <div className={styles.DateInputs}>
          <div className={styles.InputsOne}>
            <span className={styles.inputsSpan}>Дата  поездки</span>
            <DateInput placeholder="ДД/ММ/ГГ" isCompact />
          </div>
          <div className={styles.InputsTwo}>
            <span className={styles.inputsSpan}>Дата возвращения</span>
            <DateInput placeholder="ДД/ММ/ГГ" isCompact />
          </div>
        </div>
        <FiltersOptions />
        <FiltersPrice />
        <FiltersThereBack title="Туда" />
        <FiltersThereBack title="Обратно" />
      </div>
    </aside>
  );
};

export default Filters