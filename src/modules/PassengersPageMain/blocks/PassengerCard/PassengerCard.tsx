import React, { useState, useEffect } from "react";
import styles from "./PassengerCard.module.css";
import CustomSelect from "./CustomSelect/CustomSelect";
import FioFields from "../../../../components/shared/FioFields/FioFields";

import {
    cleanLetters,
    capitalize,
    formatBirthday,
    formatSeries,
    formatNumber,
    formatBirthCertificate
} from "../../../../utils/formatters";
import { validatePassenger } from "../../../../utils/validation";

import PassengerCardHeader from "./parts/PassengerCardHeader";
import PassengerCardGenderBirthday from "./parts/PassengerCardGenderBirthday";
import PassengerCardDocSection from "./parts/PassengerCardDocSection";
import PassengerCardFooter from "./parts/PassengerCardFooter";

interface FormData {
    ticketType: "adult" | "child";
    lastName: string;
    firstName: string;
    patronymic: string;
    gender: "" | "M" | "F";
    birthday: string;
    mobility: boolean;
    docType: "Паспорт РФ" | "Свидетельство о рождении";
    docSeries: string;
    docNumber: string;
}

interface Props {
    index: number;
    onCompleteChange: (index: number, completed: boolean) => void;
    onRequestOpenNext: (index: number) => void;
    onUpdate: (index: number, data: FormData) => void;
    initialData?: Partial<FormData>;
}

const defaultForm: FormData = {
    ticketType: "adult",
    lastName: "",
    firstName: "",
    patronymic: "",
    gender: "",
    birthday: "",
    mobility: false,
    docType: "Паспорт РФ",
    docSeries: "",
    docNumber: ""
};

const PassengerCard: React.FC<Props> = ({
    index,
    onCompleteChange,
    onRequestOpenNext,
    onUpdate,
    initialData
}) => {
    const [open, setOpen] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState<FormData>({
        ...defaultForm,
        ...initialData
    });

    useEffect(() => {
        if (index === 0) setOpen(true);
    }, [index]);

    // ===== Сброс =====
    const handleClear = () => {
        setFormData(defaultForm);
        setCompleted(false);
        setErrorMessage("");
        onCompleteChange(index, false);
    };

    useEffect(() => {
        const error = validatePassenger(formData);
        const valid = error === "";

        setCompleted(valid);
        onCompleteChange(index, valid);
        setErrorMessage("");
        // ВАЖНО: без onCompleteChange в зависимостях
    }, [formData, index]);

    // ===== Кнопка "Следующий пассажир" =====
    const handleNext = () => {
        const error = validatePassenger(formData);

        if (error) {
            setCompleted(false);
            setErrorMessage(error);
            onCompleteChange(index, false);
            return;
        }

        setErrorMessage("");
        setCompleted(true);
        onCompleteChange(index, true);
        onRequestOpenNext(index);
    };

    // каждый раз, когда formData меняется, отправляем наружу
    useEffect(() => {
        onUpdate(index, formData);
    }, [formData, index]);

    // хендлеры для дочерних блоков
    const updateField = (patch: Partial<FormData>) => {
        setFormData((prev) => ({ ...prev, ...patch }));
        setCompleted(false);
    };

    return (
        <div
            id={`passenger-card-${index}`}
            className={`${styles.card} ${completed ? styles.cardCompleted : ""}`}
        >
            <PassengerCardHeader
                index={index}
                open={open}
                onToggle={() => setOpen((prev) => !prev)}
                onClear={handleClear}
                completed={completed}
            />

            {open && (
                <div className={styles.body}>
                    <div className={styles.bodyTop}>
                        {/* Тип билета */}
                        <div className={styles.row}>
                            <CustomSelect
                                value={formData.ticketType}
                                onChange={(val) =>
                                    updateField({ ticketType: val as FormData["ticketType"] })
                                }
                                options={[
                                    { value: "adult", label: "Взрослый" },
                                    { value: "child", label: "Детский" }
                                ]}
                            />
                        </div>

                        {/* ФИО */}
                        <FioFields
                            data={{
                                lastName: formData.lastName,
                                firstName: formData.firstName,
                                middleName: formData.patronymic
                            }}
                            cleanLetters={cleanLetters}
                            capitalize={capitalize}
                            highlight={true}
                            onChange={(patch) => {
                                if ("lastName" in patch) {
                                    updateField({ lastName: patch.lastName });
                                }
                                if ("firstName" in patch) {
                                    updateField({ firstName: patch.firstName });
                                }
                                if ("middleName" in patch) {
                                    updateField({ patronymic: patch.middleName });
                                }
                            }}
                        />

                        {/* Пол + дата */}
                        <PassengerCardGenderBirthday
                            index={index}
                            formData={formData}
                            onChange={updateField}
                            formatBirthday={formatBirthday}
                        />

                        {/* Ограниченная подвижность */}
                        <div className={`${styles.row} ${styles.checkbox}`}>
                            <input
                                className={styles.inputPassCard}
                                id={`mobility-${index}`}
                                type="checkbox"
                                checked={formData.mobility}
                                onChange={(e) =>
                                    updateField({ mobility: e.target.checked })
                                }
                            />
                            <label
                                className={styles.labelPassCard}
                                htmlFor={`mobility-${index}`}
                            >
                                ограниченная подвижность
                            </label>
                        </div>
                    </div>

                    {/* Документы + кнопка */}
                    <div className={styles.bodyBottom}>
                        <PassengerCardDocSection
                            index={index}
                            formData={formData}
                            onChange={updateField}
                            formatSeries={formatSeries}
                            formatNumber={formatNumber}
                            formatBirthCertificate={formatBirthCertificate}
                        />

                        <PassengerCardFooter
                            completed={completed}
                            errorMessage={errorMessage}
                            onNext={handleNext}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PassengerCard;