import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PaymentPage.module.css";

import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import PaymentPageMain from "../../modules/PaymentPageMain/Main";

const PaymentPage = () => {
    const location = useLocation();
    const {
        orderData,
        passengers,
        block1,
        block2,
        totalPrice
    } = location.state;
    const navigate = useNavigate();

    // получаем данные
    const state = location.state;

    // если данных нет → отправляем назад
    if (!state) {
        navigate("/", { replace: true });
        return null;
    }

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
                />
            </main>
            <Footer />
        </div>
    );
};

export default PaymentPage;