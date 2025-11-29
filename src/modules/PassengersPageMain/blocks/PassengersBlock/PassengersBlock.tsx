import React from "react";
import styles from "./PassengersBlock.module.css";
import { ReactComponent as Ruble } from "../../../../assets/icons/Train/ruble.svg";

interface Props {
    passengers: {
        adults: number;
        kids: number;
        kidsNoSeat: number;
    };
    adultsPrice: number;
    kidsPrice: number;
    servicesList: { name: string; price: number }[];
}

const PassengersBlock: React.FC<Props> = ({
    passengers,
    adultsPrice,
    kidsPrice,
    servicesList,
}) => {
    return (
        <div className={styles.list}>
            {passengers.adults > 0 && (
                <div className={styles.row}>
                    <span>{passengers.adults} Взрослый</span>
                    <div className={styles.rowPrice}>
                        <strong>{adultsPrice}</strong>
                        <Ruble className={styles.rubleIcon} />
                    </div>
                </div>
            )}

            {passengers.kids > 0 && (
                <div className={styles.row}>
                    <span>{passengers.kids} Ребёнок (50%)</span>
                    <div className={styles.rowPrice}>
                        <strong>{kidsPrice}</strong>
                        <Ruble className={styles.rubleIcon} />
                    </div>
                </div>
            )}

            {servicesList.map((srv, i) => (
                <div className={styles.row} key={i}>
                    <span>{srv.name}</span>
                    <div className={styles.rowPrice}>
                        <strong>{srv.price}</strong>
                        <Ruble className={styles.rubleIcon} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PassengersBlock;