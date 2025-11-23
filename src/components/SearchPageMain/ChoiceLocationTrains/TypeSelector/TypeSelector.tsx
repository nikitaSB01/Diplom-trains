import React, { useState } from "react";
import styles from "./TypeSelector.module.css";

import { ReactComponent as Cupe } from "../../../../assets/icons/ChoiceLocationTrains/cupe.svg";
import { ReactComponent as Plat } from "../../../../assets/icons/ChoiceLocationTrains/plat.svg";
import { ReactComponent as Lux } from "../../../../assets/icons/ChoiceLocationTrains/lux.svg";
import { ReactComponent as Sid } from "../../../../assets/icons/ChoiceLocationTrains/sid.svg";

const TYPES = [
    { id: "сидячий", label: "Сидячий", Icon: Sid },
    { id: "плацкарт", label: "Плацкарт", Icon: Plat },
    { id: "купе", label: "Купе", Icon: Cupe },
    { id: "люкс", label: "Люкс", Icon: Lux },
];

interface Props {
    onSelectType: (type: string) => void;
}

const TypeSelector: React.FC<Props> = ({ onSelectType }) => {
    const [activeType, setActiveType] = useState<string | null>(null);

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Тип вагона</h2>

            <div className={styles.containerType}>
                {TYPES.map(({ id, label, Icon }) => (
                    <button
                        key={id}
                        className={`${styles.typeItem} ${activeType === id ? styles.active : ""}`}
                        onClick={() => {
                            setActiveType(id);
                            onSelectType(id);
                        }}
                        type="button"
                    >
                        <Icon className={styles.icon} />
                        <span className={styles.label}>{label}</span>
                    </button>
                ))}
            </div>

            {activeType && (
                <div className={styles.appearedBlock}>
                    <p>Вы выбрали: {activeType}</p>
                </div>
            )}
        </div>
    );
};

export default TypeSelector;