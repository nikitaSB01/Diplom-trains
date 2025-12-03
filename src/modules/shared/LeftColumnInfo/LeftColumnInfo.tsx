import React, { useState } from "react";
import styles from "./LeftColumnInfo.module.css";

import TitleBlock from "../../PassengersPageMain/blocks/TitleBlock/TitleBlock";
import FiltersThereBack from "../../../modules/SearchResultsMain/Filters/FiltersThereBake/FiltersThereBack";
import CollapsibleHeader from "../../PassengersPageMain/blocks/CollapsibleHeader/CollapsibleHeader";
import PassengersBlock from "../../PassengersPageMain/blocks/PassengersBlock/PassengersBlock";
import TotalBlock from "../../PassengersPageMain/blocks/TotalBlock/TotalBlock";
import { ReactComponent as UserIcon } from "../../../assets/icons/PassengersPage/PassengersBlock/passenger.svg";

interface Props {
    orderData: any;
    block1: any;
    block2: any;
    totalPrice: number;
}

const LeftColumnInfo: React.FC<Props> = ({
    orderData,
    block1,
    block2,
    totalPrice
}) => {
    const [openPassengers, setOpenPassengers] = useState(true);

    return (
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

                {/* --- ПАССАЖИРЫ --- */}
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
    );
};

export default LeftColumnInfo;