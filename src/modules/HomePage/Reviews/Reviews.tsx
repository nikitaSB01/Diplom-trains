import React, { useState } from 'react';
import styles from './Reviews.module.css';
import { reviewsData } from './reviewsData';

const Reviews: React.FC = () => {
  const [page, setPage] = useState(0);
  const reviewsPerPage = 2;
  const totalPages = Math.ceil(reviewsData.length / reviewsPerPage);

  const handleDotClick = (index: number) => {
    setPage(index);
  };

  const start = page * reviewsPerPage;
  const currentReviews = reviewsData.slice(start, start + reviewsPerPage);

  return (
    <section id="reviews" className={styles.reviews}>
      <div className={styles.titleBlock}>
        <h2 className={styles.title}>ОТЗЫВЫ</h2>
      </div>

      <div className={styles.reviewsContainer}>
        {currentReviews.map((review, index) => (
          <div className={styles.review} key={index}>
            <div className={styles.imageBlock}>
              <img src={review.img} alt={review.name} />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.name}>{review.name}</h3>
              <span className={styles.text}>{review.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.dot} ${page === i ? styles.active : ''}`}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default Reviews;
