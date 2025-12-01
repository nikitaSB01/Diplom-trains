import React, { useState, useEffect } from "react";

import styles from "./Main.module.css";
import Steps from "../../components/Steps/Steps";

import TitleBlock from "../PassengersPageMain/blocks/TitleBlock/TitleBlock";
import FiltersThereBack from "../../components/SearchPageMain/Filters/FiltersThereBake/FiltersThereBack";
import PassengersBlock from "../PassengersPageMain/blocks/PassengersBlock/PassengersBlock";
import TotalBlock from "../PassengersPageMain/blocks/TotalBlock/TotalBlock";
import CollapsibleHeader from "../PassengersPageMain/blocks/CollapsibleHeader/CollapsibleHeader";
import { ReactComponent as UserIcon } from "../../assets/icons/PassengersPage/PassengersBlock/passenger.svg";
import LeftColumnInfo from "../../modules/shared/LeftColumnInfo/LeftColumnInfo";

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

                    {/* Персональные данные */}
                    <div className={styles.card}>
                        <h2>Персональные данные</h2>
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