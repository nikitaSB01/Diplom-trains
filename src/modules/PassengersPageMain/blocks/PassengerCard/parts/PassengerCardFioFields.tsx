// parts/PassengerCardFioFields.tsx
import React from "react";
import styles from "../PassengerCard.module.css";

interface FormData {
    lastName: string;
    firstName: string;
    patronymic: string;
}

interface Props {
    index: number;
    formData: FormData;
    onChange: (patch: Partial<FormData>) => void;
    cleanLetters: (v: string) => string;
    capitalize: (v: string) => string;
}

const PassengerCardFioFields: React.FC<Props> = ({
    index,
    formData,
    onChange,
    cleanLetters,
    capitalize
}) => {
    const handleFieldChange = (field: keyof FormData, value: string) => {
        const cleaned = cleanLetters(value);
        const formatted = capitalize(cleaned);
        onChange({ [field]: formatted });
    };

    return (
        <div className={styles.row3}>
            <div className={styles.lastNameContainer}>
                <label
                    className={styles.labelPassCard}
                    htmlFor={`lastName-${index}`}
                >
                    Фамилия
                </label>
                <input
                    className={styles.inputPassCard}
                    id={`lastName-${index}`}
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleFieldChange("lastName", e.target.value)}
                />
            </div>

            <div className={styles.nameContainer}>
                <label
                    className={styles.labelPassCard}
                    htmlFor={`firstName-${index}`}
                >
                    Имя
                </label>
                <input
                    className={styles.inputPassCard}
                    id={`firstName-${index}`}
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleFieldChange("firstName", e.target.value)}
                />
            </div>

            <div className={styles.surnameContainer}>
                <label
                    className={styles.labelPassCard}
                    htmlFor={`patronymic-${index}`}
                >
                    Отчество
                </label>
                <input
                    className={styles.inputPassCard}
                    id={`patronymic-${index}`}
                    type="text"
                    value={formData.patronymic}
                    onChange={(e) =>
                        onChange({ patronymic: capitalize(cleanLetters(e.target.value)) })
                    }
                />
            </div>
        </div>
    );
};

export default PassengerCardFioFields;