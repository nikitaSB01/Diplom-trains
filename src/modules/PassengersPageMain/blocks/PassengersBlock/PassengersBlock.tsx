import React from "react";
import styles from "./PassengersBlock.module.css";
import { ReactComponent as UserIcon } from "../../../../assets/icons/ChoiceLocationTrains/arrowBetween.svg";

interface Props {
    passengers: {
        adults: number;
        kids: number;
        kidsNoSeat: number;
    };
    adultsPrice: number;
    kidsPrice: number;
}

const PassengersBlock: React.FC<Props> = ({ passengers, adultsPrice, kidsPrice }) => {
    const { adults, kids } = passengers;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <UserIcon />
                    <p>Пассажиры</p>
                </div>

                <div className={styles.icon}>≡</div>
            </div>

            <div className={styles.list}>
                {adults > 0 && (
                    <div className={styles.row}>
                        <span>{adults} Взрослый</span>
                        <strong>{adultsPrice} ₽</strong>
                    </div>
                )}

                {kids > 0 && (
                    <div className={styles.row}>
                        <span>{kids} Ребёнок</span>
                        <strong>{kidsPrice} ₽</strong>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PassengersBlock;