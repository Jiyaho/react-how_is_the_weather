import WeatherApi from '../components/WeatherApi';
import styles from '../css/App.module.css';
import Background from '../components/Background';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Main() {
  return (
    <main>
      <section className={styles.container}>
        <Header />
        <WeatherApi />
      </section>
      <Footer />
      <Background />
    </main>
  );
}

export default Main;
