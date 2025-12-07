import React from "react";
import styles from "./CarriageCard.module.css";

import { ReactComponent as AC } from "../../../assets/icons/Train/conditioning.svg";
import { ReactComponent as Wifi } from "../../../assets/icons/Train/wifi.svg";
import { ReactComponent as Linens } from "../../../assets/icons/Train/Underwear.svg";

interface Extras {
    wifi: boolean;
    linens: boolean;
}

interface Props {
    coach: any;
    extras: Extras;
    onToggleExtra: (key: "wifi" | "linens") => void;
}

const CarriageServices: React.FC<Props> = ({ coach, extras, onToggleExtra }) => {
    const included = {
        ac: coach.have_air_conditioning,
        wifi: coach.have_wifi,
        linens: coach.is_linens_included,
    };

    const purchasable = {
        wifi: !coach.have_wifi && coach.wifi_price > 0,
        linens: !coach.is_linens_included && coach.linens_price > 0,
    };

    return (
        <div className={styles.contsinerServices}>
            {/* WI-FI */}
            <button
                type="button"
                className={
                    included.wifi
                        ? styles.iconIncluded
                        : extras.wifi
                            ? styles.iconActive
                            : purchasable.wifi
                                ? styles.iconAvailable
                                : styles.iconDisabled
                }
                onClick={() => onToggleExtra("wifi")}
                disabled={included.wifi || !purchasable.wifi}
            >
                <Wifi />
                <div className={styles.tooltipService}>WI-FI</div>
            </button>

            {/* Бельё */}
            <button
                type="button"
                className={
                    included.linens
                        ? styles.iconIncluded
                        : extras.linens
                            ? styles.iconActive
                            : purchasable.linens
                                ? styles.iconAvailable
                                : styles.iconDisabled
                }
                onClick={() => onToggleExtra("linens")}
                disabled={included.linens || !purchasable.linens}
            >
                <Linens />
                <div className={styles.tooltipService}>белье</div>
            </button>

            {/* Кондиционер */}
            <button
                type="button"
                className={
                    coach.have_air_conditioning
                        ? styles.iconIncluded
                        : styles.iconDisabled
                }
                disabled
            >
                <AC />
                <div className={styles.tooltipService}>кондиционер</div>
            </button>
        </div>
    );
};

export default CarriageServices;