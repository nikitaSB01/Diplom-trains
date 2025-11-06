import React, { useState } from "react";
import styles from "./FiltersOptions.module.css";

import { ReactComponent as ExpressIcon } from "../../../../assets/icons/Filters/FiltersOptions/1.svg"
import { ReactComponent as LuxIcon } from "../../../../assets/icons/Filters/FiltersOptions/2.svg"
import { ReactComponent as SeatIcon } from "../../../../assets/icons/Filters/FiltersOptions/3.svg"
import { ReactComponent as WifiIcon } from "../../../../assets/icons/Filters/FiltersOptions/4.svg"
import { ReactComponent as CoupeIcon } from "../../../../assets/icons/Filters/FiltersOptions/5.svg"
import { ReactComponent as PlazIcon } from "../../../../assets/icons/Filters/FiltersOptions/6.svg"

const optionsList = [
    { id: "coupe", label: "Купе", Icon: CoupeIcon },
    { id: "plaz", label: "Плацкарт", Icon: PlazIcon },
    { id: "seat", label: "Сидячий", Icon: SeatIcon },
    { id: "lux", label: "Люкс", Icon: LuxIcon },
    { id: "wifi", label: "Wi-Fi", Icon: WifiIcon },
    { id: "express", label: "Экспресс", Icon: ExpressIcon },
];

export const FiltersOptions: React.FC = () => {
    const [activeOptions, setActiveOptions] = useState<{ [key: string]: boolean }>({
        coupe: false,
        plaz: false,
        seat: false,
        lux: false,
        wifi: false,
        express: false,
    });

    const toggleOption = (id: string) => {
        setActiveOptions((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className={styles.options}>
            {optionsList.map(({ id, label, Icon }) => (
                <div key={id} className={styles.option}>
                    <div className={styles.left}>
                        <Icon className={styles.icon} />
                        <p>{label}</p>
                    </div>
                    <button
                        type="button"
                        className={`${styles.toggle} ${activeOptions[id] ? styles.active : ""}`}
                        onClick={() => toggleOption(id)}
                    >
                        <div className={styles.circle}></div>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default FiltersOptions;