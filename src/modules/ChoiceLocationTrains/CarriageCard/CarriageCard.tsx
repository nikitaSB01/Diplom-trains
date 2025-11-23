import React from "react";
import styles from "./CarriageCard.module.css";

import { ReactComponent as AC } from "../../../assets/icons/Train/conditioning.svg";
import { ReactComponent as Wifi } from "../../../assets/icons/Train/wifi.svg";
import { ReactComponent as Food } from "../../../assets/icons/Train/cup.svg";
import { ReactComponent as Linens } from "../../../assets/icons/Train/Underwear.svg";
import { ReactComponent as Ruble } from "../../../assets/icons/Train/ruble.svg";

import CarSeatsMap from "../CarSeatsMap/CarSeatsMap";

const CarriageCard = ({ carriage }: any) => {
    const coach = carriage.coach;
    const seats = carriage.seats;

    const wagonNumber = coach.name.match(/\d+/)?.[0] ?? coach.name;

    const type = coach.class_type;

    const isLuxOrSeat = type === "first" || type === "fourth";
    const isCoupeOrPlatz = type === "second" || type === "third";

    const upperPrice = isCoupeOrPlatz ? coach.top_price : null;
    const lowerPrice = isCoupeOrPlatz ? coach.bottom_price : coach.top_price;

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

                    {/* === ОБСЛУЖИВАНИЕ === */}
                    <div className={styles.col}>
                        <div className={styles.titleGray}>Обслуживание</div>

                        <div className={styles.serviceIcons}>
                            {coach.have_air_conditioning && (
                                <div className={styles.iconWrap}><AC /></div>
                            )}
                            {coach.have_wifi && (
                                <div className={styles.iconWrap}><Wifi /></div>
                            )}
                            {!coach.is_linens_included && coach.linens_price > 0 && (
                                <div className={styles.iconWrap}><Linens /></div>
                            )}
                            {coach.have_express && (
                                <div className={styles.iconWrap}><Food /></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* КАРТА МЕСТ */}
            <div className={styles.seatMap}>
                <CarSeatsMap seats={seats} type={coach.class_type} />
            </div>
        </div>
    );
};

export default CarriageCard;