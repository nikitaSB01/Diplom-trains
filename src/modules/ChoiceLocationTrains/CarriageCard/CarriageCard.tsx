import React, { useEffect, useState } from "react";
import styles from "./CarriageCard.module.css";
import { SeatWithPrice } from "../../../types/seat";

import { ReactComponent as Ruble } from "../../../assets/icons/Train/ruble.svg";
import CarSeatsMap from "../CarSeatsMap/CarSeatsMap";
import { formatPrice } from "../../../utils/format";

import CarriageTopRow from "./CarriageTopRow";
import CarriageServices from "./CarriageServices";

interface CarriageCardProps {
    carriage: any;
    blockId: "first" | "second";

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

interface SelectedSeat {
    index: number;
    price: number;
}

const CarriageCard: React.FC<CarriageCardProps> = ({
    carriage,
    onUpdateSeats,
    blockId,
}) => {
    const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);
    const [extras, setExtras] = React.useState({
        wifi: false,
        linens: false,
    });

    const coach = carriage.coach;
    const seats = carriage.seats;
    const wagonNumber = coach.name.match(/\d+/)?.[0] ?? coach.name;
    const type = coach.class_type;

    const isLuxOrSeat = type === "first" || type === "fourth";
    const isCoupeOrPlatz = type === "second" || type === "third";

    const upperPrice = isCoupeOrPlatz ? coach.top_price : null;
    const lowerPrice = isCoupeOrPlatz ? coach.bottom_price : coach.top_price;
    const sidePrice = isCoupeOrPlatz ? coach.side_price : null;

    const toggleSeat = (seatIndex: number, price: number) => {
        setSelectedSeats((prev) => {
            const exists = prev.find((s) => s.index === seatIndex);
            if (exists) {
                return prev.filter((s) => s.index !== seatIndex);
            }
            return [...prev, { index: seatIndex, price }];
        });
    };

    const toggleExtra = (key: "wifi" | "linens") => {

        setExtras((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    // === суммы ===
    const ticketsTotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
    const servicesTotal =
        (extras.wifi ? coach.wifi_price : 0) +
        (extras.linens ? coach.linens_price : 0);
    const total = ticketsTotal + servicesTotal;

    useEffect(() => {
        onUpdateSeats?.({
            blockId,
            type: coach.class_type,
            wagonId: coach._id,
            seats: selectedSeats.map((s) => ({
                index: s.index,
                price: s.price,
            })),
            services: {
                wifi: extras.wifi,
                linens: extras.linens,
                wifi_price: coach.wifi_price,
                linens_price: coach.linens_price,
                total: servicesTotal,
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSeats, extras]);

    return (
        <div className={styles.card}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.wagonNumber}>{wagonNumber}</div>
                    <div className={styles.wagonLabel}>вагон</div>
                </div>

                <div className={styles.right}>
                    {/* блок Места + Стоимость */}
                    <CarriageTopRow
                        coach={coach}
                        isCoupeOrPlatz={isCoupeOrPlatz}
                        isLuxOrSeat={isLuxOrSeat}
                        upperPrice={upperPrice}
                        lowerPrice={lowerPrice}
                        sidePrice={sidePrice}
                    />

                    {/* блок услуг */}
                    <CarriageServices
                        coach={coach}
                        extras={extras}
                        onToggleExtra={toggleExtra}
                    />
                </div>
            </div>

            {/* карта мест */}
            <div className={styles.seatMap}>
                <CarSeatsMap
                    seats={seats}
                    type={coach.class_type}
                    wagonNumber={wagonNumber}
                    selectedSeats={selectedSeats.map((s) => s.index)}
                    onSeatSelect={toggleSeat}
                    upperPrice={upperPrice!}
                    lowerPrice={lowerPrice!}
                    sidePrice={sidePrice!}
                />
            </div>

            {total > 0 && (
                <div className={styles.totalBox}>
                    <div className={styles.rowLine}>
                        <span>Билеты:</span>
                        <span>{formatPrice(ticketsTotal)} ₽</span>
                    </div>

                    <div className={styles.rowLine}>
                        <span>Доп. услуги:</span>
                        <span>{formatPrice(servicesTotal)} ₽</span>
                    </div>

                    <div className={styles.totalAmount}>
                        <div>{formatPrice(total)}</div>
                        <Ruble className={styles.rubleIcon} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarriageCard;