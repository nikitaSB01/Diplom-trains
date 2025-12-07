import { useNavigate, useLocation } from "react-router-dom";
import styles from "./EditButton.module.css";

interface Props {
    target: "train" | "passengers" | "payment";
    onClick?: () => void;

}

const EditButton: React.FC<Props> = ({ target }) => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const routes = {
        train: "/search",
        passengers: "/passengers",
        payment: "/payment",
    };

    return (

        <button
            className={styles.editBtn}
            onClick={() =>
                navigate(routes[target], {
                    state: {
                        ...state,
                    }
                })
            }
        >
            Изменить
        </button >
    );
};

export default EditButton;