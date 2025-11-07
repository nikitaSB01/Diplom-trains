import React from "react";
import styles from "./Filters.module.css";

// временные заглушки для будущих модулей
import { DateInput } from "../../../modules/SearchForm/input/date/DateInput"
import { FiltersOptions } from "../Filters/FiltersOptions/FiltersOptions";
import { FiltersPrice } from "../Filters/FiltersPrice/FiltersPrice";
import FiltersThereBack from "../Filters/FiltersThereBake/FiltersThereBack";

/*   import { FiltersThere } from "../FiltersThere/FiltersThere";
import { FiltersBack } from "../FiltersBack/FiltersBack"; */

export const Filters: React.FC = () => {
  return (
    <aside className={styles.filters}>
      <div className={styles.inner}>
        <div className={styles.DateInputs}>
          <div className={styles.InputsOne}>
            <span>Дата отправлления</span>
            <DateInput placeholder="ДД/ММ/ГГ" />
          </div>
          <div className={styles.InputsTwo}>
            <span>Дата возвращения</span>
            <DateInput placeholder="ДД/ММ/ГГ" />
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