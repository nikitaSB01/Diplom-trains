import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Main.module.css";
import Steps from "../../components/Steps/Steps";

import LeftColumnInfo from "../../modules/shared/LeftColumnInfo/LeftColumnInfo";
import TitleBlockReusable from "../../modules/shared/TitleBlockReusable/TitleBlockReusable";
import TrainSummaryBlock from "../../modules/shared/TrainSummaryBlock/TrainSummaryBlock";
import PassengersSummaryBlock from "../../modules/shared/PassengersSummaryBlock/PassengersSummaryBlock";
import PaymentSummaryBlock from "../shared/PaymentSummaryBlock/PaymentSummaryBlock";

interface Props {
    personalData: any;
    paymentType: "online" | "cash";
    onlineMethod: "card" | "paypal" | "qiwi" | null;
    orderData: any;
    passengers: any[];
    block1: any;
    block2: any;
    totalPrice: number;
}

const Main: React.FC<Props> = ({
    personalData,
    paymentType,
    onlineMethod,
    orderData,
    passengers,
    block1,
    block2,
    totalPrice
}) => {
    const [openPassengers, setOpenPassengers] = useState(true);
    const navigate = useNavigate();


    return (
        <section className={styles.main}>
            <Steps currentStep={4} />

            <div className={styles.container}>
                {/* ---------- LEFT COLUMN ----------- */}
                <LeftColumnInfo
                    orderData={orderData}
                    block1={block1}
                    block2={block2}
                    totalPrice={totalPrice}
                />
                {/* ---------- RIGHT COLUMN ----------- */}
                <div className={styles.rightColumn}>

                    <div>
                        <TrainSummaryBlock
                            orderData={orderData}
                            onEdit={() => navigate(-1)}
                        />
                    </div>
                    <div>
                        <PassengersSummaryBlock
                            passengers={passengers}
                            totalPrice={totalPrice}
                        />
                    </div>
                    <div>
                        <PaymentSummaryBlock
                            paymentType={paymentType}
                            onlineMethod={onlineMethod}
                            personalData={personalData}

                        />
                    </div>
                    <div className={styles.confirmContainer}>
                        <button
                            className={styles.confirmButton}
                            onClick={() =>
                                navigate("/success", {
                                    state: {
                                        totalPrice,
                                        fullName: {
                                            lastName: personalData.lastName,
                                            firstName: personalData.firstName,
                                            middleName: personalData.middleName
                                        }
                                    }
                                })
                            }
                        >
                            Подтвердить
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Main;