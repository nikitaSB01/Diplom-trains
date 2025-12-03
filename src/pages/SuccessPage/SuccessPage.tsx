import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SuccessPage.module.css";

import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import RatingStars from "../../components/RatingStars/RatingStars";

import { ReactComponent as MailIcon } from "../../assets/icons/SuccessPage/svg1.svg";
import { ReactComponent as TicketsIcon } from "../../assets/icons/SuccessPage/svg2.svg";
import { ReactComponent as ConductorIcon } from "../../assets/icons/SuccessPage/svg3.svg";
import { ReactComponent as RublIcon } from "../../assets/icons/Train/ruble.svg";
import { formatPrice } from "../../utils/format";


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
            <Header variant="success" />
            <main className={styles.main}>
                <div className={styles.containerBody}>
                    <div className={styles.containerTitle}>
                        <div className={styles.title}>
                            <p>Благодарим Вас за заказ!</p>
                        </div>
                    </div>
                    <div className={styles.containerInfo}>

                        {/* ---------- Верхняя панель ---------- */}
                        <div className={styles.topPanel}>
                            <p className={styles.orderNumber}>№ Заказа {orderNumber}</p>
                            <div className={styles.sum}>
                                <p>сумма</p>
                                <div className={styles.sumSpanIcon}>
                                    <span>{formatPrice(totalPrice)}</span>
                                    <RublIcon className={styles.sumRub} />
                                </div>
                            </div>
                        </div>

                        {/* ---------- Иконки ---------- */}
                        <div className={styles.iconsBlock}>
                            <div className={styles.containerIconsBlock}>
                                <div className={styles.iconItem}>
                                    <MailIcon className={styles.icon} />
                                    <p>билеты будут <br /> отправлены <br /> на ваш <span>e-mail</span></p>
                                </div>

                                <div className={styles.iconItem}>
                                    <TicketsIcon className={styles.icon} />
                                    <p><span>распечатайте</span><br />и сохраняйте билеты<br />до даты поездки</p>
                                </div>

                                <div className={styles.iconItem}>
                                    <ConductorIcon className={styles.icon} />
                                    <p><span>предъявите</span><br />распечатанные <br />билеты при посадке</p>
                                </div>

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
                                    <RatingStars />
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
                </div>



            </main>

            <Footer />
        </div>
    );
};

export default SuccessPage;