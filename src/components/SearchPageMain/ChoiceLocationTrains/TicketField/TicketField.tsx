import React, { useState, useRef, useEffect } from "react";
import styles from "./TicketField.module.css";

interface Props {
    label: string;        // "Детских —"
    max: number;          // лимит, например 3
}

const TicketField: React.FC<Props> = ({ label, max }) => {
    const [value, setValue] = useState("0");
    const [isFocused, setIsFocused] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    // Убираем желтую границу при клике вне, НО подсказку НЕ скрываем
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!wrapperRef.current?.contains(e.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const num = e.target.value.replace(/\D/g, "");
        if (num === "") return setValue("0");

        const parsed = Math.min(Number(num), max);
        setValue(String(parsed));
    };

    return (
        <div
            className={`${styles.wrapper} ${isFocused ? styles.active : ""}`}
            ref={wrapperRef}
        >
            <button
                type="button"
                className={styles.field}
                onClick={() => setIsFocused(true)}
            ><span className={styles.label}>{label}</span>
                <input
                    className={styles.input}
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                />
            </button>

            {/* Подсказка: показывается при фокусе И после ввода */}
            <div className={styles.hint}>
                Можно добавить 3 детей до 10 лет.
                Свое место в вагоне, как у взрослых, но дешевле
                в среднем на 50–65%
            </div>
        </div>
    );
};

export default TicketField;