import ApiWeatherLive from "../components/ApiWeather/ApiWeatherLive";
import ApiWeatherFcst from "../components/ApiWeather/ApiWeatherFcst";
import WeatherApi from "../components/WeatherApi";
import ApiWeatherShortFcst from "../components/ApiWeather/ApiWeatherShortFcst";
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
      {/* <ApiWeatherLive />
      <ApiWeatherFcst /> */}
      {/* <ApiWeatherShortFcst /> */}
      <Background />
    </div>
  );
}

export default Main;
