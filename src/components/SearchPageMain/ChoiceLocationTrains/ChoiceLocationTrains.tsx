import React, { useState, useRef, useEffect } from "react";

import styles from "./ChoiceLocationTrains.module.css";
import { Train } from "../../../types/Train/trainTypes";
import TypeSelector from "./TypeSelector/TypeSelector";
import TicketField from "./TicketField/TicketField";

import { ReactComponent as Arrow } from "../../../assets/icons/ChoiceLocationTrains/arrow.svg";
import { ReactComponent as ArrowBetween } from "../../../assets/icons/ChoiceLocationTrains/arrowBetween.svg";
import { ReactComponent as Time } from "../../../assets/icons/ChoiceLocationTrains/time.svg";
import { ReactComponent as TrainSvg } from "../../../assets/icons/ChoiceLocationTrains/train.svg";

interface Props {
    train: Train;
    onBack: () => void;
    onSelectType: (type: string) => void;
    selectedType?: string | null;
    isSecond?: boolean;

    onUpdateTickets?: (data: {
        adults: number;
        kids: number;
        kidsNoSeat: number;
    }) => void;

    onUpdateSeats?: (data: {
        type: string;
        wagonId: string;
        seats: number[];
        services: { wifi: boolean; linens: boolean };
    }) => void;

}

const ChoiceLocationTrains: React.FC<Props> = ({ train, onBack, onSelectType, selectedType, isSecond, onUpdateTickets,
    onUpdateSeats }) => {

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

    const [activeField, setActiveField] = useState<"adults" | "kids" | "kidsNoSeat" | null>(null);

    const inputAdultsRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (activeField === "adults") {
            inputAdultsRef.current?.focus();
        }
    }, [activeField]);

    return (
        <div className={styles.wrapper}>

            {/* БЛОК 1 --- ВЕРХНЯЯ ПАНЕЛЬ */}
            <div
                className={
                    `${styles.topBar} ${isSecond ? styles.topBarSecond : ""}`
                }
            >
                <button className={styles.backButton} onClick={onBack}>
                    <Arrow className={styles.arrowSvg} />
                </button>
                <button className={styles.changeButton} onClick={onBack}>
                    Выбрать другой поезд
                </button>
            </div>

            {/* БЛОК 2 --- ИНФОРМАЦИЯ О ПОЕЗДЕ */}
            <div className={styles.trainInfoCard}>
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

                {/* Время */}
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

                <div className={styles.trainRight}>
                    <Time className={styles.timeIconSvg} />
                    <div className={styles.durationBox}>
                        <p className={styles.durationHours}>{hours} часов</p>
                        <p className={styles.durationMinutes}>{minutes} минут</p>
                    </div>
                </div>
            </div>

            {/* БЛОК 3 — КОЛИЧЕСТВО БИЛЕТОВ */}
            <div className={styles.ticketsBlock}>
                <h2 className={styles.blockTitle}>Количество билетов</h2>

                <div className={styles.ticketFields}>
                    <TicketField
                        label="Взрослых —"
                        max={3}
                        hint="Можно добавить 3 пассажиров"
                        onUpdateTickets={onUpdateTickets}
                    />

                    <TicketField
                        label="Детских —"
                        max={3}
                        hint="Можно добавить еще 3 детей до 10 лет..."
                        onUpdateTickets={onUpdateTickets}
                    />

                    <TicketField
                        label="Детских «без места» —"
                        max={2}
                        hint="Можно добавить 2 детей"
                        onUpdateTickets={onUpdateTickets}
                    />
                </div>
            </div>

            {/* БЛОК 4 — ТИПЫ ВАГОНОВ */}
            <div className={styles.typeBlock}>
                <TypeSelector onSelectType={onSelectType} routeId={dep._id} disabledType={selectedType} onUpdateSeats={onUpdateSeats}
                /> </div>
        </div >
    );
};

export default ChoiceLocationTrains;