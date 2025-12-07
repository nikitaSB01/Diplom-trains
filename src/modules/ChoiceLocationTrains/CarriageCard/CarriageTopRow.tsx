import React from "react";
import styles from "./CarriageCard.module.css";
import { ReactComponent as Ruble } from "../../../assets/icons/Train/ruble.svg";
import { formatPrice } from "../../../utils/format";

interface Props {
    coach: any;
    isCoupeOrPlatz: boolean;
    isLuxOrSeat: boolean;
    upperPrice: number | null;
    lowerPrice: number | null;
    sidePrice: number | null;
}

const CarriageTopRow: React.FC<Props> = ({
    coach,
    isCoupeOrPlatz,
    isLuxOrSeat,
    upperPrice,
    lowerPrice,
    sidePrice,
}) => {
    return (
        <div className={styles.topRow}>
            {/* Левая колонка – места */}
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
                        {coach.class_type === "third" && (
                            <div className={styles.subRow}>
                                <span className={styles.subTitle}>Боковые</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Правая колонка – стоимость */}
            <div className={styles.col}>
                <div className={styles.titleGray}>Стоимость</div>

                {isCoupeOrPlatz && (
                    <div className={styles.containerPrice}>
                        {/* верхние */}
                        <div className={styles.costRow}>
                            <span className={styles.costValue}>
                                {formatPrice(upperPrice ?? 0)}
                            </span>
                            <Ruble className={styles.rubleIcon} />
                        </div>

                        {/* нижние */}
                        <div className={styles.costRow}>
                            <span className={styles.costValue}>
                                {formatPrice(lowerPrice ?? 0)}
                            </span>
                            <Ruble className={styles.rubleIcon} />
                        </div>

                        {/* боковые */}
                        {coach.class_type === "third" && (
                            <div className={styles.costRow}>
                                <span className={styles.costValue}>
                                    {formatPrice(sidePrice!)}
                                </span>
                                <Ruble className={styles.rubleIcon} />
                            </div>
                        )}
                    </div>
                )}

                {isLuxOrSeat && (
                    <div className={styles.costRow}>
                        <span className={styles.costValue}>
                            {formatPrice(lowerPrice ?? 0)}
                        </span>
                        <Ruble className={styles.rubleIcon} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarriageTopRow;