import React from 'react';

import styles from './Main.module.css';
import About from '../../../modules/HomePage/About/About';
import HowItWorks from '../../../modules/HomePage/HowItWorks/HowItWorks';
import Reviews from '../../../modules/HomePage/Reviews/Reviews';

const Main: React.FC = () => {
  return (
    <main className={styles.main}>
      <About />
      <HowItWorks />
      <Reviews />
    </main>
  );
};

export default Main;
