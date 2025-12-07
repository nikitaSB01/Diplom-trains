import React from "react";
import styles from "../PassengerCard.module.css";

import { ReactComponent as Plus } from "../../../../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/Plus.svg";
import { ReactComponent as PlusHover } from "../../../../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/PlusNewPas.svg";
import { ReactComponent as Minus } from "../../../../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/Minus.svg";
import { ReactComponent as Close } from "../../../../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/close.svg";

interface Props {
    index: number;
    open: boolean;
    completed: boolean;
    onToggle: () => void;
    onClear: () => void;
}

const PassengerCardHeader: React.FC<Props> = ({
    index,
    open,
    onToggle,
    onClear
}) => {
    return (
        <button
            className={`${styles.header} ${open ? styles.headerOpen : ""}`}
            onClick={onToggle}
            type="button"
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
                    <Close
                        className={styles.clearBtn}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClear();
                        }}
                    />
                )}
            </div>
        </button>
    );
};

export default PassengerCardHeader;