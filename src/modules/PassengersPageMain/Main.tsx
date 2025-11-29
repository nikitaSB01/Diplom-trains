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

// ---------- функция сборки данных по ОДНОМУ БЛОКУ (first / second) ----------
const buildPassengerBlock = (tickets: Tickets, seatDataArr: SeatData[]) => {
    if (!seatDataArr || seatDataArr.length === 0) return null;

    const { adults, kids, kidsNoSeat } = tickets;

    const allSeatPrices: number[] = seatDataArr
        .flatMap((wagon) => wagon.seats.map((s) => s.price))
        .sort((a, b) => b - a);

    let adultsPrice = 0;
    let kidsPrice = 0;

    for (let i = 0; i < allSeatPrices.length; i++) {
        const price = allSeatPrices[i];

        if (i < adults) adultsPrice += price;
        else if (i < adults + kids) kidsPrice += price * 0.5;
    }

    // === СОБИРАЕМ ВСЕ ОТДЕЛЬНЫЕ УСЛУГИ ===
    // === СОБИРАЕМ ВСЕ ОТДЕЛЬНЫЕ УСЛУГИ ===
    const servicesList = seatDataArr.flatMap((wagon) => {

        const seatCount = wagon.seats.length;
        const out: { name: string; price: number }[] = [];

        // --- Wi-Fi: единоразово ---
        if (wagon.services.wifi) {
            out.push({
                name: "Wi-Fi",
                price: wagon.services.wifi_price
            });
        }

        // --- Бельё: за каждое выбранное место ---
        if (wagon.services.linens) {
            out.push({
                name: `Бельё × ${seatCount}`,
                price: wagon.services.linens_price * seatCount
            });
        }

        return out;
    });

    const servicesTotal = servicesList.reduce((s, x) => s + x.price, 0);


    return {
        passengers: { adults, kids, kidsNoSeat },
        adultsPrice,
        kidsPrice,
        servicesTotal,
        servicesList,    // ← ВАЖНО! передаём в компонент
        total: adultsPrice + kidsPrice + servicesTotal,
    };
};

const Main: React.FC = () => {
    const location = useLocation();
    const orderData: any = location.state; // можешь типизировать своим OrderData, если он есть

    const dep = orderData.train.departure;

    // seats.first / seats.second — теперь массивы вагонов
    const seatsFirst: SeatData[] = orderData.seats.first || [];
    const seatsSecond: SeatData[] = orderData.seats.second || [];

    // ---------- собираем блок 1 ----------
    const block1 = buildPassengerBlock(orderData.tickets.first, seatsFirst);

    // ---------- собираем блок 2 ----------
    const block2 = buildPassengerBlock(orderData.tickets.second, seatsSecond);

    const totalPrice = (block1?.total ?? 0) + (block2?.total ?? 0);

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
                                servicesTotal={block1.servicesTotal}
                                servicesList={block1.servicesList}   // ← добавили
                                hideHeader={false}   // ← явное указание
                            />
                        )}

                        {/* ВТОРОЙ БЛОК */}
                        {block2 && (
                            <>
                                <div className={styles.sectionDivider}>Обратно</div>  {/* ← разделение */}
                                <PassengersBlock
                                    passengers={block2.passengers}
                                    adultsPrice={block2.adultsPrice}
                                    kidsPrice={block2.kidsPrice}
                                    servicesTotal={block2.servicesTotal}
                                    servicesList={block2.servicesList}   // ← добавили
                                    hideHeader={true}    // ← Скрываем дублирующий заголовок
                                />
                            </>
                        )}

                        {/* ИТОГ */}
                        <TotalBlock totalPrice={totalPrice} />
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