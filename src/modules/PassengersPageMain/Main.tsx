import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import styles from './Main.module.css';

import Steps from '../../components/Steps/Steps';
import FiltersThereBack from '../../components/SearchPageMain/Filters/FiltersThereBake/FiltersThereBack';
import PassengersBlock from './blocks/PassengersBlock/PassengersBlock';
import TitleBlock from './blocks/TitleBlock/TitleBlock';
import TotalBlock from './blocks/TotalBlock/TotalBlock';



const Main: React.FC = () => {
    const location = useLocation();
    const orderData = location.state;

    const departureSeats = orderData.seats.first;       // выбранные места "Туда"
    const departureTickets = orderData.tickets.first;   // взрослые/дети для "Туда"

    const adultsCount = departureTickets.adults ?? 0;
    const kidsCount = departureTickets.kids ?? 0;
    const kidsNoSeatCount = departureTickets.kidsNoSeat ?? 0; // пока 0 в цене

    const totalPassengersWithSeat = adultsCount + kidsCount;

    // ---------- утилита: цена одного места по номеру и типу ----------
    const getSeatPrice = (
        seatNumber: number,
        seatType: string,
        priceInfo: any,
        fallback: number
    ): number => {
        if (!priceInfo) return fallback;

        // Плацкарт / общий (third / fourth) — боковые + верх/низ
        if (seatType === "third" || seatType === "fourth") {
            // СИДЕНЬЯ-БОКОВУШКИ (обычно 37+)
            if (seatNumber >= 37) {
                return (
                    priceInfo.side_price ??
                    priceInfo.bottom_price ??
                    priceInfo.top_price ??
                    priceInfo.price ??
                    fallback
                );
            }

            // ВАГОННЫЕ МЕСТА: нечётное — нижнее, чётное — верхнее
            const isLower = seatNumber % 2 === 1;
            if (isLower) {
                return (
                    priceInfo.bottom_price ??
                    priceInfo.price ??
                    priceInfo.top_price ??
                    fallback
                );
            } else {
                return (
                    priceInfo.top_price ??
                    priceInfo.price ??
                    priceInfo.bottom_price ??
                    fallback
                );
            }
        }

        // Купе / люкс (first / second) — только верх/низ
        if (seatType === "first" || seatType === "second") {
            const isLower = seatNumber % 2 === 1;
            if (isLower) {
                return (
                    priceInfo.bottom_price ??
                    priceInfo.price ??
                    priceInfo.top_price ??
                    fallback
                );
            } else {
                return (
                    priceInfo.top_price ??
                    priceInfo.price ??
                    priceInfo.bottom_price ??
                    fallback
                );
            }
        }

        // Фолбэк
        return (
            priceInfo.price ??
            priceInfo.bottom_price ??
            priceInfo.top_price ??
            priceInfo.side_price ??
            fallback
        );
    };

    // ---------- считаем массив цен за каждое выбранное место ----------
    const departure = orderData.train.departure;
    const defaultBasePrice = departure.min_price;

    let seatPrices: number[] = [];

    if (departureSeats && Array.isArray(departureSeats.seats)) {
        const seatType = departureSeats.type; // "first" | "second" | "third" | "fourth"
        const priceInfo = departure.price_info?.[seatType];

        seatPrices = departureSeats.seats.map((seatNumber: number) =>
            getSeatPrice(seatNumber, seatType, priceInfo, defaultBasePrice)
        );
    }

    // сортируем от дорогих к дешёвым, чтобы сначала «распределить» их взрослым
    seatPrices.sort((a, b) => b - a);

    // ---------- распределяем по взрослым и детям (ребёнок 50%) ----------
    let adultsPrice = 0;
    let kidsPrice = 0;

    for (let i = 0; i < seatPrices.length; i++) {
        const price = seatPrices[i];

        if (i < adultsCount) {
            adultsPrice += price;
        } else if (i < adultsCount + kidsCount) {
            kidsPrice += price * 0.5; // 50% скидка ребёнку
        }
        // kidsNoSeat вообще не используют места → здесь не считаем
    }

    const passengersPrice = adultsPrice + kidsPrice;

    let servicesPrice = 0;

    if (departureSeats?.services) {
        const s = departureSeats.services;
        const usedSeatsCount = seatPrices.length;

        if (s.wifi) {
            servicesPrice += s.wifi_price; // = 191
        }

        if (s.linens) {
            servicesPrice += s.linens_price * usedSeatsCount; // 245 * 1 = 245
        }
    }

    const totalPrice = passengersPrice + servicesPrice;

    console.log("Пришедшие данные:", orderData);
    console.log("seatPrices:", seatPrices);
    console.log("adultsPrice:", adultsPrice, "kidsPrice:", kidsPrice, "servicesPrice:", servicesPrice, "total:", totalPrice);

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

                        <PassengersBlock
                            passengers={orderData.tickets.first}
                            adultsPrice={adultsPrice}
                            kidsPrice={kidsPrice}
                            services={orderData.seats.first?.services ?? null}
                        />

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