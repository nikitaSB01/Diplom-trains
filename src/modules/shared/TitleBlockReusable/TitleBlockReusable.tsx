import React from "react";
import styles from "./TitleBlockReusable.module.css";

interface Props {
    title: string;
}

const TitleBlockReusable: React.FC<Props> = ({ title }) => {
    return (
        <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
        </div>
    );
};

export default TitleBlockReusable;