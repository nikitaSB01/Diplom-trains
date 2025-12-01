import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Main.module.css";
import { validatePaymentForm } from "../../modules/PassengersPageMain/blocks/PassengerCard/utils/validation";

import Steps from "../../components/Steps/Steps";
import FiltersThereBack from "../../components/SearchPageMain/Filters/FiltersThereBake/FiltersThereBack";
import PassengersBlock from "../PassengersPageMain/blocks/PassengersBlock/PassengersBlock";
import TotalBlock from "../PassengersPageMain/blocks/TotalBlock/TotalBlock";
import TitleBlock from "../PassengersPageMain/blocks/TitleBlock/TitleBlock";
import CollapsibleHeader from "../PassengersPageMain/blocks/CollapsibleHeader/CollapsibleHeader";
import PersonalDataBlock from "./blocks/PersonalDataBlock/PersonalDataBlock";
import PaymentMethodBlock from "./blocks/PaymentMethodBlock/PaymentMethodBlock";
import LeftColumnInfo from "../../modules/shared/LeftColumnInfo/LeftColumnInfo";

import { ReactComponent as UserIcon } from "../../assets/icons/PassengersPage/PassengersBlock/passenger.svg";

interface Props {
    orderData: any;
    passengers: any[];
    block1: any;
    block2: any;
    totalPrice: number;
}

const Main: React.FC<Props> = ({
    orderData,
    passengers,
    block1,
    block2,
    totalPrice
}) => {
    const navigate = useNavigate();

    const [openPassengers, setOpenPassengers] = useState(true);

    /* данные и функции для подключения PersonalDataBlock PaymentMethodBlock*/
    const [personalData, setPersonalData] = useState({
        lastName: "",
        firstName: "",
        middleName: "",
        phone: "",
        email: ""
    });

    const [paymentType, setPaymentType] = useState<"online" | "cash">("online");
    const [onlineMethod, setOnlineMethod] = useState<"card" | "paypal" | "qiwi" | null>(null);

    const handleSelectPayment = (type: "online" | "cash") => {
        setPaymentType(type);

        if (type === "cash") {
            setOnlineMethod(null); // сбрасываем PayPal/card/qiwi
        }
    };
    const handlePersonalChange = (field: any, value: string) => {
        setPersonalData(prev => ({ ...prev, [field]: value }));
    };

    const handleBuy = () => {
        navigate("/confirm", {
            state: {
                personalData,
                paymentType,
                onlineMethod,
                orderData,
                passengers,
                block1,
                block2,
                totalPrice
            }
        });
    };

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const valid = validatePaymentForm(personalData, paymentType, onlineMethod);
        setIsFormValid(valid);
    }, [personalData, paymentType, onlineMethod]);

    return (
        <section className={styles.main}>
            <Steps currentStep={3} />

            <div className={styles.container}>
                {/* ================= LEFT COLUMN ================= */}
                <LeftColumnInfo
                    orderData={orderData}
                    block1={block1}
                    block2={block2}
                    totalPrice={totalPrice}
                />

                {/* ================= RIGHT COLUMN ================= */}
                <div className={styles.rightColumn}>
                    <div className={styles.rightContent}>
                        <PersonalDataBlock data={personalData} onChange={handlePersonalChange} />
                        <PaymentMethodBlock
                            paymentType={paymentType}
                            onlineMethod={onlineMethod}
                            onSelectPayment={handleSelectPayment}
                            onSelectOnlineMethod={setOnlineMethod}
                        />               </div>

                    <div className={styles.containerButton}>

                        <button
                            className={`${styles.buyButton} ${isFormValid ? styles.buyButtonActive : styles.buyButtonDisabled}`}
                            disabled={!isFormValid}
                            onClick={isFormValid ? handleBuy : undefined}
                        >
                            Купить билеты
                        </button>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Main;