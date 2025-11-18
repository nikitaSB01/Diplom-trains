import React, { useState, useEffect } from "react";
import styles from "./FiltersThereBack.module.css";

import { ReactComponent as ArrowThereIcon } from "../../../../assets/icons/Filters/FiltersThereBack/arrowThere.svg";
import { ReactComponent as ArrowBackIcon } from "../../../../assets/icons/Filters/FiltersThereBack/arrowBack.svg";
import { ReactComponent as ToggleIconPlus } from "../../../../assets/icons/Filters/FiltersThereBack/plus.svg";
import { ReactComponent as ToggleIconMinus } from "../../../../assets/icons/Filters/FiltersThereBack/minus.svg";
import Track from "./Track/Track";



interface FiltersThereBackProps {
  title: "Туда" | "Обратно";
  onDepartureChange?: (v: { from: number; to: number } | null) => void;
  onArrivalChange?: (v: { from: number; to: number } | null) => void;
}

export const FiltersThereBack: React.FC<FiltersThereBackProps> = ({
  title,
  onDepartureChange,
  onArrivalChange,
}) => {

  const [isOpen, setIsOpen] = useState(false);

  const [departure, setDeparture] = useState<{ from: number; to: number } | null>(null);
  const [arrival, setArrival] = useState<{ from: number; to: number } | null>(null);

  useEffect(() => {
    onDepartureChange?.(departure);
  }, [departure]);

  useEffect(() => {
    onArrivalChange?.(arrival);
  }, [arrival]);

  return (
    <div className={styles.container}>
      <button className={styles.header} onClick={() => setIsOpen(!isOpen)} type="button">
        <div className={styles.headerLeft}>
          <div className={styles.iconWrapper}>
            {title === "Туда" ? <ArrowThereIcon /> : <ArrowBackIcon />}
          </div>
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.toggle}>
          {isOpen ? <ToggleIconMinus /> : <ToggleIconPlus />}
        </div>
      </button>

      {isOpen && (
        <div className={styles.body}>
          <Track label="Время отбытия" onChange={setDeparture} />
          <Track label="Время прибытия" align="right" onChange={setArrival} />
        </div>
      )}
    </div>
  );
};

export default FiltersThereBack;