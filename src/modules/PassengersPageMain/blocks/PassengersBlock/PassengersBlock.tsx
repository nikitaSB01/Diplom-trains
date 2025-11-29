import React from "react";
import styles from "./PassengersBlock.module.css";
import { ReactComponent as UserIcon } from "../../../../assets/icons/ChoiceLocationTrains/arrowBetween.svg";
import { ReactComponent as Ruble } from "../../../../assets/icons/Train/ruble.svg";

interface Props {
    passengers: {
        adults: number;
        kids: number;
        kidsNoSeat: number;
    };
    adultsPrice: number;
    kidsPrice: number;
    servicesTotal: number;
    servicesList: { name: string; price: number }[];

    hideHeader?: boolean;  // ← ДОБАВИЛ
}

const PassengersBlock: React.FC<Props> = ({
    passengers,
    adultsPrice,
    kidsPrice,
    servicesTotal,
    servicesList,        // ← ДОБАВИЛИ ЭТО!
    hideHeader = false,
}) => {
    const { adults, kids } = passengers;

    return (
        <div className={styles.container}>
            {!hideHeader && (
                <div className={styles.header}>
                    <div className={styles.left}>
                        <UserIcon />
                        <p>Пассажиры</p>
                    </div>
                    <div className={styles.icon}>≡</div>
                </div>
            )}

            <div className={styles.list}>
                {adults > 0 && (
                    <div className={styles.row}>
                        <span>{adults} Взрослый</span>
                        <div className={styles.rowPrice}>
                            <strong>{adultsPrice}</strong>
                            <Ruble className={styles.rubleIcon} />
                        </div>
                    </div>
                )}

                {kids > 0 && (
                    <div className={styles.row}>
                        <span>{kids} Ребёнок (50%)</span>
                        <div className={styles.rowPrice}>
                            <strong>{kidsPrice}</strong>
                            <Ruble className={styles.rubleIcon} />
                        </div>
                    </div>
                )}

                {/* === ОТДЕЛЬНЫЕ УСЛУГИ === */}
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
        </div>
    );
};

export default PassengersBlock;