import React from "react";
import { useLocation } from "react-router-dom";

import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";

import styles from "./PassengersPage.module.css";

const PassengersPage = () => {
    const location = useLocation();
    const orderData = location.state;

    console.log("Пришедшие данные:", orderData);

    return (
        <div className={styles.page}>
            <Header isInner />

            <main className={styles.main}>
                <h1>Страница пассажиров</h1>

{/*                 <pre style={{ whiteSpace: "pre-wrap", marginTop: 20 }}>
                    {JSON.stringify(orderData, null, 2)}
                </pre> */}
            </main>

            <Footer />
        </div>
    );
};

export default PassengersPage;