import React, { useEffect, useState } from "react";
import styles from "./CarriageList.module.css";

import CarriageCard from "../CarriageCard/CarriageCard";


interface Props {
    routeId: string;
    type: string | null;
    blockId: "first" | "second";
}

const mapTypeToFlags: Record<string, string> = {
    "люкс": "have_first_class",
    "купе": "have_second_class",
    "плацкарт": "have_third_class",
    "сидячий": "have_fourth_class",
};

const CarriageList: React.FC<Props> = ({ routeId, type, blockId }) => {
    const [carriages, setCarriages] = useState<any[]>([]);
    const [activeCar, setActiveCar] = useState<number | null>(null);

    useEffect(() => {
        if (!type) return;

        const flag = mapTypeToFlags[type];

        fetch(
            `https://students.netoservices.ru/fe-diplom/routes/${routeId}/seats?${flag}=true`
        )
            .then((res) => res.json())
            .then((data) => {
                setCarriages(data);
                setActiveCar(data[0]?._id || null);
            });
    }, [type, routeId]);

    if (!type) return null;

    return (
        <div className={styles.appearedBlock}>
            <div className={styles.container}>

                {/* Список вагонов */}
                <div className={styles.carNumbering}>
                    {carriages.map((car) => (
                        <button
                            key={car._id}
                            className={`${styles.carButton} ${activeCar === car._id ? styles.active : ""
                                }`}
                            onClick={() => setActiveCar(car._id)}
                        >
                            {car.name}
                        </button>
                    ))}
                </div>

                {/* Данные по активному вагону */}
                {carriages
                    .filter((c) => c._id === activeCar)
                    .map((c) => (
                        <div key={c._id} className={styles.dataCar}>
                            <CarriageCard carriage={c} blockId={blockId} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CarriageList;