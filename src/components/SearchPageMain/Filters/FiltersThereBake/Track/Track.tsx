import React, { useState, useRef, useEffect } from "react";
import styles from "./Track.module.css";

interface TrackProps {
    label: string;
}

export const Track: React.FC<TrackProps> = ({ label }) => {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(15);
    const [sliderWidth, setSliderWidth] = useState(0);

    const sliderRef = useRef<HTMLDivElement>(null);
    const minGap = 3; // минимальное расстояние между ползунками (в часах)

    useEffect(() => {
        if (sliderRef.current) {
            setSliderWidth(sliderRef.current.offsetWidth);
        }
    }, []);

    const formatTime = (val: number) => `${val}:00`;

    const getPos = (value: number) => (value / 24) * sliderWidth;

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

    // ✅ правильные условия скрытия статических подписей
    const hideLeftStatic = minValue <= 5;
    const hideRightStatic = maxValue >= 18;

    return (
        <div className={styles.price}>
            <p className={styles.title}>{label}</p>

            <div className={styles.sliderWrapper} ref={sliderRef}>
                <div className={styles.track}></div>
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

                {/* Цифры под ползунками */}
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

                {/* Фиксированные подписи */}
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