import React from "react";
import styles from "./SeatMapCoupe.module.css";

import { LeftService } from "../common/LeftService/LeftService";
import { RightService } from "../common/RightService/RightService";
import { SideBlock } from "../common/SideBlockCupeLux/SideBlock";
import { SideBlockStick } from "../common/SideBlockCupeLux/SideBlockStick";
import CompartmentBlock from "../common/CompartmentBlock/CompartmentBlock";

interface SeatItem {
    index: number;
    available: boolean;
    reserved?: boolean;
}

interface Props {
    seats: SeatItem[];
    wagonNumber: string;
    onSeatSelect: (seatIndex: number, price: number) => void;
    selectedSeats: number[];
    upperPrice: number;
    lowerPrice: number;
}

const SeatMapCoupe: React.FC<Props> = ({
    seats,
    wagonNumber,
    onSeatSelect,
    selectedSeats,
    upperPrice,
    lowerPrice
}) => {

    // === Группировка мест для купе (32 места) ===
    const groupUpper = [
        [2, 4], [6, 8], [10, 12], [14, 16],
        [18, 20], [22, 24], [26, 28], [30, 32]
    ];

    const groupLower = [
        [1, 3], [5, 7], [9, 11], [13, 15],
        [17, 19], [21, 23], [25, 27], [29, 31]
    ];

    const findSeat = (index: number) => seats.find(s => s.index === index);

    return (
        <div className={styles.container}>
            <LeftService wagonNumber={wagonNumber} />
            <div className={styles.mainArea}>
                <CompartmentBlock
                    groupUpper={groupUpper}
                    groupLower={groupLower}
                    findSeat={findSeat}
                    selectedSeats={selectedSeats}
                    onSeatSelect={onSeatSelect}
                    upperPrice={upperPrice}
                    lowerPrice={lowerPrice}
                />
                <SideBlock wagonNumber={wagonNumber} />
                <SideBlockStick wagonNumber={wagonNumber} />

            </div>
            <RightService wagonNumber={wagonNumber} />
        </div>
    );
};

export default SeatMapCoupe;