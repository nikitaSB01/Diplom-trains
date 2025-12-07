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
    actionSlot?: React.ReactNode;
}

const TrainRow: React.FC<Props> = ({ train, fromCity, toCity, onSelectTrain, actionSlot }) => {
    const dep = train.departure;
    const arr = train.arrival;

    return (
        <div className={styles.row}>

            <TrainLeft dep={dep} fromCity={fromCity} toCity={toCity} />

            <TrainDirections departure={dep} arrival={arr} />

            <div className={styles.right}>
                <TrainPrices dir={dep} />

                <div className={styles.serviceBut}>
                    <TrainServices dir={dep} />
                    {actionSlot ?? (
                        <button
                            className={styles.button}
                            onClick={() => onSelectTrain?.(train)}
                        >
                            Выбрать места
                        </button>
                    )}
                </div>

            </div>

        </div>
    );
};

export default TrainRow;