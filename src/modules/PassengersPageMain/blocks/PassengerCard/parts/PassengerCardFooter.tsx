// parts/PassengerCardFooter.tsx
import React from "react";
import styles from "../PassengerCard.module.css";
import { ReactComponent as CheckIcon } from "../../../../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/check.svg";
import { ReactComponent as ErrorIcon } from "../../../../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/error.svg";

interface Props {
    completed: boolean;
    errorMessage: string;
    onNext: () => void;
}

const PassengerCardFooter: React.FC<Props> = ({
    completed,
    errorMessage,
    onNext
}) => {
    if (errorMessage) {
        return (
            <div className={styles.nextSection}>
                <div className={styles.errorBlock}>
                    <ErrorIcon />
                    <p>{errorMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.nextSection}>
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
                    onClick={onNext}
                >
                    Следующий пассажир
                </button>
            </div>
        </div>
    );
};

export default PassengerCardFooter;