import React from "react";
import styles from "./PaymentSummaryBlock.module.css";

import TitleBlockReusable from "../TitleBlockReusable/TitleBlockReusable";
import EditButton from "../EditButton/EditButton";

interface Props {
    paymentType: "online" | "cash";
    onlineMethod: "card" | "paypal" | "qiwi" | null;
    personalData: any;

}

const onlineMethodText: Record<string, string> = {
    card: "Банковская карта",
    paypal: "PayPal",
    qiwi: "Qiwi"
};

const PaymentSummaryBlock: React.FC<Props> = ({ paymentType, onlineMethod, personalData
}) => {
    console.log("paymentType:", paymentType, "onlineMethod:", onlineMethod);
    return (
        <div className={styles.wrapper}>
            <TitleBlockReusable title="Способ оплаты" />

            <div className={styles.content}>

                {/* ЛЕВАЯ ЧАСТЬ */}
                <div className={styles.left}>
                    <div className={styles.containerText}>
                        {paymentType === "cash" && <p className={styles.text}>Наличными</p>}

                        {paymentType === "online" && (
                            <p className={styles.text}>
                                Онлайн<br />
                                {onlineMethod ? onlineMethodText[onlineMethod] : "—"}
                            </p>
                        )}
                    </div>

                </div>

                {/* ПРАВАЯ ЧАСТЬ (кнопка) */}
                <div className={styles.right}>
                    <EditButton target="payment" />
                </div>

            </div>
        </div>
    );
};

export default PaymentSummaryBlock;