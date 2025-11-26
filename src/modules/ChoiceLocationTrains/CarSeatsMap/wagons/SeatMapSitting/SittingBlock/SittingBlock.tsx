import React from "react";
import Seat from "../../Seat/Seat";
import styles from "./SittingBlock.module.css";

interface SeatItem {
    index: number;
    available: boolean;
    reserved?: boolean;
}

interface Props {
    seats: SeatItem[];
    selectedSeats: number[];
    onSeatSelect: (seatIndex: number, price: number) => void;
    lowerPrice: number;
}

const SittingBlock: React.FC<Props> = ({
    seats,
    selectedSeats,
    onSeatSelect,
    lowerPrice
}) => {

    const findSeat = (n: number) => seats.find(s => s.index === n);

    const topUpper = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
    const topLower = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31];
    const bottomUpper = [34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62] ;
    const bottomLower = [33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61];

    const renderRow = (row: number[], variant: "top" | "bottom") => (
        <div className={`${styles.row} ${styles[variant]}`}>
            {row.map(n => {
                const seat = findSeat(n);
                if (!seat) return null;

                return (
                    <Seat
                        key={n}
                        number={n}
                        available={seat.available}
                        reserved={seat.reserved}
                        type="lower"   // сидячие — все нижние
                        selected={selectedSeats.includes(n)}
                        onClick={() => onSeatSelect(n, lowerPrice)}
                    />
                );
            })}
        </div>
    );

    return (
        <div className={styles.wrapper}>
            {renderRow(topUpper, "top")}
            {renderRow(topLower, "top")}
            <div className={styles.divider} />
            {renderRow(bottomUpper, "bottom")}
            {renderRow(bottomLower, "bottom")}
        </div>
    );
};

export default SittingBlock;