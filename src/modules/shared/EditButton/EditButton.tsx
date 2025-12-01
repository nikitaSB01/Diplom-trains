import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EditButton.module.css";

interface Props {
    target: "train" | "passengers" | "payment";
}

const routesMap: Record<Props["target"], string> = {
    train: "/search",
    passengers: "/passengers",
    payment: "/payment"
};

const EditButton: React.FC<Props> = ({ target }) => {
    const navigate = useNavigate();

    return (
        <button
            className={styles.editBtn}
            onClick={() => navigate(routesMap[target])}
        >
            Изменить
        </button>
    );
};

export default EditButton;