import React from "react";
import styles from "./TrainInfoCard.module.css";

import TrainDirections from "../../../../components/shared/TrainInfo/TrainDirections/TrainDirections";

import { ReactComponent as TrainSvg } from "../../../../assets/icons/ChoiceLocationTrains/train.svg";
import { ReactComponent as Time } from "../../../../assets/icons/ChoiceLocationTrains/time.svg";

export const TrainInfoCard = ({ dep }: { dep: any }) => {
    const hours = Math.floor(dep.duration / 3600);
    const minutes = Math.floor((dep.duration % 3600) / 60);

    return (
        <div className={styles.trainInfoCard}>

            {/* Левая часть (иконка + маршрут) */}
            <div className={styles.trainLeft}>
                <div className={styles.trainIcon}>
                    <TrainSvg className={styles.trainSvg} />
                </div>

                <div className={styles.infoTrain}>
                    <div className={styles.trainNumber}>{dep.train?.name}</div>

                    <div className={styles.cities}>
                        <div className={styles.routeLine}>
                            <span>{dep.from.city.name}</span>
                            <span className={styles.arrow}></span>
                        </div>
                        <span>{dep.to.city.name}</span>
                    </div>
                </div>
            </div>

            {/* Центр — заменено на TrainDirections */}
            <div className={styles.trainCenter}>
                <TrainDirections departure={dep} useChoiceLocation />
            </div>

            {/* Правая часть (длительность поездки) */}
            <div className={styles.trainRight}>
                <Time className={styles.timeIconSvg} />
                <div className={styles.durationBox}>
                    <p className={styles.durationHours}>{hours} часов</p>
                    <p className={styles.durationMinutes}>{minutes} минут</p>
                </div>
            </div>
        </div>
    );
};