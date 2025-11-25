import React from "react";
import styles from "./SideBlock.module.css";

export const SideBlockStick = ({ wagonNumber }: { wagonNumber: string }) => {
    return (
        <div className={styles.sideBlock}>
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={styles.stick}></div>
            ))}
        </div>
    );
};