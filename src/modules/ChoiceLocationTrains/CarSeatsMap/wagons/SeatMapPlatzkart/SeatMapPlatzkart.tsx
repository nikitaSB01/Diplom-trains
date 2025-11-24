import React from "react";
import styles from "./SeatMapPlatzkart.module.css";
import Seat from "../Seat/Seat";

interface SeatItem {
    index: number;
    available: boolean;
    reserved?: boolean;   // ← ДОБАВЛЯЕМ ЭТО!!!
}

interface Props {
    seats: SeatItem[];
}

const SeatMapPlatzkart: React.FC<Props> = ({ seats }) => {
    const upperMain = seats.filter(s => s.index >= 2 && s.index <= 32 && s.index % 2 === 0);
    const lowerMain = seats.filter(s => s.index >= 1 && s.index <= 31 && s.index % 2 === 1);

    const sideUpper = seats.filter(s => s.index >= 34 && s.index % 2 === 0);
    const sideLower = seats.filter(s => s.index >= 33 && s.index % 2 === 1);

    return (
        <div className={styles.container}>
            <div className={styles.leftService}>
                <div className={styles.toilet}></div>
                <div className={styles.attendant}></div>
            </div>

            <div className={styles.mainArea}>

                {/* Верхние полки */}
                <div className={styles.upperRow}>
                    {upperMain.map(seat => (
                        <Seat
                            key={seat.index}
                            number={seat.index}
                            available={seat.available}
                            reserved={seat.reserved}
                        />
                    ))}
                </div>

                {/* Нижние полки */}
                <div className={styles.lowerRow}>
                    {lowerMain.map(seat => (
                        <Seat
                            key={seat.index}
                            number={seat.index}
                            available={seat.available}
                            reserved={seat.reserved}
                        />
                    ))}
                </div>

                {/* Боковые полки */}
                {/* Боковые полки (правильный порядок 33 → 48) */}
                <div className={styles.sideRow}>
                    {seats
                        .filter(s => s.index >= 33 && s.index <= 48) // только боковые
                        .sort((a, b) => a.index - b.index)          // сортируем строго 33..48
                        .map(seat => (
                            <Seat
                                key={seat.index}
                                number={seat.index}
                                available={seat.available}
                                reserved={seat.reserved}
                            />
                        ))}
                </div>
            </div>

            <div className={styles.rightService}>
                <div className={styles.toilet}></div>
                <div className={styles.trash}></div>
            </div>
        </div>
    );
};

export default SeatMapPlatzkart;