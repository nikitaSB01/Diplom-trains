import React, { useState, useEffect } from "react";
import styles from "./Main.module.css";

import Steps from "../../components/Steps/Steps";
import FiltersThereBack from "../../components/SearchPageMain/Filters/FiltersThereBake/FiltersThereBack";
import PassengersBlock from "../PassengersPageMain/blocks/PassengersBlock/PassengersBlock";
import TotalBlock from "../PassengersPageMain/blocks/TotalBlock/TotalBlock";
import TitleBlock from "../PassengersPageMain/blocks/TitleBlock/TitleBlock";
import CollapsibleHeader from "../PassengersPageMain/blocks/CollapsibleHeader/CollapsibleHeader";

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
    const [openPassengers, setOpenPassengers] = useState(true);

    return (
        <section className={styles.main}>
            <Steps currentStep={3} />

            <div className={styles.container}>
                {/* ================= LEFT COLUMN ================= */}
                <div className={styles.leftColumn}>
                    <div className={styles.containerInfo}>
                        <TitleBlock />

                        <FiltersThereBack
                            title="Туда"
                            passengerMode
                            trainData={orderData.train.departure}
                        />

                        <FiltersThereBack
                            title="Обратно"
                            passengerMode
                            trainData={orderData.train.arrival}
                        />

                        <div className={styles.containerPassengers}>
                            <CollapsibleHeader
                                iconLeft={<UserIcon />}
                                title="Пассажиры"
                                isOpen={openPassengers}
                                onToggle={() => setOpenPassengers(!openPassengers)}
                                className={styles.passengersHeader}
                            />

                            {openPassengers && (
                                <div className={styles.passengersList}>
                                    {block1 && (
                                        <PassengersBlock
                                            passengers={block1.passengers}
                                            adultsPrice={block1.adultsPrice}
                                            kidsPrice={block1.kidsPrice}
                                            servicesList={block1.servicesList}
                                        />
                                    )}

                                    {block2 && (
                                        <>
                                            <div className={styles.sectionDivider}>Обратно</div>
                                            <PassengersBlock
                                                passengers={block2.passengers}
                                                adultsPrice={block2.adultsPrice}
                                                kidsPrice={block2.kidsPrice}
                                                servicesList={block2.servicesList}
                                            />
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        <TotalBlock totalPrice={totalPrice} />
                    </div>
                </div>

                {/* ================= RIGHT COLUMN ================= */}
                <div className={styles.rightColumn}>
                    <div className={styles.rightContent}>
                        <h2 className={styles.title}>Оплата</h2>

                        {/* здесь позже появятся:
                            - форма для email
                            - способ оплаты
                            - дополнительная информация
                        */}

                        <button className={styles.buyButton}>
                            Купить билеты
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Main;