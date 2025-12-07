import React from "react";
import styles from "./TrainDirections.module.css";
import { formatTime, formatDate } from "../../../../utils/format";
import { ReactComponent as ArrowThere } from "../../../../assets/icons/Train/arrowThere.svg";
import { ReactComponent as ArrowBack } from "../../../../assets/icons/Train/arrowBack.svg";

interface Props {
    departure: any;
    arrival?: any;
    useChoiceLocation?: boolean;
    showDates?: boolean
    variant?: "default" | "passenger";
    arrowDirection?: "forward" | "back";
}

const formatDuration = (seconds?: number) => {
    if (!seconds) return "";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}:${String(m).padStart(2, "0")}`;
};
const TrainDirections: React.FC<Props> = ({
    departure,
    arrival,
    useChoiceLocation,
    showDates,
    variant,
    arrowDirection = "forward"
}) => {
    const ArrowIcon = arrowDirection === "back" ? ArrowBack : ArrowThere;

    return (
        <div
            className={[
                styles.center,
                useChoiceLocation ? styles.centerChoiseLocation : "",
                variant === "passenger" ? styles.centerPassenger : ""
            ].join(" ")}
        >
            {/* ======== ТУДА ======== */}
            <div
                className={[
                    styles.directionBlock,
                    variant === "passenger" ? styles.directionPassenger : ""
                ].join(" ")}
            >
                <div className={`${styles.direction} ${useChoiceLocation ? styles.directionChoiseLocation : ""}`}>

                    <div className={`${styles.timeBlock} ${styles.leftBlock}`}>
                        <p className={styles.time}>{formatTime(departure.from.datetime)}</p>
                        {showDates && <p className={styles.date}>{formatDate(departure.from.datetime)}</p>}
                        <p className={styles.city}>{departure.from.city.name}</p>
                        <p className={styles.station}>{departure.from.railway_station_name} вокзал</p>
                    </div>

                    <div className={styles.arrowBlock}>
                        <p className={`${styles.duration} ${useChoiceLocation ? styles.durationChoiseLocation : ""}`}>
                            {formatDuration(departure.duration)}
                        </p>
                        <ArrowIcon className={styles.arrowSvg} />
                    </div>

                    <div className={`${styles.timeBlock} ${styles.rightBlock}`}>
                        <p className={styles.time}>{formatTime(departure.to.datetime)}</p>
                        {showDates && <p className={styles.date}>{formatDate(departure.to.datetime)}</p>}
                        <p className={styles.city}>{departure.to.city.name}</p>
                        <p className={styles.station}>{departure.to.railway_station_name} вокзал</p>
                    </div>
                </div>
            </div>

            {/* ======== ОБРАТНО ======== */}
            {arrival && (
                <div
                    className={[
                        styles.directionBlock,
                        variant === "passenger" ? styles.directionPassenger : ""
                    ].join(" ")}
                >
                    <div className={styles.direction}>

                        <div className={`${styles.timeBlock} ${styles.leftBlock}`}>
                            <p className={styles.time}>{formatTime(arrival.to.datetime)}</p>
                            {showDates && <p className={styles.date}>{formatDate(arrival.to.datetime)}</p>}
                            <p className={styles.city}>{arrival.to.city.name}</p>
                            <p className={styles.station}>{arrival.to.railway_station_name} вокзал</p>
                        </div>

                        <div className={styles.arrowBlock}>
                            <p className={styles.duration}>{formatDuration(arrival.duration)}</p>
                            <ArrowBack className={styles.arrowSvg} />
                        </div>

                        <div className={`${styles.timeBlock} ${styles.rightBlock}`}>
                            <p className={styles.time}>{formatTime(arrival.from.datetime)}</p>
                            {showDates && <p className={styles.date}>{formatDate(arrival.from.datetime)}</p>}
                            <p className={styles.city}>{arrival.from.city.name}</p>
                            <p className={styles.station}>{arrival.from.railway_station_name} вокзал</p>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainDirections;