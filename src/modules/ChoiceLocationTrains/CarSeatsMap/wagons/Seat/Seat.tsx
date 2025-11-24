import React from "react";
import styles from "./Seat.module.css";

interface Props {
    number: number;
    available: boolean;
    reserved?: boolean;  // ← добавили
}

const Seat: React.FC<Props> = ({ number, available, reserved }) => {
    return (
        <div
            className={`${styles.seat} ${reserved
                    ? styles.reserved
                    : available
                        ? styles.free
                        : styles.taken
                }`}
        >
            {number}
        </div>
    );
};

export default Seat;