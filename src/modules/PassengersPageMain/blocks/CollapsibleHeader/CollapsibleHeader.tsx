import React from "react";
import styles from "./CollapsibleHeader.module.css";
import { ReactComponent as ToggleIconPlus } from "../../../../assets/icons/Filters/FiltersThereBack/plus.svg";
import { ReactComponent as ToggleIconMinus } from "../../../../assets/icons/Filters/FiltersThereBack/minus.svg";
interface Props {
    iconLeft: React.ReactNode;
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    className?: string;
}

const CollapsibleHeader: React.FC<Props> = ({
    iconLeft,
    title,
    isOpen,
    onToggle,
    className
}) => {
    return (
        <button
            className={`${styles.header} ${className || ""}`}
            onClick={onToggle}
            type="button"
        >
            <div className={styles.left}>
                <div className={styles.iconLeft}>{iconLeft}</div>
                <p className={styles.title}>{title}</p>
            </div>

            <div className={styles.right}>
                {isOpen ? <ToggleIconMinus /> : <ToggleIconPlus className={styles.togglePlus} />}
            </div>
        </button>
    );
};

export default CollapsibleHeader;