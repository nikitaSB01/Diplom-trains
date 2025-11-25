import React from "react";
import styles from "./SeatMapLux.module.css";

import { LeftService } from "../common/LeftService/LeftService";
import { RightService } from "../common/RightService/RightService";
import LuxCompartmentBlock from "../common/LuxCompartmentBlock/LuxCompartmentBlock";
import { SideBlock } from "../common/SideBlockCupeLux/SideBlock";
import { SideBlockStick } from "../common/SideBlockCupeLux/SideBlockStick";


interface SeatItem {
    index: number;
    available: boolean;
    reserved?: boolean;
}

interface LuxProps {
    seats: SeatItem[];
    wagonNumber: string;
    selectedSeats: number[];
    onSeatSelect: (seatIndex: number, price: number) => void;
    lowerPrice: number;
}

const SeatMapLux: React.FC<LuxProps> = ({
    seats,
    wagonNumber,
    selectedSeats,
    onSeatSelect,
    lowerPrice
}) => {

    const groups = [
        [1, 2], [3, 4], [5, 6], [7, 8],
        [9, 10], [11, 12], [13, 14], [15, 16]
    ];

    const findSeat = (n: number): SeatItem | undefined =>
        seats.find(s => s.index === n);

    return (
        <div className={styles.container}>
            <LeftService wagonNumber={wagonNumber} />

            <div className={styles.mainArea}>
                <LuxCompartmentBlock
                    groups={groups}
                    findSeat={findSeat}
                    selectedSeats={selectedSeats}
                    onSeatSelect={onSeatSelect}
                    price={lowerPrice}
                />
                <SideBlock wagonNumber={wagonNumber} />
                <SideBlockStick wagonNumber={wagonNumber} />
            </div>

            <RightService wagonNumber={wagonNumber} />
        </div>
    );
};

export default SeatMapLux;