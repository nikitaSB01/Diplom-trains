import React from "react";
import styles from "./CarSeatsMap.module.css";

import SeatMapPlatzkart from "./wagons/SeatMapPlatzkart/SeatMapPlatzkart";
import SeatMapCoupe from "./wagons/SeatMapCoupe/SeatMapCoupe";
import SeatMapLux from "./wagons/SeatMapLux/SeatMapLux";
import SeatMapSitting from "./wagons/SeatMapSitting";

interface Props {
    seats: { index: number; available: boolean }[];
    type: "first" | "second" | "third" | "fourth";
}

const CarSeatsMap: React.FC<Props> = ({ seats, type }) => {
    switch (type) {
        case "third":
            return <SeatMapPlatzkart seats={seats} />; // Плацкарт
        case "second":
            return <SeatMapCoupe seats={seats} />;      // Купе
        case "first":
            return <SeatMapLux seats={seats} />;        // Люкс
        case "fourth":
            return <SeatMapSitting seats={seats} />;    // Сидячий
        default:
            return <div className={styles.empty}>Нет схемы для этого типа</div>;
    }
};

export default CarSeatsMap;