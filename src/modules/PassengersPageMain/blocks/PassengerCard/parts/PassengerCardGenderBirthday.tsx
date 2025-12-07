import React from "react";
import styles from "../PassengerCard.module.css";

interface FormData {
    gender: "" | "M" | "F";
    birthday: string;
}

interface Props {
    index: number;
    formData: FormData;
    onChange: (patch: Partial<FormData>) => void;
    formatBirthday: (v: string) => string;
}

const PassengerCardGenderBirthday: React.FC<Props> = ({
    index,
    formData,
    onChange,
    formatBirthday
}) => {
    return (
        <div className={styles.row2}>
            <div className={styles.genderBlock}>
                <span className={styles.labelPassCard}>Пол</span>

                <div className={styles.genderBtns}>
                    <input
                        id={`gender-m-${index}`}
                        type="radio"
                        name={`gender-${index}`}
                        checked={formData.gender === "M"}
                        onChange={() => onChange({ gender: "M" })}
                        className={styles.genderInput}
                    />
                    <label
                        htmlFor={`gender-m-${index}`}
                        className={`${styles.genderBtn} ${formData.gender === "M" ? styles.activeMale : ""
                            }`}
                    >
                        <span>М</span>
                    </label>

                    <input
                        id={`gender-f-${index}`}
                        type="radio"
                        name={`gender-${index}`}
                        checked={formData.gender === "F"}
                        onChange={() => onChange({ gender: "F" })}
                        className={styles.genderInput}
                    />
                    <label
                        htmlFor={`gender-f-${index}`}
                        className={`${styles.genderBtn} ${formData.gender === "F" ? styles.activeFemale : ""
                            }`}
                    >
                        <span>Ж</span>
                    </label>
                </div>
            </div>

            <div className={styles.birthdayBlock}>
                <label
                    className={styles.labelPassCard}
                    htmlFor={`birthday-${index}`}
                >
                    Дата рождения
                </label>
                <input
                    className={styles.inputPassCard}
                    id={`birthday-${index}`}
                    type="text"
                    placeholder="ДД/ММ/ГГ"
                    maxLength={10}
                    value={formData.birthday}
                    onChange={(e) =>
                        onChange({ birthday: formatBirthday(e.target.value) })
                    }
                />
            </div>
        </div>
    );
};

export default PassengerCardGenderBirthday;