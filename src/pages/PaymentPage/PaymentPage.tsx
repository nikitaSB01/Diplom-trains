import { useNavigate, useLocation, Navigate } from "react-router-dom";
import styles from "./PaymentPage.module.css";

import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import PaymentPageMain from "../../modules/PaymentPageMain/Main";

const PaymentPage = () => {
    const location = useLocation();
    // получаем данные
    const state = location.state;
    if (!state) {
        return <Navigate to="/" replace />;
    }

    const {
        orderData,
        passengers,
        block1,
        block2,
        totalPrice
    } = location.state;

    return (
        <div className={styles.PaymentPage}>
            <Header isInner />
            <main className={styles.main}>
                <PaymentPageMain
                    orderData={orderData}
                    passengers={passengers}
                    block1={block1}
                    block2={block2}
                    totalPrice={totalPrice}
                    personalData={state.personalData}           // ← ДОБАВЛЯЕМ
                    paymentType={state.paymentType}             // ← ДОБАВЛЯЕМ
                    onlineMethod={state.onlineMethod}           // ← ДОБАВЛЯЕМ

                />
            </main>
            <Footer />
        </div>
    );
};

export default PaymentPage;