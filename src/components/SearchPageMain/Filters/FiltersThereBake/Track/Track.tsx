import React, { useState, useRef, useEffect } from "react";
import styles from "./Track.module.css";

interface TrackProps {
    label: string;
    align?: "left" | "right";
}

export const Track: React.FC<TrackProps> = ({ label, align = "left" }) => {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(15);
    const [sliderWidth, setSliderWidth] = useState(0);

    const sliderRef = useRef<HTMLDivElement>(null);
    const minGap = 6; // минимальное расстояние между ползунками
    const thumbSize = 18; // диаметр ползунка

    useEffect(() => {
        if (sliderRef.current) {
            setSliderWidth(sliderRef.current.offsetWidth);
        }
    }, []);

    const formatTime = (val: number) => `${val}:00`;

    // Конвертация значения в пиксели
    const getPos = (value: number) => (value / 24) * sliderWidth;

    // Коррекция позиции числового блока (как в FiltersPrice)
    const getSafeValuePosition = (x: number, textWidth = 40) => {
        if (x < textWidth / 2) return 0;
        if (x > sliderWidth - textWidth / 2) return sliderWidth - textWidth;
        return x - textWidth / 2;
    };

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (newValue <= maxValue - minGap) setMinValue(newValue);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (newValue >= minValue + minGap) setMaxValue(newValue);
    };

    const minPos = getPos(minValue);
    const maxPos = getPos(maxValue);

    const hideLeftStatic = minValue <= 4;
    const hideRightStatic = maxValue >= 19;

    return (
        <div className={styles.price}>
            <p className={`${styles.title} ${align === "right" ? styles.titleRight : ""}`}>
                {label}
            </p>

            <div className={styles.sliderWrapper} ref={sliderRef}>
                <div className={styles.track}></div>

                {/* Линия диапазона от центра до центра */}
                <div
                    className={styles.range}
                    style={{
                        left: `${(minValue / 24) * 100}%`,
                        right: `${100 - (maxValue / 24) * 100}%`,
                    }}
                ></div>

                <input
                    type="range"
                    min="0"
                    max="24"
                    value={minValue}
                    onChange={handleMinChange}
                    className={styles.thumb}
                />
                <input
                    type="range"
                    min="0"
                    max="24"
                    value={maxValue}
                    onChange={handleMaxChange}
                    className={styles.thumb}
                />

                {/* Значения под ползунками */}
                <span
                    className={styles.value}
                    style={{ left: `${getSafeValuePosition(minPos)}px` }}
                >
                    {formatTime(minValue)}
                </span>
                <span
                    className={styles.value}
                    style={{ left: `${getSafeValuePosition(maxPos)}px` }}
                >
                    {formatTime(maxValue)}
                </span>

                {/* Краевые значения */}
                {!hideLeftStatic && (
                    <span className={`${styles.value} ${styles.staticLeft}`}>0:00</span>
                )}
                {!hideRightStatic && (
                    <span className={`${styles.value} ${styles.staticRight}`}>24:00</span>
                )}
            </div>
        </div>
    );
};

export default Track;