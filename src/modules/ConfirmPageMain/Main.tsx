import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Main.module.css";
import Steps from "../../components/Steps/Steps";

import LeftColumnInfo from "../../modules/shared/LeftColumnInfo/LeftColumnInfo";
import TitleBlockReusable from "../../modules/shared/TitleBlockReusable/TitleBlockReusable";
import TrainSummaryBlock from "../../modules/shared/TrainSummaryBlock/TrainSummaryBlock";

interface Props {
    personalData: any;
    paymentType: "online" | "cash";
    onlineMethod: "card" | "paypal" | "qiwi" | null;
    orderData: any;
    passengers: any[];
    block1: any;
    block2: any;
    totalPrice: number;
}

const Main: React.FC<Props> = ({
    personalData,
    paymentType,
    onlineMethod,
    orderData,
    passengers,
    block1,
    block2,
    totalPrice
}) => {
    const [openPassengers, setOpenPassengers] = useState(true);
    const navigate = useNavigate();


    return (
        <section className={styles.main}>
            <Steps currentStep={4} />

            <div className={styles.container}>
                {/* ---------- LEFT COLUMN ----------- */}
                <LeftColumnInfo
                    orderData={orderData}
                    block1={block1}
                    block2={block2}
                    totalPrice={totalPrice}
                />
                {/* ---------- RIGHT COLUMN ----------- */}
                <div className={styles.rightColumn}>

                    <div>
                        <TrainSummaryBlock
                            orderData={orderData}
                            onEdit={() => navigate(-1)}
                        />
                    </div>


                    {/* Персональные данные */}
                    <div className={styles.card}>

                        <p>Фамилия: {personalData.lastName}</p>
                        <p>Имя: {personalData.firstName}</p>
                        <p>Отчество: {personalData.middleName || "-"}</p>
                        <p>Телефон: {personalData.phone}</p>
                        <p>Email: {personalData.email}</p>
                    </div>

                    {/* Способ оплаты */}
                    <div className={styles.card}>
                        <h2>Способ оплаты</h2>
                        <p>
                            {paymentType === "cash" && "Наличными"}
                            {paymentType === "online" && (
                                <>
                                    Онлайн<br />
                                    Метод: {onlineMethod}
                                </>
                            )}
                        </p>
                    </div>

                    {/* Информация о поезде */}
                    <div className={styles.card}>
                        <h2>Поезд</h2>
                        <p>Поезд №: {orderData.train.departure.train.name}</p>
                        <p>
                            {orderData.train.departure.from.city.name} →{" "}
                            {orderData.train.departure.to.city.name}
                        </p>
                    </div>

                    {/* Пассажиры */}
                    <div className={styles.card}>
                        <h2>Пассажиры</h2>
                        <p>Взрослых: {passengers[0].adults}</p>
                        <p>Детей: {passengers[0].kids}</p>
                        <p>Без места: {passengers[0].kidsNoSeat}</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Main;