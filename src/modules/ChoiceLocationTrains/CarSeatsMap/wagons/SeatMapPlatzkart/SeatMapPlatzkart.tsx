import React from "react";
import styles from "./SeatMapPlatzkart.module.css";
import Seat from "../Seat/Seat";

import { ReactComponent as ToiletIcon } from "../../../../../assets/icons/ChoiceLocationTrains/CarSeatsMap/wc.svg";
import { ReactComponent as WaterIcon } from "../../../../../assets/icons/ChoiceLocationTrains/CarSeatsMap/water.svg";
import { ReactComponent as AttendantIcon } from "../../../../../assets/icons/ChoiceLocationTrains/CarSeatsMap/conductor.svg";
import { ReactComponent as TrashIcon } from "../../../../../assets/icons/ChoiceLocationTrains/CarSeatsMap/garbage.svg";
import { ReactComponent as NoSmokingIcon } from "../../../../../assets/icons/ChoiceLocationTrains/CarSeatsMap/noSmoking.svg";


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

                {/* WC в верхнем левом углу */}
                <ToiletIcon className={styles.leftToilet} />

                {/* Проводник — по центру */}
                <AttendantIcon className={styles.leftAttendant} />

                {/* Вода — снизу слева */}
                <WaterIcon className={styles.leftWater} />

                {/* Диагональная перегородка */}
                <div className={styles.leftDiagonal}></div>
            </div>

            <div className={styles.mainArea}>

                <div className={styles.containerTop}>
                    {/* <div className={styles.topGray} /> */}
                    {/* Верхние полки */}
                    <div className={styles.upperRow}>
                        {upperMain.map((seat, i) => (
                            <React.Fragment key={seat.index}>
                                <Seat
                                    number={seat.index}
                                    available={seat.available}
                                    reserved={seat.reserved}
                                    type="upper"
                                />

                                {/* Перегородка после каждых 4 мест */}
                                {((i + 1) % 2 === 0 && i !== upperMain.length - 1) && (
                                    <div className={styles.compartmentLine} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    {/* Нижние полки */}
                    <div className={styles.lowerRow}>
                        {lowerMain.map((seat, i) => (
                            <React.Fragment key={seat.index}>
                                <Seat
                                    number={seat.index}
                                    available={seat.available}
                                    reserved={seat.reserved}
                                    type="lower"
                                />

                                {/* Перегородка после каждых 4 мест */}
                                {((i + 1) % 2 === 0 && i !== lowerMain.length - 1) && (
                                    <div className={styles.compartmentLine} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className={styles.bottomGray} />

                <div className={styles.containerBottom}>
                    <div className={styles.sideRow}>
                        {seats
                            .filter(s => s.index >= 33 && s.index <= 48)
                            .sort((a, b) => a.index - b.index)
                            .map((seat, i, arr) => (
                                <React.Fragment key={seat.index}>
                                    <Seat
                                        number={seat.index}
                                        available={seat.available}
                                        reserved={seat.reserved}
                                        type="side"
                                    />

                                    {/* Перегородка через каждые 2 места */}
                                    {((i + 1) % 2 === 0 && i !== arr.length - 1) && (
                                        <div className={styles.compartmentLineSide} />
                                    )}
                                </React.Fragment>
                            ))}
                    </div>

                </div>


            </div>
            <div className={styles.rightService}>

                {/* WC */}
                <ToiletIcon className={styles.rightToilet} />

                {/* Мусорка */}
                <TrashIcon className={styles.rightTrash} />

                {/* No smoking */}
                <NoSmokingIcon className={styles.rightNoSmoke} />

                {/* Диагональная перегородка */}
                <div className={styles.rightDiagonal}></div>
            </div>
        </div>
    );
};

export default SeatMapPlatzkart;