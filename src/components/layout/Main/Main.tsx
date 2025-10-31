import React from 'react';

import styles from './Main.module.css';
import About from '../../../modules/About/About';
import HowItWorks from '../../../modules/HowItWorks/HowItWorks';
import Reviews from '../../../modules/Reviews/Reviews';
/* import Contacs from '../../../modules/Contacs/Contacs'; */

const Main: React.FC = () => {
  return (
    <main className={styles.main}>
      <About />
      <HowItWorks />
      <Reviews />
      {/* <Contacs /> */}
    </main>
  );
};

export default Main;
