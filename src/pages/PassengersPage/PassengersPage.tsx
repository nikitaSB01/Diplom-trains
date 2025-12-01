import React from "react";
import { useLocation } from "react-router-dom";

import styles from "./PassengersPage.module.css";

import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import PassengersPageMain from '../../modules/PassengersPageMain/Main';


const PassengersPage = () => {
    const location = useLocation();
    const { orderData } = location.state;

    console.log("Пришедшие данные:", orderData);

    return (
        <div className={styles.PassengersPage}>
            <Header isInner />
            <main className={styles.main}>
                <PassengersPageMain />
            </main>
            <Footer />
        </div>
    );
};

export default PassengersPage;