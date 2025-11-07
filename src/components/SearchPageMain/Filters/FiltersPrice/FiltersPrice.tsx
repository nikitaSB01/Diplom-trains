import React, { useState, useRef, useLayoutEffect } from "react";
import styles from "./FiltersPrice.module.css";

export const FiltersPrice: React.FC = () => {
    const minLimit = 1920;
    const maxLimit = 7000;
    const minGap = 1000;

    const [minValue, setMinValue] = useState(1920);
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

    const hideStaticRight = maxValue >= 5950;
    const showStaticLeft = minValue >= 2970;

    // === вычисляем безопасную позицию, чтобы не выходить за края ===
    const getSafePosition = (percent: number, value: number): React.CSSProperties => {
        const position = (percent / 100) * sliderWidth;
        const textWidth = String(value).length * 9 + 10; // приблизительная ширина текста

        // если число у левого края
        if (position - textWidth / 2 < 0) {
            return { left: 0, transform: "none" };
        }

        // если число у правого края
        if (position + textWidth / 2 > sliderWidth) {
            return { right: 0, transform: "none" };
        }

        // стандартное положение под бегунком
        return { left: `${position}px`, transform: "translateX(-50%)" };
    };

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
                        left: `${leftPercent}%`,
                        width: `${rightPercent - leftPercent}%`,
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

                {/* значения под бегунками */}
                <div
                    className={styles.value}
                    style={{
                        top: "43px",
                        ...getSafePosition(leftPercent, minValue),
                    }}
                >
                    {minValue}
                </div>

                <div
                    className={styles.value}
                    style={{
                        top: "43px",
                        ...getSafePosition(rightPercent, maxValue),
                    }}
                >
                    {maxValue}
                </div>

                {/* статичное 7000 */}
                {!hideStaticRight && (
                    <div className={`${styles.value} ${styles.staticRight}`}>
                        {maxLimit}
                    </div>
                )}

                {/* статичное 1920 */}
                {showStaticLeft && (
                    <div className={`${styles.value} ${styles.staticLeft}`}>
                        {minLimit}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FiltersPrice;