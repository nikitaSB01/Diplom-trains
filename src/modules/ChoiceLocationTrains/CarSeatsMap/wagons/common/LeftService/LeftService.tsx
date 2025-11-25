import styles from "./LeftService.module.css";

import { ReactComponent as ToiletIcon } from "../../../../../../assets/icons/ChoiceLocationTrains/CarSeatsMap/wc.svg";
import { ReactComponent as WaterIcon } from "../../../../../../assets/icons/ChoiceLocationTrains/CarSeatsMap/water.svg";
import { ReactComponent as AttendantIcon } from "../../../../../../assets/icons/ChoiceLocationTrains/CarSeatsMap/conductor.svg";


export const LeftService = ({ wagonNumber }: { wagonNumber: string }) => {
    return (
        <div className={styles.leftService}>
            <div className={styles.leftCol}>
                <div className={styles.exit}>
                    <div className={styles.exitTop}></div>
                    <div className={styles.exitCenter}></div>
                    <div className={styles.exitBottom}></div>
                </div>
            </div>

            <div className={styles.rightCol}>
                <div className={styles.wagonNumber}>{wagonNumber}</div>

                <div className={styles.roomContainer}>
                    <div className={styles.roomToilet}>
                        <ToiletIcon className={styles.leftToilet} />
                    </div>
                    <div className={styles.roomAttendant}>
                        <AttendantIcon className={styles.leftAttendant} />
                    </div>
                </div>

                <div className={styles.roomCenter}></div>

                <div className={styles.roomWater}>
                    <WaterIcon className={styles.leftWater} />
                </div>
            </div>
        </div>
    );
};