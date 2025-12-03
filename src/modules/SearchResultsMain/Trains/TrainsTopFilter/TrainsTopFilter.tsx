import React, { useState } from "react";
import styles from "./TrainsTopFilter.module.css";

interface TrainsTopFilterProps {
    total: number;                          // найдено поездов
    sort: string;                           // текущая сортировка
    onSortChange: (value: string) => void;  // смена сортировки

    limit: number;                          // текущий лимит (5 / 10 / 20)
    onLimitChange: (value: number) => void; // смена лимита
}

const TrainsTopFilter: React.FC<TrainsTopFilterProps> = ({
    total,
    sort,
    onSortChange,
    limit,
    onLimitChange,
}) => {

    const [openSort, setOpenSort] = useState(false);

    return (
        <div className={styles.wrapper}>
            {/* Левая часть — сколько найдено */}
            <div className={styles.total}>найдено {total}</div>

            {/* Правая часть */}
            <div className={styles.rightSection}>

                {/* Сортировка */}
                <div className={styles.sortBlock}>
                    <span className={styles.label}>сортировать по:</span>

                    <div
                        className={styles.sortCurrent}
                        role="button"
                        tabIndex={0}
                        onClick={() => setOpenSort(!openSort)}
                        onKeyDown={(e) => e.key === "Enter" && setOpenSort(!openSort)}
                    >
                        {sort}
                    </div>
                </div>

                {openSort && (
                    <div className={styles.dropdown}>
                        <div
                            className={styles.option}
                            role="button"
                            tabIndex={0}
                            onClick={() => { onSortChange("времени"); setOpenSort(false); }}
                            onKeyDown={(e) => e.key === "Enter" && (onSortChange("времени"), setOpenSort(false))}
                        >
                            времени
                        </div>

                        {/*  <div
                            className={styles.option}
                            role="button"
                            tabIndex={0}
                            onClick={() => { onSortChange("стоимости"); setOpenSort(false); }}
                            onKeyDown={(e) => e.key === "Enter" && (onSortChange("стоимости"), setOpenSort(false))}
                        >
                            стоимости
                        </div> */}

                        <div
                            className={styles.option}
                            role="button"
                            tabIndex={0}
                            onClick={() => { onSortChange("длительности"); setOpenSort(false); }}
                            onKeyDown={(e) => e.key === "Enter" && (onSortChange("длительности"), setOpenSort(false))}
                        >
                            длительности
                        </div>
                    </div>
                )}
                {/* Показать по */}
                <div className={styles.limitBlock}>
                    <span className={styles.label}>показывать по:</span>

                    {[5, 10, 20].map((num) => (
                        <span
                            key={num}
                            role="button"
                            tabIndex={0}
                            className={`${styles.limitNumber} ${limit === num ? styles.activeLimit : ""}`}
                            onClick={() => onLimitChange(num)}
                            onKeyDown={(e) => e.key === "Enter" && onLimitChange(num)}
                        >
                            {num}
                        </span>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default TrainsTopFilter;