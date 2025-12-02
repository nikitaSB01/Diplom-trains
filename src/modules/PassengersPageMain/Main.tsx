import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Main.module.css";

import Steps from "../../components/Steps/Steps";
import PassengerCard from "./blocks/PassengerCard/PassengerCard";
import LeftColumnInfo from "../../modules/shared/LeftColumnInfo/LeftColumnInfo";

import { ReactComponent as PlusHover } from "../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/PlusNewPas.svg";
import { ReactComponent as Plus } from "../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/Plus.svg";

interface PassengersPageMainProps {
    orderData: any;
    passengers: any[] | null;
    block1: any;
    block2: any;
    totalPrice: number;
    from: any;
    to: any;
    dateStart: any;
    dateEnd: any;
}

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
        servicesList,
        total: adultsPrice + kidsPrice + servicesTotal
    };
};

const Main: React.FC<PassengersPageMainProps> = ({
    orderData,
    passengers,
    block1: initialBlock1,
    block2: initialBlock2,
    totalPrice: initialTotalPrice,
    from,
    to,
    dateStart,
    dateEnd
}) => {
    const navigate = useNavigate();

    // ---------- seats ----------
    const seatsFirst: SeatData[] = orderData.seats.first || [];
    const seatsSecond: SeatData[] = orderData.seats.second || [];

    // ---------- блоки поезда (если не переданы – считаем) ----------
    const block1 = initialBlock1 ?? buildPassengerBlock(orderData.tickets.first, seatsFirst);
    const block2 = initialBlock2 ?? buildPassengerBlock(orderData.tickets.second, seatsSecond);
    const totalPrice =
        initialTotalPrice ?? (block1?.total ?? 0) + (block2?.total ?? 0);

    // ---------- базовое количество карточек ----------
    const baseCount =
        passengers?.length ??
        ((block1?.passengers.adults ?? 0) +
            (block1?.passengers.kids ?? 0) +
            (block1?.passengers.kidsNoSeat ?? 0));

    const [extraPassengers, setExtraPassengers] = useState<number>(0);

    const totalCards = baseCount + extraPassengers;

    // ---------- completedMap (галочки "карточка заполнена") ----------
    const [completedMap, setCompletedMap] = useState<boolean[]>(
        passengers ? passengers.map(() => true) : Array(totalCards).fill(false)
    );

    useEffect(() => {
        if (!passengers) {
            setCompletedMap(Array(totalCards).fill(false));
        }
    }, [totalCards, passengers]);

    const handleCompleteChange = (index: number, completed: boolean) => {
        setCompletedMap((prev) => {
            const copy = [...prev];
            copy[index] = completed;
            return copy;
        });
    };

    const handleRequestOpenNext = (index: number) => {
        const next = index + 1;

        const nextCard = document.getElementById(`passenger-card-${next}`);

        if (nextCard) {
            const headerBtn = nextCard.querySelector("button");
            headerBtn?.click();

            nextCard.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const allCompleted = completedMap.every(Boolean);

    // ---------- formDataList (данные всех пассажиров) ----------
    const [formDataList, setFormDataList] = useState<any[]>(
        passengers || Array(totalCards).fill(null)
    );

    // ---------- считаем фактически введённые категории ----------
    const calcCategories = () => {
        let adults = 0;
        let kids = 0;

        formDataList.forEach((p) => {
            if (!p) return;

            if (p.ticketType === "adult") adults++;
            if (p.ticketType === "child") kids++;
            // детей без места НЕ учитываем
        });

        return { adults, kids };
    };

    const entered = calcCategories();

    const requiredAdults = block1?.passengers.adults ?? 0;
    const requiredKids = block1?.passengers.kids ?? 0;

    const categoriesMatch =
        entered.adults === requiredAdults &&
        entered.kids === requiredKids;

    // ---------- итоговая проверка ----------
    const canGoNext = allCompleted && categoriesMatch;

    useEffect(() => {
        if (!passengers) {
            setFormDataList(Array(totalCards).fill(null));
        }
    }, [totalCards, passengers]);

    const handleUpdatePassenger = (index: number, data: any) => {
        setFormDataList((prev) => {
            const copy = [...prev];
            copy[index] = data;
            return copy;
        });
    };

    return (
        <section className={styles.main}>
            <Steps currentStep={2} />

            <div className={styles.container}>
                {/* ---------- LEFT COLUMN ----------- */}
                <LeftColumnInfo
                    orderData={orderData}
                    block1={block1}
                    block2={block2}
                    totalPrice={totalPrice}
                />

                <div className={styles.rightColumn}>
                    <div className={styles.containerAddPassengers}>
                        {/* --- базовые карточки --- */}
                        {Array.from({ length: baseCount }).map((_, i) => (
                            <PassengerCard
                                key={`base-${i}`}
                                index={i}
                                onCompleteChange={handleCompleteChange}
                                onRequestOpenNext={handleRequestOpenNext}
                                onUpdate={handleUpdatePassenger}
                                initialData={passengers ? passengers[i] : undefined}
                            />
                        ))}

                        {/* --- дополнительные карточки --- */}
                        {Array.from({ length: extraPassengers }).map((_, i) => (
                            <PassengerCard
                                key={`extra-${i}`}
                                index={baseCount + i}
                                onCompleteChange={handleCompleteChange}
                                onRequestOpenNext={handleRequestOpenNext}
                                onUpdate={handleUpdatePassenger}
                            />
                        ))}

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

                        <div className={styles.containerButton}>
                            <button
                                className={`${styles.nextMainBtn} ${canGoNext ? styles.active : ""}`}
                                disabled={!canGoNext}
                                onClick={() => {
                                    if (!canGoNext) return;

                                    navigate("/payment", {
                                        state: {
                                            from,
                                            to,
                                            dateStart,
                                            dateEnd,
                                            orderData,
                                            passengers: formDataList,
                                            block1,
                                            block2,
                                            totalPrice
                                        }
                                    });
                                }}
                            >
                                Далее
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Main;