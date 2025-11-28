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

    services: {
        wifi: boolean;
        linens: boolean;
        wifi_price: number;
        linens_price: number;
    } | null;
}

const PassengersBlock: React.FC<Props> = ({ passengers, adultsPrice, kidsPrice, services }) => {
    const { adults, kids } = passengers;

    // Количество комплектов белья (только пассажиры с местами)
    const linenSets = adults + kids;

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

                {/* === ДОП. УСЛУГИ === */}
                {services && (
                    <>
                        {/* Wi-Fi */}
                        {services.wifi && (
                            <div className={styles.row}>
                                <span>Wi-Fi</span>
                                <div className={styles.rowPrice}>
                                    <strong>{services.wifi_price}</strong>
                                    <Ruble className={styles.rubleIcon} />
                                </div>
                            </div>
                        )}

                        {/* Бельё */}
                        {services.linens && linenSets > 0 && (
                            <div className={styles.row}>
                                <span>{linenSets} Бельё</span>
                                <div className={styles.rowPrice}>
                                    <strong>{services.linens_price * linenSets}</strong>
                                    <Ruble className={styles.rubleIcon} />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default PassengersBlock;