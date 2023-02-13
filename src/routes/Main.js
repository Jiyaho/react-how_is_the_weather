import WeatherApi from "../components/WeatherApi";
import styles from "../css/App.module.css";
import Background from "../components/Background";
import Header from "../components/Header";

function Main() {
  return (
    <div>
      <div className={styles.container}>
        <Header />
        <WeatherApi />
      </div>
      <Background />
    </div>
  );
}

export default Main;
