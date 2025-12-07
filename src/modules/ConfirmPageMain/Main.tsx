import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import layout from "../../styles/PageLayout.module.css";

import styles from "./Main.module.css";
import Steps from "../../components/Steps/Steps";

import LeftColumnInfo from "../../modules/shared/LeftColumnInfo/LeftColumnInfo";
import TrainSummaryBlock from "../../modules/shared/TrainSummaryBlock/TrainSummaryBlock";
import PassengersSummaryBlock from "../../modules/shared/PassengersSummaryBlock/PassengersSummaryBlock";
import PaymentSummaryBlock from "../shared/PaymentSummaryBlock/PaymentSummaryBlock";
import MainButton from "../../components/ui/MainButton";

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
    const navigate = useNavigate();

    return (
        <section className={styles.main}>
            <Steps currentStep={4} />

            <div className={`${layout.pageContainer} ${styles.container}`}>
                <LeftColumnInfo
                    orderData={orderData}
                    block1={block1}
                    block2={block2}
                    totalPrice={totalPrice}
                />
                <div className={`${layout.pageRightColumn} ${styles.rightColumn}`}>

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
                        <MainButton
                            size="wide"
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
                        </MainButton>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Main;