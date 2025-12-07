import React, { useState, useEffect } from "react";
import styles from "./FiltersThereBack.module.css";

import { ReactComponent as ArrowThereIcon } from "../../../../assets/icons/Filters/FiltersThereBack/arrowThere.svg";
import { ReactComponent as ArrowBackIcon } from "../../../../assets/icons/Filters/FiltersThereBack/arrowBack.svg";
import { ReactComponent as ArrowBetween } from "../../../../assets/icons/ChoiceLocationTrains/arrowBetween.svg";
import { ReactComponent as ArrowBetweenBack } from "../../../../assets/icons/ChoiceLocationTrains/arrowBetweenBack.svg";
import { ReactComponent as ToggleIconPlus } from "../../../../assets/icons/Filters/FiltersThereBack/plus.svg";
import { ReactComponent as ToggleIconMinus } from "../../../../assets/icons/Filters/FiltersThereBack/minus.svg";
import Track from "./Track/Track";
import { formatTime, formatDate } from "../../../../utils/format";
import TrainDirections from "../../../../components/shared/TrainInfo/TrainDirections/TrainDirections";

interface FiltersThereBackProps {
  title: "Туда" | "Обратно";

  onDepartureChange?: (v: { from: number; to: number } | null) => void;
  onArrivalChange?: (v: { from: number; to: number } | null) => void;

  passengerMode?: boolean;
  trainData?: any;
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

  // формат времени в пути для страницу с пассажирами
  const formatDuration = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    return `${h}:${m.toString().padStart(2, "0")}`;
  };

  /* Авто-открытие на странице PassengersPage */
  useEffect(() => {
    if (passengerMode && trainData) {
      setIsOpen(true);
    }
  }, [passengerMode, trainData]);

  // --- корректная ориентация данных для Туда / Обратно ---
  const fromData =
    title === "Туда"
      ? trainData?.from
      : trainData?.to;

  const toData =
    title === "Туда"
      ? trainData?.to
      : trainData?.from;


  return (
    <div
      className={
        passengerMode
          ? `${styles.container} ${styles.containerPassenger}`
          : styles.container
      }
    ><button className={styles.header} onClick={() => setIsOpen(!isOpen)} type="button">
        <div className={styles.headerLeft}>
          <div className={styles.iconWrapper}>
            {title === "Туда" ? <ArrowThereIcon /> : <ArrowBackIcon />}
          </div>
          <p className={styles.title}>{title}</p>
          {/* ---- ДОБАВЛЯЕМ ДАТУ ТОЛЬКО В PASSENGER MODE ---- */}
          {passengerMode && trainData && (
            <p className={styles.dateHeader}>
              {formatDate(trainData.from.datetime)}
            </p>
          )}
        </div>
        <div className={styles.toggle}>
          {isOpen ? <ToggleIconMinus /> : <ToggleIconPlus className={styles.togglePlus} />}
        </div>
      </button>

      {/* --- режим PASSENGER MODE --- */}
      {passengerMode && trainData && isOpen && (
        <div className={styles.tripContent}>
          <div className={styles.row}>
            <p className={styles.label}>№ Поезда</p>
            <p className={styles.value}>{trainData.train.name}</p>
          </div>

          <div className={styles.row}>
            <p className={styles.label}>Название</p>
            <div className={styles.direction}>
              <p>{fromData.city.name}</p>
              <p>{toData.city.name}</p>
            </div>
          </div>

          <div className={styles.timesWrapper}>

            <TrainDirections
              departure={{
                from: fromData,
                to: toData,
                duration: trainData.duration
              }}
              showDates
              useChoiceLocation={false}
              variant="passenger"
              arrowDirection={title === "Туда" ? "forward" : "back"}
            />

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