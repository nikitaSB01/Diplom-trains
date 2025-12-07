import React from "react";
import styles from "./MainButton.module.css";

type ButtonSize = "normal" | "wide";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    size?: ButtonSize;
}

const MainButton: React.FC<Props> = ({
    active = true,
    size = "normal",
    children,
    className,
    ...rest
}) => {
    const sizeClass =
        size === "wide" ? styles.buttonWide : styles.buttonNormal;

    return (
        <button
            {...rest}
            disabled={!active}
            className={[
                styles.button,
                sizeClass,
                active ? styles.active : styles.disabled,
                className || ""
            ].join(" ").trim()}
        >
            {children}
        </button>
    );
};

export default MainButton;