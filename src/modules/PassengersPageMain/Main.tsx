import React from "react";
import { useLocation } from "react-router-dom";

import styles from "./Main.module.css";

import Steps from "../../components/Steps/Steps";
import FiltersThereBack from "../../components/SearchPageMain/Filters/FiltersThereBake/FiltersThereBack";
import PassengersBlock from "./blocks/PassengersBlock/PassengersBlock";
import TotalBlock from "./blocks/TotalBlock/TotalBlock";
import TitleBlock from "./blocks/TitleBlock/TitleBlock";


// ---------- типы ----------
interface Tickets {
    adults: number;
    kids: number;
    kidsNoSeat: number;
}

interface SeatData {
    blockId: "first" | "second";
    type: string;
    wagonId: string;
    seats: { index: number; price: number }[];
    services: {
        wifi: boolean;
        linens: boolean;
        wifi_price: number;
        linens_price: number;
        total: number;
    };
}


// ---------- утилита цены одного места ----------
const getSeatPrice = (
    seatNumber: number,
    seatType: string,
    priceInfo: any,
    fallback: number
): number => {
    if (!priceInfo) return fallback;

    // Плацкарт / сидячий
    if (seatType === "third" || seatType === "fourth") {
        if (seatNumber >= 37) {
            return priceInfo.side_price ?? fallback;
        }
        const isLower = seatNumber % 2 === 1;
        return isLower ? priceInfo.bottom_price ?? fallback : priceInfo.top_price ?? fallback;
    }

    // Купе / люкс
    if (seatType === "first" || seatType === "second") {
        const isLower = seatNumber % 2 === 1;
        return isLower ? priceInfo.bottom_price ?? fallback : priceInfo.top_price ?? fallback;
    }

    return priceInfo.price ?? fallback;
};


// ---------- функция сборки данных по одному блоку ----------
const buildPassengerBlock = (
    tickets: Tickets,
    seatData: SeatData | null,
    priceInfo: any,
    fallbackPrice: number
) => {
    if (!seatData) return null;

    const { adults, kids, kidsNoSeat } = tickets;

    // берём цену прямо из seatData.seats
    const sortedPrices: number[] = seatData.seats
        .map(s => s.price)
        .sort((a, b) => b - a);

    let adultsPrice = 0;
    let kidsPrice = 0;

    for (let i = 0; i < sortedPrices.length; i++) {
        const price = sortedPrices[i];
        if (i < adults) adultsPrice += price;
        else if (i < adults + kids) kidsPrice += price * 0.5;
    }

    const servicesTotal = seatData.services?.total ?? 0;

    return {
        passengers: { adults, kids, kidsNoSeat },
        adultsPrice,
        kidsPrice,
        services: seatData.services,
        total: adultsPrice + kidsPrice + servicesTotal
    };
};



const Main: React.FC = () => {
    const location = useLocation();
    const orderData = location.state;

    const dep = orderData.train.departure;

    // ---------- собираем блок 1 ----------
    const block1 = buildPassengerBlock(
        orderData.tickets.first,
        orderData.seats.first,
        dep.price_info?.[orderData.seats.first?.type],
        dep.min_price
    );

    // ---------- собираем блок 2 ----------
    const block2 = buildPassengerBlock(
        orderData.tickets.second,
        orderData.seats.second,
        dep.price_info?.[orderData.seats.second?.type],
        dep.min_price
    );


    return (
        <section className={styles.main}>
            <Steps currentStep={2} />

            <div className={styles.container}>
                <div className={styles.leftColumn}>
                    <div className={styles.containerInfo}>
                        <TitleBlock />

                        <FiltersThereBack
                            title="Туда"
                            passengerMode
                            trainData={orderData.train.departure}
                        />

                        <FiltersThereBack
                            title="Обратно"
                            passengerMode
                            trainData={orderData.train.arrival}
                        />

                        {/* ПЕРВЫЙ БЛОК */}
                        {block1 && (
                            <PassengersBlock
                                passengers={block1.passengers}
                                adultsPrice={block1.adultsPrice}
                                kidsPrice={block1.kidsPrice}
                                services={block1.services}
                            />
                        )}

                        {/* ВТОРОЙ БЛОК */}
                        {block2 && (
                            <PassengersBlock
                                passengers={block2.passengers}
                                adultsPrice={block2.adultsPrice}
                                kidsPrice={block2.kidsPrice}
                                services={block2.services}
                            />
                        )}

                        {/* ИТОГ */}
                        <TotalBlock totalPrice={(block1?.total ?? 0) + (block2?.total ?? 0)} />
                    </div>
                </div>

                <div className={styles.rightColumn}>
                    <pre style={{ whiteSpace: "pre-wrap", marginTop: 20 }}>
                        {JSON.stringify(orderData, null, 2)}
                    </pre>
                </div>
            </div>
        </section>
    );
};

export default Main;