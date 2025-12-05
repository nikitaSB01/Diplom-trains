import React from "react";
import styles from "./TrainServices.module.css";

import { ReactComponent as Wifi } from "../../../../assets/icons/Train/wifi.svg";
import { ReactComponent as Express } from "../../../../assets/icons/Train/express.svg";
import { ReactComponent as Сonditioning } from "../../../../assets/icons/Train/conditioning.svg";
import { ReactComponent as Cup } from "../../../../assets/icons/Train/cup.svg";
import { ReactComponent as Underwear } from "../../../../assets/icons/Train/Underwear.svg";

const TrainServices = ({ dir }: { dir: any }) => {
    return (
        <div className={styles.services}>
            {dir.have_wifi && <Wifi className={styles.serviceIcon} />}
            {dir.is_express && <Express className={styles.serviceIcon} />}
            {dir.have_air_conditioning && <Сonditioning className={styles.serviceIcon} />}
            <Cup className={styles.serviceIcon} />
            <Underwear className={styles.serviceIcon} />
        </div>
    );
};

export default TrainServices;