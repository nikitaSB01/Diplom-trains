import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import ConfirmPageMain from "../../modules/ConfirmPageMain/Main";

import styles from "./ConfirmPage.module.css";

const ConfirmPage: React.FC = () => {
    const { state } = useLocation() as any;

    const {
        personalData,
        paymentType,
        onlineMethod,
        orderData,
        passengers,
        block1,
        block2,
        totalPrice
    } = state || {};

    return (
        <div className={styles.ConfirmPage}>
            <Header isInner />
            <main className={styles.main}>
                <ConfirmPageMain
                    personalData={personalData}
                    paymentType={paymentType}
                    onlineMethod={onlineMethod}
                    orderData={orderData}
                    passengers={passengers}
                    block1={block1}
                    block2={block2}
                    totalPrice={totalPrice}
                />
            </main>
            <Footer />
        </div>
    );
};

export default ConfirmPage;