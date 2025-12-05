import React from "react";
import styles from "./TrainRow.module.css";

import TrainLeft from "../../TrainLeft/TrainLeft";
import TrainDirections from "../TrainDirections/TrainDirections";
import TrainPrices from "../TrainPrices/TrainPrices";
import TrainServices from "../TrainServices/TrainServices";

import { Train } from "../../../../types/Train/trainTypes";

interface Props {
    train: Train;
    fromCity: any;
    toCity: any;
    onSelectTrain?: (train: Train) => void;
}

const TrainRow: React.FC<Props> = ({ train, fromCity, toCity, onSelectTrain }) => {
    const dep = train.departure;
    const arr = train.arrival;

    return (
        <div className={styles.row}>

            {/* ЛЕВАЯ КОЛОНКА */}
            <TrainLeft dep={dep} fromCity={fromCity} toCity={toCity} />

            {/* ЦЕНТРАЛЬНЫЙ БЛОК (Туда / Обратно) */}
            <TrainDirections departure={dep} arrival={arr} />

            {/* ПРАВАЯ КОЛОНКА */}
            <div className={styles.right}>
                <TrainPrices dir={dep} />
                
                <div className={styles.serviceBut}>
                    <TrainServices dir={dep} />
                    <button
                        className={styles.button}
                        onClick={() => onSelectTrain?.(train)}
                    > Выбрать места
                    </button>
                </div>

            </div>

        </div>
    );
};

export default TrainRow;