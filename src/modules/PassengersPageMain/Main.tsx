import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styles from "./Main.module.css";

import Steps from "../../components/Steps/Steps";
import FiltersThereBack from "../../components/SearchPageMain/Filters/FiltersThereBake/FiltersThereBack";
import PassengersBlock from "./blocks/PassengersBlock/PassengersBlock";
import TotalBlock from "./blocks/TotalBlock/TotalBlock";
import TitleBlock from "./blocks/TitleBlock/TitleBlock";
import CollapsibleHeader from "./blocks/CollapsibleHeader/CollapsibleHeader";
import PassengerCard from "./blocks/PassengerCard/PassengerCard";

import { ReactComponent as UserIcon } from "../../assets/icons/PassengersPage/PassengersBlock/passenger.svg";
import { ReactComponent as PlusHover } from "../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/PlusNewPas.svg";
import { ReactComponent as Plus } from "../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/Plus.svg";



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

    const [openPassengers, setOpenPassengers] = useState(true);

    /* данные по хранению количества карточек пассажиров */
    const baseCount =
        (block1?.passengers.adults ?? 0) +
        (block1?.passengers.kids ?? 0) +
        (block1?.passengers.kidsNoSeat ?? 0);

    const [extraPassengers, setExtraPassengers] = useState<number>(0);


    /* массив флагов для card */
    const totalCards = baseCount + extraPassengers;

    const [completedMap, setCompletedMap] = useState<boolean[]>([]);

    useEffect(() => {
        setCompletedMap(Array(totalCards).fill(false));
    }, [totalCards]);


    const handleCompleteChange = (index: number, completed: boolean) => {
        setCompletedMap((prev) => {
            const copy = [...prev];
            copy[index] = completed;
            return copy;
        });
    };

    const handleRequestOpenNext = (index: number) => {
        const next = index + 1;

        // ищем следующий PassengerCard по id
        const nextCard = document.getElementById(`passenger-card-${next}`);

        if (nextCard) {
            const headerBtn = nextCard.querySelector("button");
            headerBtn?.click();

            nextCard.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const allCompleted = completedMap.every(Boolean);

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

                        <div className={styles.containerPassengers}>
                            <CollapsibleHeader
                                iconLeft={<UserIcon />}
                                title="Пассажиры"
                                isOpen={openPassengers}
                                onToggle={() => setOpenPassengers(!openPassengers)}
                                className={styles.passengersHeader}
                            />
                            {openPassengers && (
                                <div className={styles.passengersList}>
                                    {block1 && (
                                        <PassengersBlock
                                            passengers={block1.passengers}
                                            adultsPrice={block1.adultsPrice}
                                            kidsPrice={block1.kidsPrice}
                                            servicesList={block1.servicesList}
                                        />
                                    )}

                                    {block2 && (
                                        <>
                                            <div className={styles.sectionDivider}>Обратно</div>
                                            <PassengersBlock
                                                passengers={block2.passengers}
                                                adultsPrice={block2.adultsPrice}
                                                kidsPrice={block2.kidsPrice}
                                                servicesList={block2.servicesList}
                                            />
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* ИТОГ */}
                        <TotalBlock totalPrice={totalPrice} />
                    </div>
                </div>

                <div className={styles.rightColumn}>
                    <div className={styles.containerAddPassengers}>
                        {/* --- рендерим базовые карточки --- */}
                        {Array.from({ length: baseCount }).map((_, i) => (
                            <PassengerCard
                                key={`base-${i}`}
                                index={i}
                                onCompleteChange={handleCompleteChange}
                                onRequestOpenNext={handleRequestOpenNext}
                            />))}

                        {/* --- дополнительные карточки --- */}
                        {Array.from({ length: extraPassengers }).map((_, i) => (
                            <PassengerCard
                                key={`extra-${i}`}
                                index={baseCount + i}
                                onCompleteChange={handleCompleteChange}
                                onRequestOpenNext={handleRequestOpenNext}
                            />))}

                        {/* --- кнопка добавить --- */}
                        <button
                            className={styles.addBtn}
                            onClick={() => setExtraPassengers(extraPassengers + 1)}
                        >
                            <p>Добавить пассажира</p>
                            <div className={styles.iconWrapper}>
                                <Plus className={styles.iconPlus} />
                                <PlusHover className={styles.iconPlusHover} />
                            </div>
                        </button>
                        <button
                            className={`${styles.nextMainBtn} ${allCompleted ? styles.active : ""}`}
                            disabled={!allCompleted}
                        >
                            Далее
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Main;