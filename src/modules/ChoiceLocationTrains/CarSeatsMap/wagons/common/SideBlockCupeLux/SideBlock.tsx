import React from "react";
import styles from "./SideBlock.module.css";

export const SideBlock = ({ wagonNumber }: { wagonNumber: string }) => {
    return (
        <div className={styles.horDivider}></div>
    );
};