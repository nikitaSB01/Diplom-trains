import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Main.module.css";
import layout from "../../styles/PageLayout.module.css";

import { validatePaymentForm } from "../../utils/validation";
import Steps from "../../components/Steps/Steps";
import PersonalDataBlock, { PersonalData } from "./blocks/PersonalDataBlock/PersonalDataBlock";
import PaymentMethodBlock from "./blocks/PaymentMethodBlock/PaymentMethodBlock";
import LeftColumnInfo from "../../modules/shared/LeftColumnInfo/LeftColumnInfo";
import MainButton from "../../components/ui/MainButton";

type PaymentType = "online" | "cash";
type OnlineMethod = "card" | "paypal" | "qiwi" | null;

interface Props {
    orderData: any;
    passengers: any[];
    block1: any;
    block2: any;
    totalPrice: number;
    personalData?: PersonalData;
    paymentType?: PaymentType;
    onlineMethod?: OnlineMethod;
}

const Main: React.FC<Props> = ({
    orderData,
    passengers,
    block1,
    block2,
    totalPrice,
    personalData: initialPersonalData,
    paymentType: initialPaymentType,
    onlineMethod: initialOnlineMethod,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { from, to, dateStart, dateEnd } = location.state || {};

    // ----- Персональные данные -----
    const [personalData, setPersonalData] = useState<PersonalData>(() => ({
        lastName: initialPersonalData?.lastName ?? "",
        firstName: initialPersonalData?.firstName ?? "",
        middleName: initialPersonalData?.middleName ?? "",
        phone: initialPersonalData?.phone ?? "",
        email: initialPersonalData?.email ?? "",
    }));

    const [paymentType, setPaymentType] = useState<PaymentType>(
        initialPaymentType ?? "online"
    );

    const [onlineMethod, setOnlineMethod] = useState<OnlineMethod>(
        initialOnlineMethod ?? null
    );

    const handleSelectPayment = (type: PaymentType) => {
        setPaymentType(type);

        if (type === "cash") {
            setOnlineMethod(null); // сбрасываем онлайн-метод
        }
    };

    const handlePersonalChange = (field: keyof PersonalData, value: string) => {
        setPersonalData((prev) => ({ ...prev, [field]: value }));
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
                totalPrice,
                from,
                to,
                dateStart,
                dateEnd,
            },
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

            <div className={`${layout.pageContainer} ${styles.container}`}>
                <LeftColumnInfo
                    orderData={orderData}
                    block1={block1}
                    block2={block2}
                    totalPrice={totalPrice}
                />

                <div className={`${layout.pageRightColumn} ${styles.rightColumn}`}>
                    <div className={styles.rightContent}>
                        <PersonalDataBlock data={personalData} onChange={handlePersonalChange} />

                        <PaymentMethodBlock
                            paymentType={paymentType}
                            onlineMethod={onlineMethod}
                            onSelectPayment={handleSelectPayment}
                            onSelectOnlineMethod={setOnlineMethod}
                        />
                    </div>

            <div className={`${layout.pageContainerButton} ${styles.containerButton}`}>
                        <MainButton
                            active={isFormValid}
                            size="wide"
                            onClick={handleBuy}
                        >
                            Купить билеты
                        </MainButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Main;