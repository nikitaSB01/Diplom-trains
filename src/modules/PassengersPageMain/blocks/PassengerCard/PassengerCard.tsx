import React, { useState } from "react";
import styles from "./PassengerCard.module.css";

import { ReactComponent as Plus } from "../../../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/Plus.svg";
import { ReactComponent as PlusHover } from "../../../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/PlusNewPas.svg";

interface Props {
    index: number;
}

const PassengerCard: React.FC<Props> = ({ index }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.card}>
            <button className={styles.header} onClick={() => setOpen(!open)}>
                <div className={styles.iconWrapper}>
                    <Plus className={styles.iconPlus} />
                    <PlusHover className={styles.iconPlusHover} />
                </div>
                <span>Пассажир {index + 1}</span>
            </button>

            {open && (
                <div className={styles.body}>
                    {/* пока просто заглушка */}
                    <p>Форма данных пассажира появится здесь</p>
                </div>
            )}
        </div>
    );
};

export default PassengerCard;