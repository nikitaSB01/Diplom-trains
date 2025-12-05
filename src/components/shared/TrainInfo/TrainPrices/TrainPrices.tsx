import React from "react";
import styles from "./TrainPrices.module.css";
import { formatPrice } from "../../../../utils/format";
import { ReactComponent as Ruble } from "../../../../assets/icons/Train/ruble.svg";

interface Props {
    dir: any; // departure или arrival
}

const getSeats = (dir: any, cls: string) =>
    dir.available_seats_info?.[cls] ?? 0;

const getPrice = (dir: any, cls: string) =>
    dir.price_info?.[cls]?.bottom_price ??
    dir.price_info?.[cls]?.top_price ??
    dir.price_info?.[cls]?.side_price ??
    dir.min_price;

const TrainPrices: React.FC<Props> = ({ dir }) => {
    return (
        <div className={styles.priceList}>

            {dir.have_third_class && (
                <div className={styles.priceRow}>
                    <span className={styles.priceLabel}>Плацкарт</span>
                    <span className={styles.priceSeats}>{getSeats(dir, "third")}</span>
                    <span className={styles.priceValue}>
                        <span className={styles.pricePrefix}>от</span>{" "}
                        <span className={styles.priceNumber}>
                            {formatPrice(getPrice(dir, "third"))}
                            <Ruble className={styles.rubleIcon} />
                        </span>
                    </span>
                </div>
            )}

            {dir.have_second_class && (
                <div className={styles.priceRow}>
                    <span className={styles.priceLabel}>Купе</span>
                    <span className={styles.priceSeats}>{getSeats(dir, "second")}</span>
                    <span className={styles.priceValue}>
                        <span className={styles.pricePrefix}>от</span>{" "}
                        <span className={styles.priceNumber}>
                            {formatPrice(getPrice(dir, "second"))}
                            <Ruble className={styles.rubleIcon} />
                        </span>
                    </span>
                </div>
            )}

            {dir.have_first_class && (
                <div className={styles.priceRow}>
                    <span className={styles.priceLabel}>Люкс</span>
                    <span className={styles.priceSeats}>{getSeats(dir, "first")}</span>
                    <span className={styles.priceValue}>
                        <span className={styles.pricePrefix}>от</span>{" "}
                        <span className={styles.priceNumber}>
                            {formatPrice(getPrice(dir, "first"))}
                            <Ruble className={styles.rubleIcon} />
                        </span>
                    </span>
                </div>
            )}

            {dir.have_fourth_class && (
                <div className={styles.priceRow}>
                    <span className={styles.priceLabel}>Сидячий</span>
                    <span className={styles.priceSeats}>{getSeats(dir, "fourth")}</span>
                    <span className={styles.priceValue}>
                        <span className={styles.pricePrefix}>от</span>{" "}
                        <span className={styles.priceNumber}>
                            {formatPrice(getPrice(dir, "fourth"))}
                            <Ruble className={styles.rubleIcon} />
                        </span>
                    </span>
                </div>
            )}

        </div>
    );
};

export default TrainPrices;