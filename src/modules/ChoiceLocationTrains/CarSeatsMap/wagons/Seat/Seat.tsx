import React from "react";
import styles from "./Seat.module.css";

interface Props {
    number: number;
    available: boolean;
    reserved?: boolean;
    type: "upper" | "lower" | "side-upper" | "side-lower";
}

const Seat: React.FC<Props> = ({ number, available, reserved, type }) => {
    return (
        <div
            className={`
                ${styles.seat}
                ${type === "upper" ? styles.upperSeat : ""}
                ${type === "lower" ? styles.lowerSeat : ""}
                ${type === "side-upper" ? styles.sideUpperSeat : ""}
                ${type === "side-lower" ? styles.sideLowerSeat : ""}

                ${reserved ? styles.reserved : ""}
                ${!available && !reserved ? styles.unavailable : ""}
                ${available && !reserved ? styles.free : ""}
                ${!available && !reserved ? "" : ""} 
            `}
        >
            {number}
        </div>
    );
};

export default Seat;