import React from "react";
import styles from "./PopupMessage.module.css";

import { ReactComponent as Error } from "../../assets/icons/Footer/error.svg";
import { ReactComponent as Ok } from "../../assets/icons/Footer/ok.svg";


interface PopupMessageProps {
    type: "error" | "success";
    title: string;
    text: string;
    onClose: () => void;
}

const PopupMessage: React.FC<PopupMessageProps> = ({
    type,
    title,
    text,
    onClose,
}) => {
    const handleClickOverlay = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            onClose();
        }
    };
    return (
        <div
            className={styles.overlay}
            onClick={handleClickOverlay}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
        >
            <div className={styles.popup}>
                <div
                    className={
                        type === "error" ? styles.headerError : styles.headerSuccess
                    }
                >
                    <span className={styles.icon}>
                        {type === "error" ? <Error /> : <Ok />}
                    </span>
                </div>

                <div className={styles.body}>
                    <p className={styles.text}>{text}</p>
                </div>

                <div className={styles.footer}>
                    <button className={styles.button} onClick={onClose}>
                        Понятно
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopupMessage;