import React from "react";

import styles from "./ChoiceLocationTrains.module.css";
import { Train } from "../../../types/Train/trainTypes";

import { ReactComponent as Arrow } from "../../../assets/icons/ChoiceLocationTrains/arrow.svg";
import { ReactComponent as ArrowBetween } from "../../../assets/icons/ChoiceLocationTrains/arrowBetween.svg";
import { ReactComponent as Cupe } from "../../../assets/icons/ChoiceLocationTrains/cupe.svg";
import { ReactComponent as Plat } from "../../../assets/icons/ChoiceLocationTrains/plat.svg";
import { ReactComponent as Lux } from "../../../assets/icons/ChoiceLocationTrains/lux.svg";
import { ReactComponent as Sid } from "../../../assets/icons/ChoiceLocationTrains/sid.svg";
import { ReactComponent as Time } from "../../../assets/icons/ChoiceLocationTrains/time.svg";
import { ReactComponent as TrainSvg } from "../../../assets/icons/ChoiceLocationTrains/train.svg";


interface Props {
    train: Train;
    onBack: () => void;
}

const ChoiceLocationTrains: React.FC<Props> = ({ train, onBack }) => {

    const dep = train.departure;

    const formatTime = (unix: number) =>
        new Date(unix * 1000).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
        });

    const duration = (() => {
        const h = Math.floor(dep.duration / 3600);
        const m = Math.floor((dep.duration % 3600) / 60);
        return `${h} часов ${m} минут`;
    })();

    const hours = Math.floor(dep.duration / 3600);
    const minutes = Math.floor((dep.duration % 3600) / 60);

    return (
        <div className={styles.wrapper}>

            {/* БЛОК 1 — ВЕРХНЯЯ ПАНЕЛЬ */}
            <div className={styles.topBar}>
                <button className={styles.backButton} onClick={onBack}>
                    <Arrow className={styles.arrowSvg} />
                </button>
                <button className={styles.changeButton} onClick={onBack}>
                    Выбрать другой поезд
                </button>
            </div>

            {/* БЛОК 2 — ИНФОРМАЦИЯ О ПОЕЗДЕ */}
            <div className={styles.trainInfoCard}>
                {/* ЛЕВАЯ ЧАСТЬ: номер поезда + маршрут */}
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
                            <div>
                                <span>{dep.to.city.name}</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* ЦЕНТР: время туда */}
                <div className={styles.trainCenter}>
                    <div className={styles.timeBlock}>
                        <p className={styles.time}>{formatTime(dep.from.datetime)}</p>
                        <p className={styles.city}>{dep.from.city.name}</p>
                        <p className={styles.station}>{dep.from.railway_station_name} <span>вокзал</span></p>
                    </div>

                    <div className={styles.arrowBlock}>
                        <ArrowBetween className={styles.arrowBetweenSvg} />
                    </div>

                    <div className={styles.timeBlock}>
                        <p className={styles.time}>{formatTime(dep.to.datetime)}</p>
                        <p className={styles.city}>{dep.to.city.name}</p>
                        <p className={styles.station}>{dep.to.railway_station_name} <span>вокзал</span></p>
                    </div>
                </div>

                {/* ПРАВАЯ ЧАСТЬ: часы */}
                <div className={styles.trainRight}>
                    <div className={styles.clockIcon}>
                        <Time className={styles.timeIconSvg} />
                    </div>
                    <div className={styles.durationBox}>
                        <p className={styles.durationHours}>{hours} часов</p>
                        <p className={styles.durationMinutes}>{minutes} минут</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChoiceLocationTrains;