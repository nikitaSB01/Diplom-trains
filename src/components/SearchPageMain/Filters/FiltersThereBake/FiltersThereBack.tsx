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

  passengerMode?: boolean;
  trainData?: any; // orderData.train.departure OR arrival
}

export const FiltersThereBack: React.FC<FiltersThereBackProps> = ({
  title,
  onDepartureChange,
  onArrivalChange,
  passengerMode = false,
  trainData,
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

  // форматирование времени
  const formatTime = (timestamp: number) => {
    const d = new Date(timestamp * 1000);
    return d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp * 1000);
    return d.toLocaleDateString("ru-RU");
  };

  // формат времени в пути
  const formatDuration = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    return `${h} ч ${m} мин`;
  };

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

      {/* --- режим PASSENGER MODE --- */}
      {passengerMode && trainData && isOpen && (
        <div className={styles.passengerInfo}>
          <p className={styles.trainNumber}>{trainData.train.name}</p>

          <p className={styles.route}>
            {trainData.from.city.name} — {trainData.to.city.name}
          </p>

          <div className={styles.timeBlock}>
            <div className={styles.col}>
              <p className={styles.time}>{formatTime(trainData.from.datetime)}</p>
              <p className={styles.date}>{formatDate(trainData.from.datetime)}</p>
              <p className={styles.city}>{trainData.from.city.name}</p>
              <p className={styles.station}>{trainData.from.railway_station_name}</p>
            </div>

            <div className={styles.center}>
              <ArrowThereIcon />
              <p className={styles.duration}>{formatDuration(trainData.duration)}</p>
            </div>

            <div className={styles.col}>
              <p className={styles.time}>{formatTime(trainData.to.datetime)}</p>
              <p className={styles.date}>{formatDate(trainData.to.datetime)}</p>
              <p className={styles.city}>{trainData.to.city.name}</p>
              <p className={styles.station}>{trainData.to.railway_station_name}</p>
            </div>
          </div>
        </div>
      )}

      {/* --- обычный режим (Search Page) --- */}
      {!passengerMode && isOpen && (
        <div className={styles.body}>
          <Track label="Время отбытия" onChange={setDeparture} />
          <Track label="Время прибытия" align="right" onChange={setArrival} />
        </div>
      )}
    </div>
  );
};

export default FiltersThereBack;