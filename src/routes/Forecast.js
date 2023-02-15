import styles from "../css/App.module.css";
import Nav from "../components/Nav";
import Background from "../components/Background";
import Footer from "../components/Footer";
import ApiWeatherFcst from "../components/ApiWeather/ApiWeatherFcst";

function Forecast() {
  return (
    <div>
      <div className={styles.container}>
        <Nav />
        <h1>Forecast</h1>
        <ApiWeatherFcst />
      </div>
      <Footer />
      <Background />
    </div>
  );
}

export default Forecast;
