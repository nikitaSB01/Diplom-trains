import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import styles from './Main.module.css';

import Steps from '../../components/Steps/Steps';
import FiltersThereBack from '../../components/SearchPageMain/Filters/FiltersThereBake/FiltersThereBack';
import PassengersBlock from './blocks/PassengersBlock/PassengersBlock';
import TitleBlock from './blocks/TitleBlock/TitleBlock';
import TotalBlock from './blocks/TotalBlock/TotalBlock';



const Main: React.FC = () => {
    const location = useLocation();
    const orderData = location.state;

    console.log("Пришедшие данные:", orderData);
    return (
        <section className={styles.main}>

            <Steps currentStep={2} />

            <div className={styles.container}>
                <div className={styles.leftColumn}>
                    <div className={styles.containerInfo}>

                        <TitleBlock />
                        <FiltersThereBack
                            title="Туда"
                            passengerMode
                            trainData={orderData.train.departure}
                        />
                        <FiltersThereBack
                            title="Обратно"
                            passengerMode
                            trainData={orderData.train.arrival}
                        />
                        <PassengersBlock passengers={orderData.tickets.first} />
                        <TotalBlock orderData={orderData} />
                    </div>
                </div>

                <div className={styles.rightColumn}>
                    <pre style={{ whiteSpace: "pre-wrap", marginTop: 20 }}>
                        {JSON.stringify(orderData, null, 2)}
                    </pre>
                </div>
            </div>
        </section >
    );
}

export default Main;