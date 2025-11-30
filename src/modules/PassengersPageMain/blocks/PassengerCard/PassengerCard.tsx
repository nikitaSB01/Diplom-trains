import React, { useState, useEffect } from "react";
import styles from "./PassengerCard.module.css";
import CustomSelect from "./CustomSelect/CustomSelect";

import {
    cleanLetters,
    capitalize,
    formatBirthday,
    formatSeries,
    formatNumber,
    formatBirthCertificate
} from "./utils/formatters";

import { validatePassenger } from "./utils/validation";

import { ReactComponent as Plus } from "../../../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/Plus.svg";
import { ReactComponent as PlusHover } from "../../../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/PlusNewPas.svg";
import { ReactComponent as Minus } from "../../../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/Minus.svg";
import { ReactComponent as Close } from "../../../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/close.svg";
import { ReactComponent as CheckIcon } from "../../../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/check.svg";
import { ReactComponent as ErrorIcon } from "../../../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/error.svg";

interface Props {
    index: number;
    onCompleteChange: (index: number, completed: boolean) => void;
    onRequestOpenNext: (index: number) => void;
    onUpdate: (index: number, data: any) => void;
}

const PassengerCard: React.FC<Props> = ({
    index,
    onCompleteChange,
    onRequestOpenNext,
    onUpdate
}) => {
    const [open, setOpen] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (index === 0) setOpen(true);
    }, [index]);

    // ===== ДАННЫЕ ФОРМЫ =====
    const [formData, setFormData] = useState({
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
    });

    // ===== СБРОС =====
    const clearFields = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFormData({
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
        });
        setCompleted(false);
        setErrorMessage("");
        onCompleteChange(index, false);
    };

    // ===== ВАЛИДАЦИЯ =====
    useEffect(() => {
        const error = validatePassenger(formData);
        const valid = error === "";

        setCompleted(valid);
        onCompleteChange(index, valid);
        setErrorMessage(""); // сброс ошибки при вводе
    }, [formData]);

    const handleNext = () => {
        const error = validatePassenger(formData);

        if (error) {
            setCompleted(false);
            setErrorMessage(error);
            onCompleteChange(index, false);
            return;
        }

        setErrorMessage("");
        setCompleted(false);
        onCompleteChange(index, true);
        onRequestOpenNext(index);
    };

    /*  каждый раз, когда formData меняется, отправляем данные: */
    useEffect(() => {
        onUpdate(index, formData);
    }, [formData]);

    return (
        <div
            id={`passenger-card-${index}`}
            className={`${styles.card} ${completed ? styles.cardCompleted : ""}`}
        >
            {/* ===== HEADER ===== */}
            <button
                className={`${styles.header} ${open ? styles.headerOpen : ""}`}
                onClick={() => setOpen(!open)}
            >
                <div className={styles.leftHeader}>
                    <div className={styles.iconWrapper}>
                        {!open && (
                            <>
                                <Plus className={styles.iconPlus} />
                                <PlusHover className={styles.iconPlusHover} />
                            </>
                        )}
                        {open && <Minus className={styles.iconMinus} />}
                    </div>

                    <span>Пассажир {index + 1}</span>
                </div>

                <div className={styles.rightHeader}>
                    {open && (
                        <Close className={styles.clearBtn} onClick={clearFields} />
                    )}
                </div>
            </button>

            {/* ===== BODY ===== */}
            {open && (
                <div className={styles.body}>
                    <div className={styles.bodyTop}>
                        {/* ====== ТИП БИЛЕТА ====== */}
                        <div className={styles.row}>
                            <CustomSelect
                                value={formData.ticketType}
                                onChange={(val) =>
                                    setFormData({ ...formData, ticketType: val })
                                }
                                options={[
                                    { value: "adult", label: "Взрослый" },
                                    { value: "child", label: "Детский" }
                                ]}
                            />
                        </div>

                        {/* ====== ФИО ====== */}
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
                                    onChange={(e) => {
                                        const cleaned = cleanLetters(e.target.value);
                                        const formatted = capitalize(cleaned);
                                        setFormData({ ...formData, lastName: formatted });
                                        setCompleted(false);
                                    }}
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
                                    onChange={(e) => {
                                        const cleaned = cleanLetters(e.target.value);
                                        const formatted = capitalize(cleaned);
                                        setFormData({
                                            ...formData,
                                            firstName: formatted
                                        });
                                        setCompleted(false);
                                    }}
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
                                    onChange={(e) => {
                                        const cleaned = cleanLetters(e.target.value);
                                        const formatted = capitalize(cleaned);
                                        setFormData({
                                            ...formData,
                                            patronymic: formatted
                                        });
                                    }}
                                />
                            </div>
                        </div>

                        {/* ====== ПОЛ + ДАТА ====== */}
                        <div className={styles.row2}>
                            <div className={styles.genderBlock}>
                                <span className={styles.labelPassCard}>Пол</span>

                                <div className={styles.genderBtns}>
                                    <input
                                        id={`gender-m-${index}`}
                                        type="radio"
                                        name={`gender-${index}`}
                                        checked={formData.gender === "M"}
                                        onChange={() =>
                                            setFormData({ ...formData, gender: "M" })
                                        }
                                        className={styles.genderInput}
                                    />
                                    <label
                                        htmlFor={`gender-m-${index}`}
                                        className={`${styles.genderBtn} ${formData.gender === "M"
                                            ? styles.activeMale
                                            : ""
                                            }`}
                                    >
                                        <span>М</span>
                                    </label>

                                    <input
                                        id={`gender-f-${index}`}
                                        type="radio"
                                        name={`gender-${index}`}
                                        checked={formData.gender === "F"}
                                        onChange={() =>
                                            setFormData({ ...formData, gender: "F" })
                                        }
                                        className={styles.genderInput}
                                    />
                                    <label
                                        htmlFor={`gender-f-${index}`}
                                        className={`${styles.genderBtn} ${formData.gender === "F"
                                            ? styles.activeFemale
                                            : ""
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
                                    onChange={(e) => {
                                        const formatted = formatBirthday(e.target.value);
                                        setFormData({ ...formData, birthday: formatted });
                                        setCompleted(false);
                                    }}
                                />
                            </div>
                        </div>

                        {/* ===== ОГРАНИЧЕННАЯ ПОДВИЖНОСТЬ ===== */}
                        <div className={`${styles.row} ${styles.checkbox}`}>
                            <input
                                className={styles.inputPassCard}
                                id={`mobility-${index}`}
                                type="checkbox"
                                checked={formData.mobility}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        mobility: e.target.checked
                                    })
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

                    {/* ===== BLOCK 2 ===== */}
                    <div className={styles.bodyBottom}>
                        <div className={`${styles.row3} ${styles.rowType}`}>
                            <div
                                className={`${styles.typeDocContainer} ${formData.docType === "Свидетельство о рождении"
                                    ? styles.docWide
                                    : styles.docNormal
                                    }`}
                            >
                                <label
                                    className={styles.labelPassCard}
                                    htmlFor={`docType-${index}`}
                                >
                                    Тип документа
                                </label>

                                <CustomSelect
                                    value={formData.docType}
                                    onChange={(val) =>
                                        setFormData({
                                            ...formData,
                                            docType: val,
                                            docSeries: "",
                                            docNumber: ""
                                        })
                                    }
                                    options={[
                                        { value: "Паспорт РФ", label: "Паспорт РФ" },
                                        {
                                            value: "Свидетельство о рождении",
                                            label: "Свидетельство о рождении"
                                        }
                                    ]}
                                />
                            </div>

                            {/* ===== СЕРИЯ ПАСПОРТА ===== */}
                            {formData.docType === "Паспорт РФ" && (
                                <div className={styles.seriesContainer}>
                                    <label
                                        className={styles.labelPassCard}
                                        htmlFor={`docSeries-${index}`}
                                    >
                                        Серия
                                    </label>

                                    <input
                                        className={styles.inputPassCard}
                                        id={`docSeries-${index}`}
                                        type="text"
                                        value={formData.docSeries}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                docSeries: formatSeries(e.target.value)
                                            })
                                        }
                                        placeholder="__ __ __ __"
                                    />
                                </div>
                            )}

                            {/* ===== НОМЕР ПАСПОРТА / СВИДЕТЕЛЬСТВА ===== */}
                            <div className={styles.numberContainer}>
                                <label
                                    className={styles.labelPassCard}
                                    htmlFor={`docNumber-${index}`}
                                >
                                    Номер
                                </label>

                                <div
                                    className={
                                        formData.docType === "Свидетельство о рождении"
                                            ? styles.birthCertWrapper
                                            : styles.inputWrapper
                                    }
                                    data-has-value={formData.docNumber.trim() !== ""}
                                >
                                    <input
                                        className={styles.inputPassCard}
                                        id={`docNumber-${index}`}
                                        type="text"
                                        value={formData.docNumber}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                docNumber:
                                                    formData.docType === "Паспорт РФ"
                                                        ? formatNumber(e.target.value)
                                                        : formatBirthCertificate(e.target.value)
                                            })
                                        }
                                        placeholder={
                                            formData.docType === "Паспорт РФ"
                                                ? "__ __ __ __ __ __"
                                                : ""
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ==== КНОПКА ==== */}
                        <div className={styles.nextSection}>
                            {errorMessage && (
                                <div className={styles.errorBlock}>
                                    <ErrorIcon />
                                    <p>{errorMessage}</p>
                                </div>
                            )}

                            {!errorMessage && (
                                <div
                                    className={`${styles.containerNextButton} ${completed ? styles.completedState : ""
                                        }`}
                                >
                                    {completed && (
                                        <div className={styles.doneInfo}>
                                            <CheckIcon />
                                            <p>Готово</p>
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        className={styles.nextButton}
                                        onClick={handleNext}
                                    >
                                        Следующий пассажир
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PassengerCard;