import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Main.module.css";

import Steps from "../../components/Steps/Steps";
import PassengerCard from "./blocks/PassengerCard/PassengerCard";
import LeftColumnInfo from "../../modules/shared/LeftColumnInfo/LeftColumnInfo";

import { ReactComponent as PlusHover } from "../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/PlusNewPas.svg";
import { ReactComponent as Plus } from "../../assets/icons/PassengersPage/PassengersBlock/PassengerCard/Plus.svg";

import {
    buildPassengerBlock,
} from "./utils/buildPassengerBlock";

import { PassengersPageMainProps, SeatData } from "../../types/passengers";
import { usePassengersPage } from "./hooks/usePassengersPage";

const Main: React.FC<PassengersPageMainProps> = ({
    orderData,
    passengers,
    block1: initialBlock1,
    block2: initialBlock2,
    totalPrice: initialTotalPrice,
    from,
    to,
    dateStart,
    dateEnd
}) => {
    const {
        block1,
        block2,
        totalPrice,
        baseCount,
        extraPassengers,
        setExtraPassengers,
        completedMap,
        handleCompleteChange,
        handleRequestOpenNext,
        formDataList,
        handleUpdatePassenger,
        canGoNext,
    } = usePassengersPage(
        orderData,
        passengers,
        initialBlock1,
        initialBlock2,
        initialTotalPrice
    );

    const navigate = useNavigate();

    return (
        <section className={styles.main}>
            <Steps currentStep={2} />

            <div className={styles.container}>
                {/* ---------- LEFT COLUMN ----------- */}
                <LeftColumnInfo
                    orderData={orderData}
                    block1={block1}
                    block2={block2}
                    totalPrice={totalPrice}
                />

                <div className={styles.rightColumn}>
                    <div className={styles.containerAddPassengers}>
                        {/* --- базовые карточки --- */}
                        {Array.from({ length: baseCount }).map((_, i) => (
                            <PassengerCard
                                key={`base-${i}`}
                                index={i}
                                onCompleteChange={handleCompleteChange}
                                onRequestOpenNext={handleRequestOpenNext}
                                onUpdate={handleUpdatePassenger}
                                initialData={passengers ? passengers[i] : undefined}
                            />
                        ))}

                        {/* --- дополнительные карточки --- */}
                        {Array.from({ length: extraPassengers }).map((_, i) => (
                            <PassengerCard
                                key={`extra-${i}`}
                                index={baseCount + i}
                                onCompleteChange={handleCompleteChange}
                                onRequestOpenNext={handleRequestOpenNext}
                                onUpdate={handleUpdatePassenger}
                            />
                        ))}

                        {/* --- кнопка добавить --- */}
                        <button
                            className={styles.addBtn}
                            onClick={() => setExtraPassengers(extraPassengers + 1)}
                        >
                            <p>Добавить пассажира</p>
                            <div className={styles.iconWrapper}>
                                <Plus className={styles.iconPlus} />
                                <PlusHover className={styles.iconPlusHover} />
                            </div>
                        </button>

                        <div className={styles.containerButton}>
                            <button
                                className={`${styles.nextMainBtn} ${canGoNext ? styles.active : ""}`}
                                disabled={!canGoNext}
                                onClick={() => {
                                    if (!canGoNext) return;

                                    navigate("/payment", {
                                        state: {
                                            from,
                                            to,
                                            dateStart,
                                            dateEnd,
                                            orderData,
                                            passengers: formDataList,
                                            block1,
                                            block2,
                                            totalPrice
                                        }
                                    });
                                }}
                            >
                                Далее
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Main;