import React from "react";
import styles from "./Seat.module.css";

interface Props {
    number: number;
    available: boolean;
    reserved?: boolean;
    type: "upper" | "lower" | "side";

}

const Seat: React.FC<Props> = ({ number, available, reserved, type }) => {
    return (
        <div
            className={`
                ${styles.seat}
                ${reserved ? styles.reserved : available ? styles.free : styles.taken}
                ${type === "upper" ? styles.upperSeat : ""}
                ${type === "lower" ? styles.lowerSeat : ""}
                ${type === "side" ? styles.sideSeat : ""}
            `}
        >
            {number}
        </div>
    );
};

export default Seat;