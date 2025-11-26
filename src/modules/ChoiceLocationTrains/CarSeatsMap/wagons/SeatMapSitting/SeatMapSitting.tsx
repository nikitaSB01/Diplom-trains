import React from "react";
import styles from "./SeatMapSitting.module.css";

import { LeftService } from "../common/LeftService/LeftService";
import { RightService } from "../common/RightService/RightService";
import SittingBlock from "./SittingBlock/SittingBlock";

interface SeatItem {
    index: number;
    available: boolean;
    reserved?: boolean;
}

interface Props {
    seats: SeatItem[];
    wagonNumber: string;
    selectedSeats: number[];
    onSeatSelect: (seatIndex: number, price: number) => void;
    lowerPrice: number;
}

const SeatMapSitting: React.FC<Props> = ({
    seats,
    wagonNumber,
    selectedSeats,
    onSeatSelect,
    lowerPrice
}) => {
    return (
        <div className={styles.container}>
            <LeftService wagonNumber={wagonNumber} />

            <div className={styles.mainArea}>
                <SittingBlock
                    seats={seats}
                    selectedSeats={selectedSeats}
                    onSeatSelect={onSeatSelect}
                    lowerPrice={lowerPrice}
                />
            </div>

            <RightService wagonNumber={wagonNumber} />
        </div>
    );
};

export default SeatMapSitting;