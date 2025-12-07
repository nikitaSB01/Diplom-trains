import styles from "./TotalBlock.module.css";
import { ReactComponent as Ruble } from "../../../../assets/icons/Train/ruble.svg";

interface Props {
    totalPrice: number;
}

const TotalBlock: React.FC<Props> = ({ totalPrice }) => {
    return (
        <div className={styles.total}>
            <span>итог</span>
            <strong>
                {totalPrice}
                <Ruble className={styles.rubleIcon} />
            </strong>
        </div>
    );
};

export default TotalBlock;