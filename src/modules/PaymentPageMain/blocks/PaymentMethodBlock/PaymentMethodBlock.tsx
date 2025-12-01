import React from "react";
import styles from "./PaymentMethodBlock.module.css";

interface Props {
    paymentType: string;
    onSelect: (value: string) => void;
}

const PaymentMethodBlock: React.FC<Props> = ({ paymentType, onSelect }) => {
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.title} ${styles.border}`}>
                <h2 className={styles.titleText}>Способ оплаты</h2>
            </div>

            <div className={`${styles.section} ${styles.border}`}>
                <label className={styles.checkbox}>
                    <input
                        className={styles.checkboxInput}
                        type="checkbox"
                        checked={paymentType === "online"}
                        onChange={() => onSelect("online")}
                    />
                    <span>Онлайн</span>
                </label>

                <div className={styles.methods}>
                    <button
                        className={`${styles.methodBtn} ${paymentType === "card" ? styles.active : ""}`}
                        onClick={() => onSelect("card")}
                    >
                        Банковской картой
                    </button>

                    <button
                        className={`${styles.methodBtn} ${paymentType === "paypal" ? styles.active : ""}`}
                        onClick={() => onSelect("paypal")}
                    >
                        PayPal
                    </button>

                    <button
                        className={`${styles.methodBtn} ${paymentType === "qiwi" ? styles.active : ""}`}
                        onClick={() => onSelect("qiwi")}
                    >
                        Visa QIWI Wallet
                    </button>
                </div>
            </div>

            <div className={styles.section}>
                <label className={styles.checkbox}>
                    <input
                        className={styles.checkboxInput}
                        type="checkbox"
                        checked={paymentType === "cash"}
                        onChange={() => onSelect("cash")}
                    />
                    <span className={styles.cashText}>Наличными</span>
                </label>
            </div>
        </div>
    );
};

export default PaymentMethodBlock;