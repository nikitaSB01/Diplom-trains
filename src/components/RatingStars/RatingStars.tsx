import React, { useState } from "react";
import styles from "./RatingStars.module.css";

import { ReactComponent as Star } from "../../assets/icons/SuccessPage/Star.svg";
import { ReactComponent as StarFilled } from "../../assets/icons/SuccessPage/StarBackgraund.svg";


const RatingStars: React.FC = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <div className={styles.wrapper}>
            {[1, 2, 3, 4, 5].map((value) => {
                const active = (hover || rating) >= value;

                return (
                    <button
                        key={value}
                        type="button"
                        className={styles.starButton}
                        onMouseEnter={() => setHover(value)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => setRating(value)}
                    >
                        {active ? <StarFilled className={styles.starFilled}/> : <Star />}
                    </button>
                );
            })}
        </div>
    );
};

export default RatingStars;