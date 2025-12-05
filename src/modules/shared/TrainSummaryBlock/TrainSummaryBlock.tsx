import React from "react";
import styles from "./TrainSummaryBlock.module.css";

import TitleBlockReusable from "../TitleBlockReusable/TitleBlockReusable";
import EditButton from "../../shared/EditButton/EditButton";

// 🔹 общие компоненты поезда
import TrainLeft from "../../../components/shared/TrainLeft/TrainLeft";
import TrainDirections from "../../../components/shared/TrainInfo/TrainDirections/TrainDirections";
import TrainPrices from "../../../components/shared/TrainInfo/TrainPrices/TrainPrices";
import TrainServices from "../../../components/shared/TrainInfo/TrainServices/TrainServices";

interface Props {
    orderData: any;
    onEdit?: () => void;
}

const TrainSummaryBlock: React.FC<Props> = ({ orderData, onEdit }) => {
    const dep = orderData.train.departure;
    const arr = orderData.train.arrival;

    return (
        <div className={styles.wrapper}>
            <TitleBlockReusable title="Поезд" />

            <div className={styles.content}>
                {/* ==== ЛЕВАЯ КОЛОНКА (как в списке поездов) ==== */}
                <TrainLeft
                    dep={dep}
                    fromCity={dep.from.city}
                    toCity={dep.to.city}
                />

                {/* ==== ЦЕНТРАЛЬНЫЙ БЛОК (туда / обратно) ==== */}
                <TrainDirections departure={dep} arrival={arr} />

                {/* ==== ПРАВАЯ КОЛОНКА (цены + услуги + кнопка редактировать) ==== */}
                <div className={styles.right}>
                    <TrainPrices dir={dep} />

                    <div className={styles.editWrapper}>
                        <TrainServices dir={dep} />
                        <EditButton target="train" onClick={onEdit} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainSummaryBlock;