import React from "react";
import styles from "../PassengerCard.module.css";
import CustomSelect from "../CustomSelect/CustomSelect";

interface FormData {
    docType: "Паспорт РФ" | "Свидетельство о рождении";
    docSeries: string;
    docNumber: string;
}

interface Props {
    index: number;
    formData: FormData;
    onChange: (patch: Partial<FormData>) => void;
    formatSeries: (v: string) => string;
    formatNumber: (v: string) => string;
    formatBirthCertificate: (v: string) => string;
}

const PassengerCardDocSection: React.FC<Props> = ({
    index,
    formData,
    onChange,
    formatSeries,
    formatNumber,
    formatBirthCertificate
}) => {
    const handleDocTypeChange = (val: string) => {
        const typed = val as FormData["docType"];
        onChange({
            docType: typed,
            docSeries: "",
            docNumber: ""
        });
    };

    const handleNumberChange = (value: string) => {
        onChange({
            docNumber:
                formData.docType === "Паспорт РФ"
                    ? formatNumber(value)
                    : formatBirthCertificate(value)
        });
    };

    return (
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
                    onChange={handleDocTypeChange}
                    options={[
                        { value: "Паспорт РФ", label: "Паспорт РФ" },
                        {
                            value: "Свидетельство о рождении",
                            label: "Свидетельство о рождении"
                        }
                    ]}
                />
            </div>

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
                            onChange({ docSeries: formatSeries(e.target.value) })
                        }
                        placeholder="__ __ __ __"
                    />
                </div>
            )}

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
                        onChange={(e) => handleNumberChange(e.target.value)}
                        placeholder={
                            formData.docType === "Паспорт РФ"
                                ? "__ __ __ __ __ __"
                                : ""
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default PassengerCardDocSection;