import React, { useState, useRef, useEffect } from "react";
import { SeatWithPrice } from "../../../types/seat";
import { DirectionInfo } from "../../../types/Train/trainTypes";

import styles from "./ChoiceLocationTrains.module.css";
import { Train } from "../../../types/Train/trainTypes";
import TypeSelector from "./TypeSelector/TypeSelector";
import TicketField from "./TicketField/TicketField";
import { formatTime } from "../../../utils/format"; 

import { ReactComponent as Arrow } from "../../../assets/icons/ChoiceLocationTrains/arrow.svg";
import { ReactComponent as ArrowBetween } from "../../../assets/icons/ChoiceLocationTrains/arrowBetween.svg";
import { ReactComponent as Time } from "../../../assets/icons/ChoiceLocationTrains/time.svg";
import { ReactComponent as TrainSvg } from "../../../assets/icons/ChoiceLocationTrains/train.svg";

interface Props {
    train: Train;
    direction: DirectionInfo | null;
    onBack: () => void;
    onSelectType: (type: string) => void;
    disabledType?: string | null;   // ← добавляем
    selectedType?: string | null;
    isSecond?: boolean;
    blockId: "first" | "second";

    onUpdateTickets?: (data: {
        adults: number;
        kids: number;
        kidsNoSeat: number;
    }) => void;

    onUpdateSeats?: (data: {
        blockId: "first" | "second";
        type: string;
        wagonId: string;
        seats: SeatWithPrice[];
        services: {
            wifi: boolean;
            linens: boolean;
            wifi_price: number;
            linens_price: number;
            total: number;
        };
    }) => void;

}

const ChoiceLocationTrains: React.FC<Props> = ({
    train,
    onBack,
    onSelectType,
    selectedType,
    isSecond,
    onUpdateTickets,
    onUpdateSeats,
    disabledType,
    blockId,
    direction
}) => {

    // ❗ Хуки ВСЕГДА ДОЛЖНЫ ИДТИ ПЕРВЫМИ
    const [activeField, setActiveField] =
        useState<"adults" | "kids" | "kidsNoSeat" | null>(null);

    const inputAdultsRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (activeField === "adults") {
            inputAdultsRef.current?.focus();
        }
    }, [activeField]);

    // ❗ Только после хуков можно проверять direction
    if (!direction) return null;

    const dep = direction;

   /*  const formatTime = (unix: number) =>
        new Date(unix * 1000).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
        }); */

    const hours = Math.floor(dep.duration / 3600);
    const minutes = Math.floor((dep.duration % 3600) / 60);

    return (
        <div className={styles.wrapper}>
            <div
                className={`${styles.topBar} ${isSecond ? styles.topBarSecond : ""}`}
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
                        <p className={styles.station}>
                            {dep.from.railway_station_name} <span>вокзал</span>
                        </p>
                    </div>

                    <div className={styles.arrowBlock}>
                        <ArrowBetween className={styles.arrowBetweenSvg} />
                    </div>

                    <div className={styles.timeBlock}>
                        <p className={styles.time}>{formatTime(dep.to.datetime)}</p>
                        <p className={styles.city}>{dep.to.city.name}</p>
                        <p className={styles.station}>
                            {dep.to.railway_station_name} <span>вокзал</span>
                        </p>
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

            {/* БИЛЕТЫ */}
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
                        hint="Можно добавить 3 детей до 10 лет. Свое место в вагоне, как у взрослых, но дешевле в среднем на 50%"
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

            {/* ТИП ВАГОНА */}
            <div className={styles.typeBlock}>
                <TypeSelector
                    onSelectType={onSelectType}
                    routeId={dep._id}
                    disabledType={null}
                    onUpdateSeats={onUpdateSeats}
                    blockId={blockId}
                />
            </div>
        </div>
    );
};


export default ChoiceLocationTrains;