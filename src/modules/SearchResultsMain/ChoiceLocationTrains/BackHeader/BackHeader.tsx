import React from "react";
import styles from "./BackHeader.module.css";

import { ReactComponent as Arrow } from "../../../../assets/icons/ChoiceLocationTrains/arrow.svg";

interface Props {
    isSecond?: boolean;
    onBack: () => void;
}

const BackHeader: React.FC<Props> = ({ isSecond, onBack }) => (
    <div className={`${styles.topBar} ${isSecond ? styles.topBarSecond : ""}`}>
        <button className={styles.backButton} onClick={onBack}>
            <Arrow className={styles.arrowSvg} />
        </button>
        <button className={styles.changeButton} onClick={onBack}>
            Выбрать другой поезд
        </button>
    </div>
);

export default BackHeader; 