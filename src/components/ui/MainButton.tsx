import React from "react";
import styles from "./MainButton.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
}

const MainButton: React.FC<Props> = ({ active = true, children, ...rest }) => {
    return (
        <button
            {...rest}
            disabled={!active}
            className={[
                styles.button,
                active ? styles.active : styles.disabled
            ].join(" ")}
        >
            {children}
        </button>
    );
};

export default MainButton;