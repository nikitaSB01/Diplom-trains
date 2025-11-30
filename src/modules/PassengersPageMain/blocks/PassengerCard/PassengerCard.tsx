import React, { useState } from "react";
import styles from "./PassengerCard.module.css";

import { ReactComponent as Plus } from "../../../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/Plus.svg";
import { ReactComponent as PlusHover } from "../../../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/PlusNewPas.svg";
import { ReactComponent as Minus } from "../../../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/Minus.svg";
import { ReactComponent as Close } from "../../../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/close.svg";

interface Props {
    index: number;
}

const PassengerCard: React.FC<Props> = ({ index }) => {
    const [open, setOpen] = useState(false);

    // данные внутри формы
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthday: "",
        document: ""
    });

    const clearFields = (e: React.MouseEvent) => {
        e.stopPropagation(); // важно — не сворачивать карточку
        setFormData({
            firstName: "",
            lastName: "",
            birthday: "",
            document: ""
        });
    };

    return (
        <div className={styles.card}>
            {/* ==== HEADER ==== */}
            <button
                className={styles.header}
                onClick={() => setOpen(!open)}
            >
                <div className={styles.leftHeader}>
                    {/* левая иконка */}
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

                {/* правая иконка очистить — Появляется только когда карточка открыта */}
                <div className={styles.rightHeader}>
                    {open && (
                        <Close
                            className={styles.clearBtn}
                            onClick={clearFields}
                        />
                    )}
                </div>

            </button>

            {/* ==== BODY ==== */}
            {open && (
                <div className={styles.body}>
                    <p>Форма данных пассажира появится здесь</p>

                    {/* пример полей: */}
                    <input
                        type="text"
                        placeholder="Имя"
                        value={formData.firstName}
                        onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Фамилия"
                        value={formData.lastName}
                        onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default PassengerCard;