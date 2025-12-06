import React from "react";
import styles from "./PersonalDataBlock.module.css";
import FioFields from "../../../../components/shared/FioFields/FioFields";

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
                <FioFields
                    data={{
                        lastName: data.lastName,
                        firstName: data.firstName,
                        middleName: data.middleName
                    }}
                    cleanLetters={cleanLetters}
                    capitalize={capitalize}
                    onChange={(patch) => {
                        if (patch.lastName !== undefined) {
                            onChange("lastName", patch.lastName);
                        }
                        if (patch.firstName !== undefined) {
                            onChange("firstName", patch.firstName);
                        }
                        if (patch.middleName !== undefined) {
                            onChange("middleName", patch.middleName);
                        }
                    }}
                />

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