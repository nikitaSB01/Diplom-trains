import React, { useState } from "react";
import styles from "./FiltersPrice.module.css";

export const FiltersPrice: React.FC = () => {
    const minLimit = 1920;
    const maxLimit = 7000;
    const minGap = 1000; // минимальная разница между значениями

    const [minValue, setMinValue] = useState(1920);
    const [maxValue, setMaxValue] = useState(4500);

    const getPercent = (value: number) =>
        ((value - minLimit) / (maxLimit - minLimit)) * 100;

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.min(Number(e.target.value), maxValue - minGap);
        setMinValue(newValue);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.max(Number(e.target.value), minValue + minGap);
        setMaxValue(newValue);
    };

    const leftPercent = getPercent(minValue);
    const rightPercent = getPercent(maxValue);

    // Насколько близко друг к другу (в процентах ширины)
    const valuesTooClose = rightPercent - leftPercent < 15;

    // Скрываем статичное 7000, когда правый бегунок ушёл далеко вправо
    const hideStaticRight = maxValue > 5780;

    // --- стили для левого значения ---
    const leftValueStyle: React.CSSProperties = {
        top: 35,
    };

    if (leftPercent < 5) {
        // очень близко к левому краю — прижимаем к краю
        leftValueStyle.left = 0;
    } else if (valuesTooClose) {
        // значения рядом — чуть уводим левое влево
        leftValueStyle.left = `${leftPercent}%`;
        leftValueStyle.transform = "translateX(-60%)";
    } else {
        // обычное положение — по центру под бегунком
        leftValueStyle.left = `${leftPercent}%`;
        leftValueStyle.transform = "translateX(-50%)";
    }

    // --- стили для правого значения ---
    const rightValueStyle: React.CSSProperties = {
        top: 35,
    };

    if (rightPercent > 95) {
        // очень близко к правому краю — прижимаем к краю
        rightValueStyle.right = hideStaticRight ? 0 : 48; // 48px отступ от статичного 7000
    } else if (valuesTooClose) {
        // значения рядом — чуть уводим правое вправо
        rightValueStyle.left = `${rightPercent}%`;
        rightValueStyle.transform = "translateX(-40%)";
    } else {
        // обычное положение — по центру под бегунком
        rightValueStyle.left = `${rightPercent}%`;
        rightValueStyle.transform = "translateX(-50%)";
    }

    return (
        <div className={styles.price}>
            <h3 className={styles.title}>Стоимость</h3>

            <div className={styles.labels}>
                <span>от</span>
                <span>до</span>
            </div>

            <div className={styles.sliderWrapper}>
                {/* полоса */}
                <div className={styles.track} />
                <div
                    className={styles.range}
                    style={{
                        left: `${leftPercent}%`,
                        width: `${rightPercent - leftPercent}%`,
                    }}
                />

                {/* бегунки */}
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

                {/* значения под бегунками */}
                <div className={styles.value} style={leftValueStyle}>
                    {minValue}
                </div>

                <div className={styles.value} style={rightValueStyle}>
                    {maxValue}
                </div>

                {/* статичное 7000 на том же уровне */}
                {!hideStaticRight && (
                    <div className={`${styles.value} ${styles.staticRight}`}>{maxLimit}</div>
                )}
            </div>
        </div>
    );
};

export default FiltersPrice;