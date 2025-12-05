import React from "react";
import styles from "./TrainLeft.module.css";

interface Props {
    dep: any;
    fromCity: any;
    toCity: any;
}

const TrainLeft: React.FC<Props> = ({ dep, fromCity, toCity }) => {
    return (
        <div className={styles.left}>
            <div className={styles.trainIcon}></div>

            <div className={styles.trainNumber}>{dep.train?.name}</div>

            {dep.from.city.name.toLowerCase() !== fromCity.name.toLowerCase() && (
                <div className={styles.routeCityStart}>
                    {dep.from.city.name}
                    <span className={styles.routeArrowGray}></span>
                </div>
            )}

            <div className={styles.routeMain}>
                <div className={styles.routeLine}>
                    <span className={styles.routeCity}>{fromCity.name}</span>
                    <span className={styles.routeArrowBlack}></span>
                </div>
                <div className={styles.routeCity}>{toCity.name}</div>
            </div>
        </div>
    );
};

export default TrainLeft;