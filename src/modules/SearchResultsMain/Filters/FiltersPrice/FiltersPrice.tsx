import React, { useState, useRef, useLayoutEffect } from "react";
import styles from "./FiltersPrice.module.css";

interface FiltersPriceProps {
  onChange?: (min: number, max: number) => void;
}

export const FiltersPrice: React.FC<FiltersPriceProps> = ({ onChange }) => {
  const minLimit = 500;
  const maxLimit = 7000;
  const minGap = 1100;
  const thumbWidth = 24;

  const [minValue, setMinValue] = useState(500);
  const [maxValue, setMaxValue] = useState(4500);
  const [sliderWidth, setSliderWidth] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (sliderRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        setSliderWidth(sliderRef.current?.offsetWidth || 0);
      });
      resizeObserver.observe(sliderRef.current);
      setSliderWidth(sliderRef.current.offsetWidth);
      return () => resizeObserver.disconnect();
    }
  }, []);

  const getXPosition = (value: number) => {
    const percent = (value - minLimit) / (maxLimit - minLimit);
    return percent * (sliderWidth - thumbWidth) + thumbWidth / 2;
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(Number(e.target.value), maxValue - minGap);
    setMinValue(newValue);
    onChange?.(newValue, maxValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(Number(e.target.value), minValue + minGap);
    setMaxValue(newValue);
    onChange?.(minValue, newValue);
  };

  const leftX = getXPosition(minValue);
  const rightX = getXPosition(maxValue);

  const hideStaticRight = maxValue >= 6000;
  const showStaticLeft = minValue >= 2900;

  const edgePadding = 6;
  const textWidth = 40;

  let minValueLeft = leftX - textWidth / 2;
  let maxValueLeft = rightX - textWidth / 2;

  if (minValueLeft < edgePadding) {
    minValueLeft = edgePadding;
  }
  if (maxValueLeft > sliderWidth - textWidth - edgePadding) {
    maxValueLeft = sliderWidth - textWidth - edgePadding;
  }

  return (
    <div className={styles.price}>
      <h3 className={styles.title}>Стоимость</h3>

      <div className={styles.labels}>
        <span>от</span>
        <span>до</span>
      </div>

      <div className={styles.sliderWrapper} ref={sliderRef}>
        <div className={styles.track}></div>

        <div
          className={styles.range}
          style={{
            left: `${leftX}px`,
            width: `${rightX - leftX}px`,
          }}
        />

        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={minValue}
          onChange={handleMinChange}
          className={`${styles.thumb} ${styles.thumbLeft}`}
        />
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={maxValue}
          onChange={handleMaxChange}
          className={`${styles.thumb} ${styles.thumbRight}`}
        />

        <div
          className={styles.value}
          style={{
            left: `${minValueLeft}px`,
            top: "43px",
          }}
        >
          {minValue}
        </div>

        <div
          className={styles.value}
          style={{
            left: `${maxValueLeft}px`,
            top: "43px",
          }}
        >
          {maxValue}
        </div>

        {!hideStaticRight && (
          <div className={`${styles.value} ${styles.staticRight}`}>{maxLimit}</div>
        )}

        {showStaticLeft && (
          <div className={`${styles.value} ${styles.staticLeft}`}>{minLimit}</div>
        )}
      </div>
    </div>
  );
};

export default FiltersPrice;