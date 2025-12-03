import React from "react";
import styles from "./TrainSummaryBlock.module.css";
import { formatPrice } from "../../../utils/format";

import TitleBlockReusable from "../TitleBlockReusable/TitleBlockReusable";
import EditButton from "../../shared/EditButton/EditButton";
import { formatTime } from "../../../utils/format";
import { ReactComponent as ArrowThere } from "../../../assets/icons/Train/arrowThere.svg";
import { ReactComponent as ArrowBack } from "../../../assets/icons/Train/arrowBack.svg";
import { ReactComponent as Wifi } from "../../../assets/icons/Train/wifi.svg";
import { ReactComponent as Express } from "../../../assets/icons/Train/express.svg";
import { ReactComponent as Сonditioning } from "../../../assets/icons/Train/conditioning.svg";
import { ReactComponent as Cup } from "../../../assets/icons/Train/cup.svg";
import { ReactComponent as Underwear } from "../../../assets/icons/Train/Underwear.svg";
import { ReactComponent as Ruble } from "../../../assets/icons/Train/ruble.svg";

interface Props {
    orderData: any;
    onEdit?: () => void;
}

const TrainSummaryBlock: React.FC<Props> = ({ orderData, onEdit }) => {
    const dep = orderData.train.departure;
    const arr = orderData.train.arrival;

    const formatDuration = (seconds?: number) => {
        if (!seconds) return "";
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        return `${h}:${String(m).padStart(2, "0")}`;
    };

    const getSeats = (dir: any, cls: string) =>
        dir.available_seats_info?.[cls] ?? 0;

    const getPrice = (dir: any, cls: string) =>
        dir.price_info?.[cls]?.bottom_price ??
        dir.price_info?.[cls]?.top_price ??
        dir.price_info?.[cls]?.side_price ??
        dir.min_price;

    return (
        <div className={styles.wrapper}>
            <TitleBlockReusable title="Поезд" />

            <div className={styles.content}>
                {/* ================= ЛЕВАЯ КОЛОНКА ================= */}
                <div className={styles.left}>
                    <div className={styles.trainIcon}></div>

                    <div className={styles.trainNumber}>
                        {dep.train?.name}
                    </div>

                    <div className={styles.routeMain}>
                        <div className={styles.routeLine}>
                            <span className={styles.routeCity}>{dep.from.city.name}</span>
                            <span className={styles.routeArrowBlack}> </span>
                        </div>
                        <div className={styles.routeCity}>{dep.to.city.name}</div>
                    </div>
                </div>

                {/* ================= ЦЕНТРАЛЬНЫЙ БЛОК ================= */}
                <div className={styles.center}>

                    {/* === ТУДА === */}
                    <div className={styles.directionBlock}>
                        <div className={styles.direction}>

                            <div className={`${styles.timeBlock} ${styles.leftBlock}`}>
                                <p className={styles.time}>{formatTime(dep.from.datetime)}</p>
                                <p className={styles.city}>{dep.from.city.name}</p>
                                <p className={styles.station}>{dep.from.railway_station_name} вокзал</p>
                            </div>

                            <div className={styles.arrowBlock}>
                                <p className={styles.duration}>{formatDuration(dep.duration)}</p>
                                <ArrowThere className={styles.arrowSvg} />
                            </div>

                            <div className={`${styles.timeBlock} ${styles.rightBlock}`}>
                                <p className={styles.time}>{formatTime(dep.to.datetime)}</p>
                                <p className={styles.city}>{dep.to.city.name}</p>
                                <p className={styles.station}>{dep.to.railway_station_name} вокзал</p>
                            </div>

                        </div>
                    </div>

                    {/* === ОБРАТНО === */}
                    {arr && (
                        <div className={styles.directionBlock}>
                            <div className={styles.direction}>
                                <div className={`${styles.timeBlock} ${styles.leftBlock}`}>
                                    <p className={styles.time}>{formatTime(arr.to.datetime)}</p>
                                    <p className={styles.city}>{arr.to.city.name}</p>
                                    <p className={styles.station}>{arr.to.railway_station_name} вокзал</p>
                                </div>

                                <div className={styles.arrowBlock}>
                                    <p className={styles.duration}>{formatDuration(arr.duration)}</p>
                                    <ArrowBack className={styles.arrowSvg} />
                                </div>

                                <div className={`${styles.timeBlock} ${styles.rightBlock}`}>
                                    <p className={styles.time}>{formatTime(arr.from.datetime)}</p>
                                    <p className={styles.city}>{arr.from.city.name}</p>
                                    <p className={styles.station}>{arr.from.railway_station_name} вокзал</p>
                                </div>

                            </div>
                        </div>
                    )}

                </div>

                {/* ================= ПРАВАЯ КОЛОНКА ================= */}
                <div className={styles.right}>

                    <div className={styles.priceList}>
                        {dep.have_third_class && (
                            <div className={styles.priceRow}>
                                <span className={styles.priceLabel}>Плацкарт</span>
                                <span className={styles.priceSeats}>{getSeats(dep, "third")}</span>
                                <span className={styles.priceValue}>
                                    <span className={styles.pricePrefix}>от</span>
                                    <span className={styles.priceNumber}>
                                        {getPrice(dep, "third") != null ? formatPrice(getPrice(dep, "third")!) : "-"}
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
                                    <span className={styles.pricePrefix}>от</span>
                                    <span className={styles.priceNumber}>
                                        {getPrice(dep, "second") != null ? formatPrice(getPrice(dep, "second")!) : "-"}
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
                                    <span className={styles.pricePrefix}>от</span>
                                    <span className={styles.priceNumber}>
                                        {getPrice(dep, "first") != null ? formatPrice(getPrice(dep, "first")!) : "-"}
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
                                    <span className={styles.pricePrefix}>от</span>
                                    <span className={styles.priceNumber}>
                                        {getPrice(dep, "fourth") != null ? formatPrice(getPrice(dep, "fourth")!) : "-"}
                                        <Ruble className={styles.rubleIcon} />
                                    </span>
                                </span>
                            </div>
                        )}
                    </div>

                    <div className={styles.services}>
                        {dep.have_wifi && <Wifi className={styles.serviceIcon} />}
                        {dep.is_express && <Express className={styles.serviceIcon} />}
                        {dep.have_air_conditioning && <Сonditioning className={styles.serviceIcon} />}
                        <Cup className={styles.serviceIcon} />
                        <Underwear className={styles.serviceIcon} />
                    </div>

                    <EditButton target="train" />
                </div>

            </div>
        </div>
    );
};

export default TrainSummaryBlock;