import React from "react";
import styles from "./FioFields.module.css";

interface FioData {
    lastName: string;
    firstName: string;
    middleName: string;
}

interface Props {
    data: FioData;
    onChange: (patch: Partial<FioData>) => void;
    cleanLetters: (v: string) => string;
    capitalize: (v: string) => string;
    highlight?: boolean;
}

const FioFields: React.FC<Props> = ({ data, onChange, cleanLetters, capitalize, highlight }) => {

    const handle = (field: keyof FioData, value: string) => {
        const cleaned = cleanLetters(value);
        const formatted = capitalize(cleaned);
        onChange({ [field]: formatted });
    };
    const labelCls = [
        styles.personalLabel,
        highlight ? styles.highlightLabel : ""
    ].join(" ");

    return (
        <div className={styles.row3}>
            {/* Фамилия */}
            <div className={styles.field}>
                <label className={labelCls} htmlFor="fio-lastName">Фамилия</label>
                <input
                    id="fio-lastName"
                    value={data.lastName}
                    onChange={(e) => handle("lastName", e.target.value)}
                    className={styles.personalInput}
                />
            </div>

            {/* Имя */}
            <div className={styles.field}>
                <label className={labelCls} htmlFor="fio-firstName">Имя</label>
                <input
                    id="fio-firstName"
                    value={data.firstName}
                    onChange={(e) => handle("firstName", e.target.value)}
                    className={styles.personalInput}
                />
            </div>

            {/* Отчество */}
            <div className={styles.field}>
                <label className={labelCls} htmlFor="fio-middleName">Отчество</label>
                <input
                    id="fio-middleName"
                    value={data.middleName}
                    onChange={(e) => handle("middleName", e.target.value)}
                    className={styles.personalInput}
                />
            </div>
        </div>
    );
};

export default FioFields;