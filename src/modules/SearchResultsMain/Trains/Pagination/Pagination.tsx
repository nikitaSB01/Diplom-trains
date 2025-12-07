import React, { useState, useEffect } from "react";
import styles from "./Pagination.module.css";
import { ReactComponent as PaginationSvg } from "../../../../assets/icons/Train/pagination.svg";
import { ReactComponent as Left } from "../../../../assets/icons/Train/paginationArrowBtnLeft.svg";
import { ReactComponent as Right } from "../../../../assets/icons/Train/paginationArrowBtnRight.svg";

interface PaginationProps {
    page: number;
    totalPages: number;
    onChange: (p: number) => void;
}

const BLOCK_SIZE = 3;
const JUMP = 10;

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onChange }) => {
    const [windowStart, setWindowStart] = useState(1);

    const windowEnd = Math.min(windowStart + BLOCK_SIZE - 1, totalPages);

    // если активная страница ушла за окно — перестраиваем
    useEffect(() => {
        if (page < windowStart || page > windowEnd) {
            // если страница — кратная 10
            if (page % 10 === 0) {
                setWindowStart(page);
            } else {
                const newStart = Math.floor((page - 1) / BLOCK_SIZE) * BLOCK_SIZE + 1;
                setWindowStart(newStart);
            }
        }
    }, [page]);

    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = windowStart; i <= windowEnd; i++) pages.push(i);

    // правильный прыжок для кратных десятке
    const nextJump = Math.min(
        page % 10 === 0 ? page + 10 : Math.ceil(page / JUMP) * JUMP,
        Math.ceil(totalPages / JUMP) * JUMP
    );

    const handlePrevWindow = () => {
        if (windowStart > 1) {
            setWindowStart(windowStart - BLOCK_SIZE);
        }
    };

    const handleNextWindow = () => {
        if (windowEnd < totalPages) {
            setWindowStart(windowStart + BLOCK_SIZE);
        }
    };

    const handlePageClick = (num: number) => {
        onChange(num);

        if (num % 10 === 0) {
            setWindowStart(num); // ← кратные 10 формируют окно 10–12 / 20–22 / 30–32
        } else {
            const newStart = Math.floor((num - 1) / BLOCK_SIZE) * BLOCK_SIZE + 1;
            setWindowStart(newStart);
        }
    };

    return (
        <div className={styles.pagination}>
            <button
                className={styles.arrowBtn}
                disabled={windowStart === 1}
                onClick={handlePrevWindow}
            >
                <Left className={styles.leftSvg} />
            </button>

            {pages.map((num) => (
                <button
                    key={num}
                    onClick={() => handlePageClick(num)}
                    className={`${styles.pageBtn} ${page === num ? styles.activePage : ""}`}
                >
                    {num}
                </button>
            ))}

            {windowEnd < totalPages && (
                <>
                    <span className={styles.dots}><PaginationSvg className={styles.dotsSvg} /></span>

                    <button
                        className={styles.pageBtn}
                        onClick={() => {
                            onChange(nextJump);
                            setWindowStart(nextJump);
                        }}
                    >
                        {nextJump}
                    </button>
                </>
            )}

            <button
                className={styles.arrowBtn}
                disabled={windowEnd === totalPages}
                onClick={handleNextWindow}
            >
                <Right className={styles.rightSvg} />
            </button>
        </div>
    );
};

export default Pagination;