
import React from "react";
import styles from "./LuxCompartmentBlock.module.css";
import Seat from "../../Seat/Seat";

interface Props {
    groups: number[][];
    findSeat: (index: number) => any;
    selectedSeats: number[];
    onSeatSelect: (index: number, price: number) => void;
    price: number; // в люксе оба места нижние → одна цена
}

const LuxCompartmentBlock: React.FC<Props> = ({
    groups,
    findSeat,
    selectedSeats,
    onSeatSelect,
    price
}) => {
    return (
        <div className={styles.row}>
            {groups.map((pair, i) => (
                <React.Fragment key={i}>
                    <div className={styles.compartment}>
                        {pair.map(n => {
                            const seat = findSeat(n);
                            return seat ? (
                                <Seat
                                    key={n}
                                    number={n}
                                    available={seat.available}
                                    reserved={seat.reserved}
                                    type="lower"
                                    selected={selectedSeats.includes(n)}
                                    onClick={() => onSeatSelect(n, price)}
                                />
                            ) : null;
                        })}
                    </div>

                    {i !== groups.length - 1 && (
                        <div className={styles.vertDivider}></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default LuxCompartmentBlock;