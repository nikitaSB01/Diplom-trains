import styles from "./RightService.module.css";

import { ReactComponent as ToiletIcon } from "../../../../../../assets/icons/ChoiceLocationTrains/CarSeatsMap/wc.svg";
import { ReactComponent as TrashIcon } from "../../../../../../assets/icons/ChoiceLocationTrains/CarSeatsMap/garbage.svg";
import { ReactComponent as NoSmokingIcon } from "../../../../../../assets/icons/ChoiceLocationTrains/CarSeatsMap/noSmoking.svg";

export const RightService = ({ wagonNumber }: { wagonNumber: string }) => {
    return (
        <div className={styles.rightService}>
            <div className={styles.colOne}>
                <div className={styles.colOneTop}>
                    <ToiletIcon className={styles.rightToilet} />
                </div>
                <div className={styles.colOneCenter}></div>
                <div className={styles.colOneBottom}>
                    <TrashIcon className={styles.rightTrash} />
                </div>
            </div>
            <div className={styles.colTwo}>
                <div className={styles.colTwoTop}></div>
                <div className={styles.colTwoCenter}>
                    <NoSmokingIcon className={styles.rightNoSmoke} />
                </div>
                <div className={styles.colTwoBottom}></div>
            </div>
        </div>
    );
};