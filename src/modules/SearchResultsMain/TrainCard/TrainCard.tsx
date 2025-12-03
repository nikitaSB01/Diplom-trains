/* вариант вынеса card из Trains */

import React from "react";
import styles from "./TrainCard.module.css";

import { ReactComponent as ArrowThere } from "../../../assets/icons/Train/arrowThere.svg";
import { ReactComponent as ArrowBack } from "../../../assets/icons/Train/arrowBack.svg";
import { ReactComponent as Cup } from "../../../assets/icons/Train/cup.svg";
import { ReactComponent as Wifi } from "../../../assets/icons/Train/wifi.svg";
import { ReactComponent as Express } from "../../../assets/icons/Train/express.svg";
import { ReactComponent as Сonditioning } from "../../../assets/icons/Train/conditioning.svg";
import { ReactComponent as Underwear } from "../../../assets/icons/Train/Underwear.svg";
import { ReactComponent as Ruble } from "../../../assets/icons/Train/ruble.svg";

import {
    Train,
    WagonClass,
    DirectionInfo
} from "../../../types/Train/trainTypes";

interface Props {
    train: Train;
    fromCity: any;
    toCity: any;
    mode?: "full" | "compact";       // ← режим работы
    onSelectTrain?: (train: Train) => void;
}

const TrainCard: React.FC<Props> = ({
    train,
    fromCity,
    toCity,
    mode = "full",
    onSelectTrain
}) => {
    const dep = train.departure;
    const arr = train.arrival;

    // ---------------- utils (нужны для режима full) ----------------

    const getSeats = (dir: DirectionInfo, cls: WagonClass) =>
        dir.available_seats_info?.[cls] ?? 0;

    const getPrice = (dir: DirectionInfo, cls: WagonClass) =>
        dir.price_info?.[cls]?.bottom_price ??
        dir.price_info?.[cls]?.top_price ??
        dir.price_info?.[cls]?.side_price ??
        dir.min_price;

    const formatDuration = (seconds?: number) => {
        if (!seconds) return "";
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        return `${h}:${String(m).padStart(2, "0")}`;
    };

    return (
        <div className={styles.trainCard}>
            {/* ---------- ЛЕВАЯ КОЛОНКА ---------- */}
            <div className={styles.left}>
                <div className={styles.trainIcon}></div>
                <div className={styles.trainNumber}>{dep.train?.name}</div>

                {dep.from.city.name.toLowerCase() !== fromCity.name.toLowerCase() && (
                    <div className={styles.routeCityStart}>
                        {dep.from.city.name}
                        <span className={styles.routeArrowGray}></span>
                    </div>
                )}

                <div className={styles.routeMain}>
                    <div className={styles.routeLine}>
                        <span className={styles.routeCity}>{fromCity.name}</span>
                        <span className={styles.routeArrowBlack}></span>
                    </div>
                    <div className={styles.routeCity}>{toCity.name}</div>
                </div>
            </div>

            {/* ---------- ЦЕНТР ---------- */}
            <div className={styles.center}>
                {/* Туда */}
                <div className={styles.directionBlock}>
                    <div className={styles.direction}>
                        <div className={`${styles.timeBlock} ${styles.leftBlock}`}>
                            <p className={styles.time}>
                                {new Date(dep.from.datetime * 1000).toLocaleTimeString("ru-RU", {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </p>
                            <p className={styles.city}>{dep.from.city.name}</p>
                            <p className={styles.station}>{dep.from.railway_station_name} вокзал</p>
                        </div>

                        <div className={styles.arrowBlock}>
                            <p className={styles.duration}>{formatDuration(dep.duration)}</p>
                            <ArrowThere className={styles.arrowSvg} />
                        </div>

                        <div className={`${styles.timeBlock} ${styles.rightBlock}`}>
                            <p className={styles.time}>
                                {new Date(dep.to.datetime * 1000).toLocaleTimeString("ru-RU", {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </p>
                            <p className={styles.city}>{dep.to.city.name}</p>
                            <p className={styles.station}>{dep.to.railway_station_name} вокзал</p>
                        </div>
                    </div>
                </div>

                {/* Обратно */}
                {arr && (
                    <div className={styles.directionBlock}>
                        <div className={styles.direction}>
                            <div className={`${styles.timeBlock} ${styles.leftBlock}`}>
                                <p className={styles.time}>
                                    {new Date(arr.to.datetime * 1000).toLocaleTimeString("ru-RU", {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </p>
                                <p className={styles.city}>{arr.to.city.name}</p>
                                <p className={styles.station}>{arr.to.railway_station_name} вокзал</p>
                            </div>

                            <div className={styles.arrowBlock}>
                                <p className={styles.duration}>{formatDuration(arr.duration)}</p>
                                <ArrowBack className={styles.arrowSvg} />
                            </div>

                            <div className={`${styles.timeBlock} ${styles.rightBlock}`}>
                                <p className={styles.time}>
                                    {new Date(arr.from.datetime * 1000).toLocaleTimeString("ru-RU", {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </p>
                                <p className={styles.city}>{arr.from.city.name}</p>
                                <p className={styles.station}>{arr.from.railway_station_name} вокзал</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ---------- ПРАВАЯ КОЛОНКА (меняется по режиму) ---------- */}
            <div className={styles.right}>

                {/* если режим полный → показываем цены */}
                {mode === "full" && (
                    <>
                        <div className={styles.priceList}>
                            {dep.have_third_class && (
                                <div className={styles.priceRow}>
                                    <span className={styles.priceLabel}>Плацкарт</span>
                                    <span className={styles.priceSeats}>{getSeats(dep, "third")}</span>
                                    <span className={styles.priceValue}>
                                        <span className={styles.pricePrefix}>от</span>{" "}
                                        <span className={styles.priceNumber}>
                                            {getPrice(dep, "third")?.toLocaleString("ru-RU")}
                                            <Ruble className={styles.rubleIcon} />
                                        </span>
                                    </span>
                                </div>
                            )}

                            {dep.have_second_class && (
                                <div className={styles.priceRow}>
                                    <span className={styles.priceLabel}>Купе</span>
                                    <span className={styles.priceSeats}>{getSeats(dep, "second")}</span>
                                    <span className={styles.priceValue}>
                                        <span className={styles.pricePrefix}>от</span>{" "}
                                        <span className={styles.priceNumber}>
                                            {getPrice(dep, "second")?.toLocaleString("ru-RU")}
                                            <Ruble className={styles.rubleIcon} />
                                        </span>
                                    </span>
                                </div>
                            )}

                            {dep.have_first_class && (
                                <div className={styles.priceRow}>
                                    <span className={styles.priceLabel}>Люкс</span>
                                    <span className={styles.priceSeats}>{getSeats(dep, "first")}</span>
                                    <span className={styles.priceValue}>
                                        <span className={styles.pricePrefix}>от</span>{" "}
                                        <span className={styles.priceNumber}>
                                            {getPrice(dep, "first")?.toLocaleString("ru-RU")}
                                            <Ruble className={styles.rubleIcon} />
                                        </span>
                                    </span>
                                </div>
                            )}
                            
                            {dep.have_fourth_class && (
                                <div className={styles.priceRow}>
                                    <span className={styles.priceLabel}>Сидячий</span>
                                    <span className={styles.priceSeats}>{getSeats(dep, "fourth")}</span>
                                    <span className={styles.priceValue}>
                                        <span className={styles.pricePrefix}>от</span>{" "}
                                        <span className={styles.priceNumber}>
                                            {getPrice(dep, "fourth")?.toLocaleString("ru-RU")}
                                            <Ruble className={styles.rubleIcon} />
                                        </span>
                                    </span>
                                </div>
                            )}

                        </div>

                        {/* сервисы — всегда */}
                        <div className={styles.services}>
                            {dep.have_wifi && <Wifi className={styles.serviceIcon} />}
                            {dep.is_express && <Express className={styles.serviceIcon} />}
                            {dep.have_air_conditioning && <Сonditioning className={styles.serviceIcon} />}
                            <Cup className={styles.serviceIcon} />
                            <Underwear className={styles.serviceIcon} />
                        </div>

                        <button
                            className={styles.button}
                            onClick={() => onSelectTrain?.(train)}
                        >
                            Выбрать места
                        </button>
                    </>
                )}


            </div>
        </div>
    );
};

export default TrainCard;