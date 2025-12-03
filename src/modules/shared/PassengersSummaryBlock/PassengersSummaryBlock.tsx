import React from "react";
import styles from "./PassengersSummaryBlock.module.css";

import TitleBlockReusable from "../TitleBlockReusable/TitleBlockReusable";
import EditButton from "../EditButton/EditButton";

import { ReactComponent as PassType } from "../../../assets/icons/ConfirmPageMain/passType.svg";
import { ReactComponent as RublIcon } from "../../../assets/icons/Train/ruble.svg";
import { formatPrice } from "../../../utils/format";


interface PassengerItem {
    ticketType: "adult" | "child" | "infant" | string;

    lastName: string;
    firstName: string;
    patronymic?: string;

    gender: "M" | "F";
    birthday: string;

    docType: string;   // ← тип документа
    docSeries?: string;
    docNumber: string;

    mobility?: boolean;
}

interface Props {
    passengers: PassengerItem[];
    totalPrice: number;
}

const ticketTypeText: Record<string, string> = {
    adult: "Взрослый",
    child: "Детский",
    infant: "Без места"
};

const genderText = {
    M: "мужской",
    F: "женский"
};

const PassengersSummaryBlock: React.FC<Props> = ({ passengers, totalPrice }) => {

    const formatDate = (date: string) => date.replace(/\//g, ".");

    return (
        <div className={styles.wrapper}>
            <TitleBlockReusable title="Пассажиры" />

            <div className={styles.content}>

                {/* ЛЕВАЯ КОЛОНКА — СПИСОК ПАССАЖИРОВ */}
                <div className={styles.passengersList}>
                    {passengers.map((p, index) => (
                        <div key={index} className={styles.passengerCard}>

                            <div className={styles.passType}>
                                <PassType className={styles.icon} />
                                <p className={styles.type}>
                                    {ticketTypeText[p.ticketType] || p.ticketType}
                                </p>
                            </div>

                            <div className={styles.info}>
                                <p className={styles.fio}>
                                    {p.lastName} {p.firstName} {p.patronymic}
                                </p>

                                <p className={styles.gender}>Пол {genderText[p.gender]}</p>
                                <p className={styles.birthday}>
                                    Дата рождения {formatDate(p.birthday)}
                                </p>
                                <p className={styles.doc}>
                                    {p.docType} {p.docSeries ? p.docSeries + " " : ""}{p.docNumber}
                                </p>
                            </div>


                        </div>
                    ))}
                </div>

                {/* ПРАВАЯ КОЛОНКА — ИТОГО + ИЗМЕНИТЬ */}
                <div className={styles.right}>
                    <div className={styles.total}>
                        <p className={styles.totalLabel}>Всего</p>
                        <p className={styles.totalPrice}>
                            {formatPrice(totalPrice)}
                            <RublIcon className={styles.rublIcon} />
                        </p>
                    </div>


                    <EditButton target="passengers" />
                </div>

            </div>
        </div>
    );
};

export default PassengersSummaryBlock;