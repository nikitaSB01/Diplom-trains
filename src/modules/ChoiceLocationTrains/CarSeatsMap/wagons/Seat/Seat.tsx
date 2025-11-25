import React from "react";
import styles from "./Seat.module.css";

interface Props {
    number: number;
    available: boolean;
    reserved?: boolean;
    type: "upper" | "lower" | "side-upper" | "side-lower";
    selected?: boolean;
    onClick?: () => void;
}

const Seat: React.FC<Props> = ({
    number,
    available,
    reserved,
    type,
    selected,
    onClick,
}) => {
    const clickable = available && !reserved;

    return (
        <div
            role={clickable ? "button" : undefined}
            tabIndex={clickable ? 0 : undefined}
            onClick={clickable ? onClick : undefined}
            onKeyDown={
                clickable
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") onClick?.();
                    }
                    : undefined
            }
            className={`
                ${styles.seat}
                ${selected ? styles.selected : ""}
                ${reserved ? styles.reserved : ""}
                ${!available && !reserved ? styles.unavailable : ""}
                ${available && !reserved ? styles.free : ""}
                ${type === "upper" ? styles.upperSeat : ""}
                ${type === "lower" ? styles.lowerSeat : ""}
                ${type === "side-upper" ? styles.sideUpperSeat : ""}
                ${type === "side-lower" ? styles.sideLowerSeat : ""}
            `}
        >
            {number}
        </div>
    );
};

export default Seat;