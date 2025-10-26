import Header from '../components/layout/Header/Header';
import Footer from '../components/layout/Footer/Footer';
import Container from '../components/layout/Container/Container';

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1>Главная страница</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
