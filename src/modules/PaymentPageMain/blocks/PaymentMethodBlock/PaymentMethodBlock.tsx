import React from "react";
import styles from "./PaymentMethodBlock.module.css";

interface Props {
    paymentType: "online" | "cash";
    onlineMethod: "card" | "paypal" | "qiwi" | null;
    onSelectPayment: (value: "online" | "cash") => void;
    onSelectOnlineMethod: (value: "card" | "paypal" | "qiwi") => void;
}

const PaymentMethodBlock: React.FC<Props> = ({
    paymentType,
    onlineMethod,
    onSelectPayment,
    onSelectOnlineMethod
}) => {

    const handleOnlineClick = (method: "card" | "paypal" | "qiwi") => {
        onSelectPayment("online");
        onSelectOnlineMethod(method);
    };

    return (
        <div className={styles.wrapper}>

            <div className={`${styles.section} ${styles.border}`}>
                <label className={styles.checkbox}>
                    <input
                        className={styles.checkboxInput}
                        type="checkbox"
                        checked={paymentType === "online"}
                        onChange={() => onSelectPayment("online")}
                    />
                    <span className={styles.cashText}>Онлайн</span>
                </label>

                <div className={styles.methods}>
                    <button
                        className={`${styles.methodBtn} ${paymentType === "online" && onlineMethod === "card" ? styles.active : ""
                            }`}
                        onClick={() => handleOnlineClick("card")}
                    >
                        Банковской<br />картой
                    </button>

                    <button
                        className={`${styles.methodBtn} ${paymentType === "online" && onlineMethod === "paypal" ? styles.active : ""
                            }`}
                        onClick={() => handleOnlineClick("paypal")}
                    >
                        PayPal
                    </button>

                    <button
                        className={`${styles.methodBtn} ${paymentType === "online" && onlineMethod === "qiwi" ? styles.active : ""
                            }`}
                        onClick={() => handleOnlineClick("qiwi")}
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
                        onChange={() => onSelectPayment("cash")}
                    />
                    <span className={styles.cashText}>Наличными</span>
                </label>
            </div>
        </div>
    );
};

export default PaymentMethodBlock;