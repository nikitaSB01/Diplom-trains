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
    reserved?: boolean;
}

interface Props {
    seats: SeatItem[];
}

const SeatMapPlatzkart: React.FC<Props> = ({ seats }) => {

    const groupUpper = [
        [2, 4], [6, 8], [10, 12], [14, 16], [18, 20], [22, 24], [26, 28], [30, 32]
    ];
    const groupLower = [
        [1, 3], [5, 7], [9, 11], [13, 15], [17, 19], [21, 23], [25, 27], [29, 31]
    ];
    const groupSide = [
        [33, 34], [35, 36], [37, 38], [39, 40], [41, 42], [43, 44], [45, 46], [47, 48]
    ];

    const findSeat = (n: number) => seats.find(s => s.index === n);

    return (
        <div className={styles.container}>

            <div className={styles.leftService}>
                <div className={styles.leftCol}>
                    <div className={styles.exit}>
                        <div className={styles.exitTop}></div>
                        <div className={styles.exitCenter}></div>
                        <div className={styles.exitBottom}></div>
                    </div>
                </div>
                <div className={styles.rightCol}>
                    <div className={styles.roomContainer}>
                        <div className={styles.roomToilet}>
                            <ToiletIcon className={styles.leftToilet} />
                        </div>
                        <div className={styles.roomAttendant}>
                            <AttendantIcon className={styles.leftAttendant} />
                        </div>
                    </div>
                    <div className={styles.roomCenter}></div>
                    <div className={styles.roomWater}>
                        <WaterIcon className={styles.leftWater} />
                    </div>
                </div>
            </div>

            <div className={styles.mainArea}>

                {/* ВЕРХНИЙ БЛОК КУПЕ */}
                <div className={styles.coupeBlock}>

                    <div className={styles.row}>
                        {groupUpper.map((pair, i) => (
                            <React.Fragment key={i}>
                                <div className={styles.section}>
                                    {pair.map(n => {
                                        const seat = findSeat(n);
                                        return seat ? (
                                            <Seat
                                                key={n}
                                                number={n}
                                                available={seat.available}
                                                reserved={seat.reserved}
                                                type="upper"
                                            />
                                        ) : null;
                                    })}
                                </div>

                                {i !== groupUpper.length - 1 && (
                                    <div className={styles.vertDivider}></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className={styles.row}>
                        {groupLower.map((pair, i) => (
                            <React.Fragment key={i}>
                                <div className={styles.section}>
                                    {pair.map(n => {
                                        const seat = findSeat(n);
                                        return seat ? (
                                            <Seat
                                                key={n}
                                                number={n}
                                                available={seat.available}
                                                reserved={seat.reserved}
                                                type="lower"
                                            />
                                        ) : null;
                                    })}
                                </div>

                                {i !== groupLower.length - 1 && (
                                    <div className={styles.vertDivider}></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                </div>

                {/* ГОРИЗОНТАЛЬНЫЙ РАЗДЕЛИТЕЛЬ */}
                <div className={styles.horDivider}></div>

                {/* БОКОВЫЕ МЕСТА */}
                <div className={styles.sideBlock}>
                    {groupSide.map((pair, i) => (
                        <React.Fragment key={i}>
                            <div className={styles.sideSection}>
                                {pair.map(n => {
                                    const seat = findSeat(n);
                                    return seat ? (
                                        <Seat
                                            key={n}
                                            number={n}
                                            available={seat.available}
                                            reserved={seat.reserved}
                                            type={n % 2 === 0 ? "side-upper" : "side-lower"}
                                        />
                                    ) : null;
                                })}
                            </div>

                            {i !== groupSide.length - 1 && (
                                <div className={styles.vertDivider}></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

            </div>

            <div className={styles.rightService}>
                <div className={styles.colOne}>
                    <div className={styles.colOneTop}>
                        <ToiletIcon className={styles.rightToilet} />
                    </div>
                    <div className={styles.colOneCenter}></div>
                    <div className={styles.colOneBottom}>
                        <TrashIcon className={styles.rightTrash} />
                    </div>
                </div>
                <div className={styles.colTwo}>
                    <div className={styles.colTwoTop}></div>
                    <div className={styles.colTwoCenter}>
                        <NoSmokingIcon className={styles.rightNoSmoke} />
                    </div>
                    <div className={styles.colTwoBottom}></div>
                </div>
            </div>

        </div>
    );
};

export default SeatMapPlatzkart;