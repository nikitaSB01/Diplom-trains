import React from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

import styles from "./PassengersPage.module.css";

import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import PassengersPageMain from '../../modules/PassengersPageMain/Main';


const PassengersPage = () => {
    const location = useLocation();

    const state = location.state;
    if (!state) {
        return <Navigate to="/" replace />;
    }

    const { orderData } = state;
    /* console.log("Пришедшие данные:", orderData); */

    return (
        <div className={styles.PassengersPage}>
            <Header isInner />
            <main className={styles.main}>
                <PassengersPageMain
                    orderData={orderData}
                    passengers={state.passengers || null}
                    block1={state.block1}
                    block2={state.block2}
                    totalPrice={state.totalPrice}
                    from={state.from}
                    to={state.to}
                    dateStart={state.dateStart}
                    dateEnd={state.dateEnd}
                />
            </main>
            <Footer />
        </div>
    );
};

export default PassengersPage;