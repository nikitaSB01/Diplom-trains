import React from "react";
import styles from "./TrainSummaryBlock.module.css";

import TitleBlockReusable from "../TitleBlockReusable/TitleBlockReusable";
import EditButton from "../../shared/EditButton/EditButton";
import TrainRow from "../../../components/shared/TrainInfo/TrainRow/TrainRow";

interface Props {
    orderData: any;
    onEdit?: () => void;
}

const TrainSummaryBlock: React.FC<Props> = ({ orderData, onEdit }) => {
    const train = orderData.train;

    return (
        <div className={styles.wrapper}>
            <TitleBlockReusable title="Поезд" />

            <div className={styles.content}>
                <TrainRow
                    train={train}
                    fromCity={train.departure.from.city}
                    toCity={train.departure.to.city}
                    actionSlot={
                        <EditButton target="train" onClick={onEdit} />
                    }
                />
            </div>
        </div>
    );
};

export default TrainSummaryBlock;