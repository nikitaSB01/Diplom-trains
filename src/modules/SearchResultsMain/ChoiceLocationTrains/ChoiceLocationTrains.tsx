import React, { useState, useRef, useEffect } from "react";
import styles from "./ChoiceLocationTrains.module.css";

import { Train, DirectionInfo } from "../../../types/Train/trainTypes";
import { SeatWithPrice } from "../../../types/seat";

import BackHeader from "./BackHeader/BackHeader";
import { TrainInfoCard } from "./TrainInfoCard/TrainInfoCard";
import { TicketFields } from "./TicketFields/TicketFields";
import TypeSelector from "./TypeSelector/TypeSelector";

interface Props {
    train: Train;
    direction: DirectionInfo | null;
    onBack: () => void;
    onSelectType: (type: string) => void;
    selectedType?: string | null;
    isSecond?: boolean;
    blockId: "first" | "second";

    onUpdateTickets?: (data: {
        adults: number;
        kids: number;
        kidsNoSeat: number;
    }) => void;

    onUpdateSeats?: (data: {
        blockId: "first" | "second";
        type: string;
        wagonId: string;
        seats: SeatWithPrice[];
        services: {
            wifi: boolean;
            linens: boolean;
            wifi_price: number;
            linens_price: number;
            total: number;
        };
    }) => void;
}

const ChoiceLocationTrains: React.FC<Props> = ({
    train,
    direction,
    onBack,
    onSelectType,
    isSecond,
    blockId,
    onUpdateTickets,
    onUpdateSeats,
}) => {

    if (!direction) return null;
    const dep = direction;

    return (
        <div className={styles.wrapper}>
            
            <BackHeader isSecond={isSecond} onBack={onBack} />

            <TrainInfoCard dep={dep} />

            <TicketFields onUpdateTickets={onUpdateTickets} />

            <div className={styles.typeBlock}>
                <TypeSelector
                    blockId={blockId}
                    routeId={dep._id}
                    onSelectType={onSelectType}
                    onUpdateSeats={onUpdateSeats}
                />
            </div>

        </div>
    );
};

export default ChoiceLocationTrains;