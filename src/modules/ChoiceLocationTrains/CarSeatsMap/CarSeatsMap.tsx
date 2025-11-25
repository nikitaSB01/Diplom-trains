import React from "react";
import styles from "./CarSeatsMap.module.css";

import SeatMapPlatzkart from "./wagons/SeatMapPlatzkart/SeatMapPlatzkart";
import SeatMapCoupe from "./wagons/SeatMapCoupe/SeatMapCoupe";
import SeatMapLux from "./wagons/SeatMapLux/SeatMapLux";
import SeatMapSitting from "./wagons/SeatMapSitting/SeatMapSitting";

interface SeatFromAPI {
    index: number;
    available: boolean;
    reserved?: boolean;
}

type WagonType = "first" | "second" | "third" | "fourth";

interface Props {
    seats: SeatFromAPI[];
    type: WagonType;
    wagonNumber: string;

}

const WAGON_CAPACITY: Record<WagonType, number> = {
    first: 18,
    second: 32,
    third: 48,
    fourth: 62,
};

function normalizeSeats(seats: SeatFromAPI[], type: WagonType): SeatFromAPI[] {
    const total = WAGON_CAPACITY[type];
    const seatMap = new Map<number, SeatFromAPI>();

    // Пришедшие с API места
    seats.forEach((s) => seatMap.set(s.index, s));

    // Недостающие — инвалидные
    for (let i = 1; i <= total; i++) {
        if (!seatMap.has(i)) {
            seatMap.set(i, {
                index: i,
                available: false,
                reserved: true,
            });
        }
    }

    return Array.from(seatMap.values()).sort((a, b) => a.index - b.index);
}

const CarSeatsMap: React.FC<Props> = ({ seats, type, wagonNumber }) => {
    const fullSeats = normalizeSeats(seats, type);

    switch (type) {
        case "third":
            return <SeatMapPlatzkart seats={fullSeats} wagonNumber={wagonNumber} />;
        case "second":
            return <SeatMapCoupe seats={fullSeats} wagonNumber={wagonNumber} />;
        case "first":
            return <SeatMapLux seats={fullSeats} wagonNumber={wagonNumber} />;
        case "fourth":
            return <SeatMapSitting seats={fullSeats} wagonNumber={wagonNumber} />;
        default:
            return <div className={styles.empty}>Нет схемы для этого типа</div>;
    }
};

export default CarSeatsMap;