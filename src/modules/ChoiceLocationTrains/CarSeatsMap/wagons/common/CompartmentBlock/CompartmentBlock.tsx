import React from "react";
import styles from "./CompartmentBlock.module.css";
import Seat from "../../Seat/Seat";

interface Props {
    groupUpper: number[][];
    groupLower: number[][];
    findSeat: (index: number) => any;
    selectedSeats: number[];
    onSeatSelect: (index: number, price: number) => void;
    upperPrice: number;
    lowerPrice: number;
}

const CompartmentBlock: React.FC<Props> = ({
    groupUpper,
    groupLower,
    findSeat,
    selectedSeats,
    onSeatSelect,
    upperPrice,
    lowerPrice,
}) => {
    return (
        <div className={styles.coupeBlock}>
            {/* ВЕРХНИЙ РЯД */}
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
                                        selected={selectedSeats.includes(n)}
                                        onClick={() => onSeatSelect(n, upperPrice)}
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

            {/* НИЖНИЙ РЯД */}
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
                                        selected={selectedSeats.includes(n)}
                                        onClick={() => onSeatSelect(n, lowerPrice)}
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
    );
};

export default CompartmentBlock;