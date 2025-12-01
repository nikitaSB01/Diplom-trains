import React from "react";
import styles from "./PersonalDataBlock.module.css";

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
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.title} ${styles.border}`}>
                <h2 className={styles.titleText}>Персональные данные</h2>
            </div>
            <div className={`${styles.containerForm} ${styles.border}`}>
                {/* ====== Строка: Фамилия — Имя — Отчество ====== */}
                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.personalLabel} htmlFor="lastName">Фамилия</label>
                        <input className={styles.personaInput}
                            id="lastName"
                            value={data.lastName}
                            onChange={(e) => onChange("lastName", e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.personalLabel} htmlFor="firstName">Имя</label>
                        <input className={styles.personaInput}
                            id="firstName"
                            value={data.firstName}
                            onChange={(e) => onChange("firstName", e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.personalLabel} htmlFor="middleName">Отчество</label>
                        <input className={styles.personaInput}
                            id="middleName"
                            value={data.middleName}
                            onChange={(e) => onChange("middleName", e.target.value)}
                        />
                    </div>
                </div>

                {/* ====== Контактный телефон ====== */}
                <div className={styles.row}>
                    <div className={styles.fieldFull}>
                        <label className={styles.personalLabel} htmlFor="phone">Контактный телефон</label>
                        <input className={styles.personaInput}
                            id="phone"
                            value={data.phone}
                            onChange={(e) => onChange("phone", e.target.value)}
                        />
                    </div>
                </div>

                {/* ====== Email ====== */}
                <div className={styles.row}>
                    <div className={styles.fieldFull}>
                        <label className={styles.personalLabel} htmlFor="email">E-mail</label>
                        <input className={styles.personaInput}
                            id="email"
                            value={data.email}
                            onChange={(e) => onChange("email", e.target.value)}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PersonalDataBlock;