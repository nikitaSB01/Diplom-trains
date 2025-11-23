import React, { useState, useRef, useEffect } from "react";
import styles from "./TicketField.module.css";

interface Props {
    label: string;
    max: number;
    hint: string;
}

const TicketField: React.FC<Props> = ({ label, max, hint }) => {
    const [value, setValue] = useState("0");
    const [isFocused, setIsFocused] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null); // ← ref

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!wrapperRef.current?.contains(e.target as Node)) {
                setIsFocused(false);
                setValue((v) => (v.trim() === "" ? "0" : v));
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputFocus = () => {
        setIsFocused(true);
        if (value === "0") setValue("");
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const raw = (e.target as HTMLInputElement).value;
        const digit = raw.replace(/\D/g, "");

        if (digit === "") {
            setValue("");
            return;
        }

        const last = digit[digit.length - 1];
        const num = Math.min(Number(last), max);

        setValue(String(num));
    };

    return (
        <div
            ref={wrapperRef}
            className={`${styles.wrapper} ${isFocused ? styles.active : ""}`}
        >
            <button
                type="button"
                className={styles.field}
                onClick={() => {
                    setIsFocused(true);
                    inputRef.current?.focus();   // ← автофокус
                }}
            >
                <span className={styles.label}>{label}</span>

                <input
                    ref={inputRef}                // ← привязали input
                    className={styles.input}
                    type="text"
                    value={value}
                    onInput={handleInput}
                    onFocus={handleInputFocus}
                />
            </button>

            {(isFocused || value !== "0") && (
                <div className={styles.hint}>{hint}</div>
            )}
        </div>
    );
};

export default TicketField;