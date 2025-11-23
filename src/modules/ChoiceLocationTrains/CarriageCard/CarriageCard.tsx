import React from "react";
import styles from "./CarriageCard.module.css";

import { ReactComponent as AC } from "../../../assets/icons/Train/conditioning.svg";
import { ReactComponent as Wifi } from "../../../assets/icons/Train/wifi.svg";
import { ReactComponent as Food } from "../../../assets/icons/Train/cup.svg";
import { ReactComponent as Linens } from "../../../assets/icons/Train/Underwear.svg";

import CarSeatsMap from "../CarSeatsMap/CarSeatsMap";

const CarriageCard = ({ carriage }: any) => {
    const coach = carriage.coach;
    const seats = carriage.seats;

    const extractWagonNumber = (name: string) => {
        const match = name.match(/\d+/g);
        return match ? match.join("") : name;
    };

    return (
        <div className={styles.card}>
            {/* ПРАВАЯ ЧАСТЬ */}
            <div className={styles.container}>
                {/* ЛЕВАЯ БОЛЬШАЯ ЖЁЛТАЯ ПАНЕЛЬ */}
                <div className={styles.left}>
                    <div className={styles.wagonNumber}>{extractWagonNumber(coach.name)}</div>
                    <div className={styles.wagonLabel}>вагон</div>
                </div>
                <div className={styles.right}>
                    {/* Ряд сверху */}
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <div className={styles.colTitle}>Места</div>
                            <div className={styles.colValue}>{coach.available_seats}</div>
                        </div>

                        <div className={styles.col}>
                            <div className={styles.colTitle}>Стоимость</div>
                            <div className={styles.priceBlock}>
                                <span>{coach.bottom_price.toLocaleString("ru-RU")}</span>
                                <span className={styles.ruble}>₽</span>
                            </div>
                        </div>

                        <div className={styles.col}>
                            <div className={styles.colTitle}>Обслуживание</div>
                            <div className={styles.serviceIcons}>
                                {coach.have_air_conditioning && (
                                    <div className={styles.iconWrap}>
                                        <AC />
                                        <span className={styles.tooltip}>кондиционер</span>
                                    </div>
                                )}

                                {coach.have_wifi && (
                                    <div className={styles.iconWrap}>
                                        <Wifi />
                                        <span className={styles.tooltip}>Wi-Fi</span>
                                    </div>
                                )}

                                {!coach.is_linens_included && coach.linens_price > 0 && (
                                    <div className={styles.iconWrap}>
                                        <Linens />
                                        <span className={styles.tooltip}>Постельное белье</span>
                                    </div>
                                )}

                                {coach.have_express && (
                                    <div className={styles.iconWrap}>
                                        <Food />
                                        <span className={styles.tooltip}>Питание</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ВЕРХНИЕ / НИЖНИЕ */}
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <div className={styles.colTitle}>Верхние</div>
                            <div className={styles.colValue}>{coach.top_price > 0 ? coach.top_price : "-"}</div>
                        </div>

                        <div className={styles.col}>
                            <div className={styles.colTitle}>Нижние</div>
                            <div className={styles.colValue}>{coach.bottom_price > 0 ? coach.bottom_price : "-"}</div>
                        </div>

                        {coach.side_price > 0 && (
                            <div className={styles.col}>
                                <div className={styles.colTitle}>Боковые</div>
                                <div className={styles.colValue}>{coach.side_price}</div>
                            </div>
                        )}
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