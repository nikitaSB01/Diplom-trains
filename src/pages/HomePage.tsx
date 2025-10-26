import Header from '../components/layout/Header/Header';
import Footer from '../components/layout/Footer/Footer';
import Container from '../components/layout/Container/Container';

import SearchForm from '../modules/SearchForm/SearchForm';
import About from '../modules/About/About';
import HowItWorks from '../modules/HowItWorks/HowItWorks';
import Reviews from '../modules/Reviews/Reviews';

import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Container>
          <section id="search" className={styles.section}>
            <SearchForm />
          </section>

          <section id="about" className={styles.section}>
            <About />
          </section>

          <section id="how-it-works" className={styles.section}>
            <HowItWorks />
          </section>

          <section id="reviews" className={styles.section}>
            <Reviews />
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
