import React, { useState } from "react";
import styles from "./Track.module.css";

interface TrackProps {
  label: string;
}

export const Track: React.FC<TrackProps> = ({ label }) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(11);

  return (
    <div className={styles.track}>
      <p className={styles.label}>{label}</p>
      <div className={styles.sliderContainer}>
        <input
          type="range"
          min="0"
          max="24"
          value={minValue}
          onChange={(e) => setMinValue(Number(e.target.value))}
          className={`${styles.slider} ${styles.min}`}
        />
        <input
          type="range"
          min="0"
          max="24"
          value={maxValue}
          onChange={(e) => setMaxValue(Number(e.target.value))}
          className={`${styles.slider} ${styles.max}`}
        />
        <div className={styles.trackLine}></div>
      </div>
      <div className={styles.values}>
        <span>{minValue}:00</span>
        <span>{maxValue}:00</span>
        <span>24:00</span>
      </div>
    </div>
  );
};

export default Track;