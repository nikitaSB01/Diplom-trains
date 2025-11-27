import { OrderData } from "../../../../types/orderData";
import styles from "./TotalBlock.module.css";
import { ReactComponent as Ruble } from "../../../../assets/icons/Train/ruble.svg";

interface Props {
    orderData: OrderData;
}

const TotalBlock: React.FC<Props> = ({ orderData }) => {
    const price = orderData.train.departure.min_price;

    return (
        <div className={styles.total}>
            <span>итог</span>
            <strong>{price}
                <Ruble className={styles.rubleIcon} />
            </strong>
        </div>
    );
};

export default TotalBlock;