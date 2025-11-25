import React, { useEffect, useState } from "react";
import styles from "./CarriageCard.module.css";

import { ReactComponent as AC } from "../../../assets/icons/Train/conditioning.svg";
import { ReactComponent as Wifi } from "../../../assets/icons/Train/wifi.svg";
import { ReactComponent as Food } from "../../../assets/icons/Train/cup.svg";
import { ReactComponent as Linens } from "../../../assets/icons/Train/Underwear.svg";
import { ReactComponent as Ruble } from "../../../assets/icons/Train/ruble.svg";

import CarSeatsMap from "../CarSeatsMap/CarSeatsMap";

const CarriageCard = ({ carriage }: any) => {

    interface SelectedSeat {
        index: number;
        price: number;
    }
    const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);
    const toggleSeat = (seatIndex: number, price: number) => {
        setSelectedSeats(prev => {
            const exists = prev.find(s => s.index === seatIndex);

            if (exists) {
                return prev.filter(s => s.index !== seatIndex);
            }

            return [...prev, { index: seatIndex, price }];
        });
    };



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

    const included = {
        // входит в стоимость
        ac: coach.have_air_conditioning,
        wifi: coach.have_wifi,
        linens: coach.is_linens_included,
    };

    const purchasable = {
        // можно докупить
        wifi: !coach.have_wifi && coach.wifi_price > 0,
        linens: !coach.is_linens_included && coach.linens_price > 0,
    };

    const toggleExtra = (key: "wifi" | "linens") => {
        if (!purchasable[key]) return; // если нельзя купить — не кликаем
        setExtras(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // === СУММА БИЛЕТОВ ===
    const ticketsTotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);

    // === СУММА УСЛУГ ===
    const servicesTotal =
        (extras.wifi ? coach.wifi_price : 0) +
        (extras.linens ? coach.linens_price : 0);

    // === ОБЩАЯ СУММА ===
    const total = ticketsTotal + servicesTotal;

    return (
        <div className={styles.card}>
            <div className={styles.container}>

                {/* ЛЕВАЯ ЖЁЛТАЯ ЧАСТЬ */}
                <div className={styles.left}>
                    <div className={styles.wagonNumber}>{wagonNumber}</div>
                    <div className={styles.wagonLabel}>вагон</div>
                </div>

                {/* ПРАВАЯ ЧАСТЬ */}
                <div className={styles.right}>

                    {/* ======= БЛОКИ 1 и 2: МЕСТА & СТОИМОСТЬ ======= */}
                    <div className={styles.topRow}>
                        {/* === КОЛОНКА 1: МЕСТА === */}
                        <div className={styles.col}>
                            <div className={styles.placeRow}>
                                <span className={styles.titleGrayInline}>Места</span>
                                <span className={styles.valueBigInline}>{coach.available_seats}</span>
                            </div>

                            {isCoupeOrPlatz && (
                                <div className={styles.subInfo}>
                                    <div className={styles.subRow}>
                                        <span className={styles.subTitle}>Верхние</span>
                                    </div>
                                    <div className={styles.subRow}>
                                        <span className={styles.subTitle}>Нижние</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* === КОЛОНКА 2: СТОИМОСТЬ === */}
                        <div className={styles.col}>
                            <div className={styles.titleGray}>Стоимость</div>

                            {isCoupeOrPlatz && (
                                <div className={styles.containerPrice}>
                                    <div className={styles.costRow}>
                                        <span className={styles.costValue}>
                                            {upperPrice.toLocaleString("ru-RU")}
                                        </span>
                                        <Ruble className={styles.rubleIcon} />

                                    </div>
                                    <div className={styles.costRow}>
                                        <span className={styles.costValue}>
                                            {lowerPrice.toLocaleString("ru-RU")}
                                        </span>
                                        <Ruble className={styles.rubleIcon} />

                                    </div>
                                </div>
                            )}

                            {isLuxOrSeat && (
                                <div className={styles.costRow}>
                                    <span className={styles.costValue}>
                                        {lowerPrice.toLocaleString("ru-RU")}
                                    </span>
                                    <Ruble className={styles.rubleIcon} />

                                </div>
                            )}
                        </div>

                    </div>
                    <div className={styles.contsinerServices}>
                        {/* === ОБСЛУЖИВАНИЕ === */}
                        {/* === WiFi === */}
                        <button
                            type="button"
                            className={
                                included.wifi
                                    ? styles.iconIncluded              // входит в стоимость
                                    : extras.wifi
                                        ? styles.iconActive                // пользователь купил
                                        : purchasable.wifi
                                            ? styles.iconAvailable             // можно купить
                                            : styles.iconDisabled              // нет услуги
                            }
                            onClick={() => toggleExtra("wifi")}
                            disabled={included.wifi || !purchasable.wifi}   // отключаем если включено или недоступно
                        >
                            <Wifi />
                            <div className={styles.tooltipService}>WI-FI</div>

                        </button>

                        {/* === Бельё === */}
                        <button
                            type="button"
                            className={
                                included.linens
                                    ? styles.iconIncluded
                                    : extras.linens
                                        ? styles.iconActive
                                        : purchasable.linens
                                            ? styles.iconAvailable
                                            : styles.iconDisabled
                            }
                            onClick={() => toggleExtra("linens")}
                            disabled={included.linens || !purchasable.linens}
                        >
                            <Linens />
                            <div className={styles.tooltipService}>белье</div>

                        </button>

                        {/* === Кондиционер === */}
                        <button
                            type="button"
                            className={
                                coach.have_air_conditioning
                                    ? styles.iconIncluded
                                    : styles.iconDisabled
                            }
                            disabled
                        >
                            <AC />
                            <div className={styles.tooltipService}>кондиционер</div>

                        </button>
                    </div>
                </div>
            </div>

            {/* КАРТА МЕСТ */}
            <div className={styles.seatMap}>
                <CarSeatsMap
                    seats={seats}
                    type={coach.class_type}
                    wagonNumber={wagonNumber}
                    selectedSeats={selectedSeats.map(s => s.index)}
                    onSeatSelect={toggleSeat}
                    upperPrice={upperPrice!}
                    lowerPrice={lowerPrice!}
                />
            </div>

            {total > 0 && (
                <div className={styles.totalBox}>
                    <div className={styles.rowLine}>
                        <span>Билеты:</span>
                        <span>{ticketsTotal.toLocaleString("ru-RU")} ₽</span>
                    </div>

                    <div className={styles.rowLine}>
                        <span>Доп. услуги:</span>
                        <span>{servicesTotal.toLocaleString("ru-RU")} ₽</span>
                    </div>

                    <div className={styles.totalAmount}>
                        <div>{total.toLocaleString("ru-RU")}</div>
                        <Ruble className={styles.rubleIcon} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarriageCard;