import React from "react";
import styles from "./CarriageCard.module.css";

import { ReactComponent as AC } from "../../../assets/icons/Train/conditioning.svg";
import { ReactComponent as Wifi } from "../../../assets/icons/Train/wifi.svg";
import { ReactComponent as Food } from "../../../assets/icons/Train/cup.svg";
import { ReactComponent as Linens } from "../../../assets/icons/Train/Underwear.svg";

import CarSeatsMap from "../CarSeatsMap/CarSeatsMap";

const CarriageCard = ({ carriage }: any) => {
    return (
        <>
            <div className={styles.carriageInfo}>

                <div className={styles.number}>
                    Вагон {carriage.name}
                </div>

                <div className={styles.placesInfo}>
                    <p>Места: {carriage.avaliable_seats}</p>
                </div>

                <div className={styles.prices}>
                    {carriage.top_price && <p>Верхние: {carriage.top_price} ₽</p>}
                    {carriage.bottom_price && (
                        <p>Нижние: {carriage.bottom_price} ₽</p>
                    )}
                </div>

                <div className={styles.options}>
                    {carriage.have_air_conditioning && <AC />}
                    {carriage.have_wifi && <Wifi />}
                    {!carriage.is_linens_included && carriage.linens_price > 0 && (
                        <Linens />
                    )}
                    {carriage.have_express && <Food />}
                </div>
            </div>

            <div className={styles.places}>
                <CarSeatsMap seats={carriage.seats} type={carriage.class_type} />
            </div>
        </>
    );
};

export default CarriageCard;