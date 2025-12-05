import React from "react";
import styles from "./PersonalDataBlock.module.css";

import { cleanLetters, capitalize, cleanEmail, formatPhone } from "../../../../utils/formatters";
import { validatePhone, validateEmail } from "../../../../utils/validation";

export interface PersonalData {
    lastName: string;
    firstName: string;
    middleName: string;
    phone: string;
    email: string;
}

interface Props {
    data: PersonalData;
    onChange: (field: keyof PersonalData, value: string) => void;
}

const PersonalDataBlock: React.FC<Props> = ({ data, onChange }) => {

    const handleName = (field: keyof PersonalData, value: string) => {
        const clean = cleanLetters(value);
        const ready = capitalize(clean);
        onChange(field, ready);
    };

    const handlePhone = (value: string) => {
        const formatted = formatPhone(value);
        onChange("phone", formatted);
    };

    const handleEmail = (value: string) => {
        const clean = cleanEmail(value);
        onChange("email", clean);
    };

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.title} ${styles.border}`}>
                <h2 className={styles.titleText}>Персональные данные</h2>
            </div>

            <div className={`${styles.containerForm} ${styles.border}`}>

                {/* ====== Фамилия / Имя / Отчество ====== */}
                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.personalLabel} htmlFor="lastName">Фамилия</label>
                        <input
                            id="lastName"
                            className={styles.personalInput}
                            value={data.lastName}
                            onChange={(e) => handleName("lastName", e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.personalLabel} htmlFor="firstName">Имя</label>
                        <input
                            id="firstName"
                            className={styles.personalInput}
                            value={data.firstName}
                            onChange={(e) => handleName("firstName", e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.personalLabel} htmlFor="middleName">Отчество</label>
                        <input
                            id="middleName"
                            className={styles.personalInput}
                            value={data.middleName}
                            onChange={(e) => handleName("middleName", e.target.value)}
                        />
                    </div>
                </div>

                {/* ====== Телефон ====== */}
                <div className={styles.row}>
                    <div className={styles.fieldFull}>
                        <label className={styles.personalLabel} htmlFor="phone">Контактный телефон</label>
                        <input
                            id="phone"
                            className={`${styles.personalInput} ${styles.inputNumber}`}
                            value={data.phone}
                            onChange={(e) => handlePhone(e.target.value)}
                            placeholder="+7 ___ ___ __ __"
                        />
                        {!validatePhone(data.phone) && data.phone !== "" && (
                            <div className={styles.error}>Некорректный номер телефона</div>
                        )}
                    </div>
                </div>

                {/* ====== Email ====== */}
                <div className={styles.row}>
                    <div className={styles.fieldFull}>
                        <label className={styles.personalLabel} htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            className={`${styles.personalInput} ${styles.inputEmail}`}
                            value={data.email}
                            onChange={(e) => handleEmail(e.target.value)}
                            placeholder="inbox@gmail.ru"

                        />
                        {!validateEmail(data.email) && data.email !== "" && (
                            <div className={styles.error}>Некорректный E-mail</div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PersonalDataBlock;