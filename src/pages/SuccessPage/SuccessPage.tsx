import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";

import styles from "./SuccessPage.module.css";

import { ReactComponent as MailIcon } from "../../assets/icons/SuccessPage/svg1.svg";
import { ReactComponent as TicketsIcon } from "../../assets/icons/SuccessPage/svg2.svg";
import { ReactComponent as ConductorIcon } from "../../assets/icons/SuccessPage/svg3.svg";

const SuccessPage: React.FC = () => {
    const { state } = useLocation() as any;
    const navigate = useNavigate();

    const totalPrice = state?.totalPrice || 0;
    const fullName = state?.fullName;

    const formattedName = `${fullName.firstName} ${fullName.middleName || ""}`.trim();

    /* функция для создания номера заказа */
    const generateOrderNumber = () => {
        const numbers = Math.floor(100 + Math.random() * 900); // 100–999
        const letters = Array(2)
            .fill(null)
            .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))) // A-Z
            .join("");

        return `${numbers}${letters}`;
    };

    const [orderNumber] = React.useState(() => generateOrderNumber());

    return (
        <div className={styles.page}>
            <Header />

            <main className={styles.main}>
                <div className={styles.containerInfo}>
                    {/* ---------- Верхняя панель ---------- */}
                    <div className={styles.topPanel}>
                        <p className={styles.orderNumber}>№ Заказа {orderNumber}</p>
                        <p className={styles.sum}>
                            сумма <span>{totalPrice.toLocaleString("ru-RU")} ₽</span>
                        </p>
                    </div>

                    {/* ---------- Иконки ---------- */}
                    <div className={styles.iconsBlock}>
                        <div className={styles.iconItem}>
                            <MailIcon className={styles.icon} />
                            <p>билеты будут отправлены<br />на ваш e-mail</p>
                        </div>

                        <div className={styles.iconItem}>
                            <TicketsIcon className={styles.icon} />
                            <p>распечатайте<br />и сохраняйте билеты<br />до даты поездки</p>
                        </div>

                        <div className={styles.iconItem}>
                            <ConductorIcon className={styles.icon} />
                            <p>предъявите<br />распечатанные билеты<br />при посадке</p>
                        </div>
                    </div>

                    {/* ---------- Сообщение ---------- */}
                    <div className={styles.messageBlock}>
                        <h2 className={styles.name}>{formattedName}!</h2>

                        <p className={styles.text}>
                            Ваш заказ успешно оформлен.<br />
                            В ближайшее время с вами свяжется наш оператор для подтверждения.
                        </p>

                        <p className={styles.textStrong}>
                            Благодарим Вас за оказанное доверие и желаем приятного путешествия!
                        </p>
                    </div>

                    {/* ---------- Оценка + кнопка ---------- */}
                    <div className={styles.bottom}>
                        <div className={styles.ratingBlock}>
                            <p>Оценить сервис</p>
                            <div className={styles.stars}>
                                ★ ★ ★ ★ ★
                            </div>
                        </div>

                        <button
                            className={styles.backButton}
                            onClick={() => navigate("/")}
                        >
                            ВЕРНУТЬСЯ НА ГЛАВНУЮ
                        </button>
                    </div>
                </div>


            </main>

            <Footer />
        </div>
    );
};

export default SuccessPage;