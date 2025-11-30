import React, { useState, useRef, useEffect } from "react";
import styles from "./CustomSelect.module.css";

interface Option {
    value: string;
    label: string;
}

interface Props {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
}

const CustomSelect: React.FC<Props> = ({ value, onChange, options }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // клик вне — закрываем
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const selected = options.find((opt) => opt.value === value);

    return (
        <div className={styles.wrapper} ref={ref}>
            <button
                className={styles.field}
                onClick={() => setOpen(!open)}
                type="button"
            >
                {selected?.label}
            </button>

            {open && (
                <ul className={styles.list}>
                    {options.map((opt) => (
                        <li key={opt.value}>
                            <button
                                type="button"
                                className={styles.itemBtn}
                                onClick={() => {
                                    onChange(opt.value);
                                    setOpen(false);
                                }}
                            >
                                {opt.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;