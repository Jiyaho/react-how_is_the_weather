function Icons() {
  return (
    <div className={styles.weatherIconDiv}>
      <img
        src={`https://jiyaho.github.io/react-how_is_the_weather/assets/icons/${weathers.weather[0].icon}.svg`}
        // src={`/assets/icons/${weathers.weather[0].icon}.svg`}
        alt="iconImg"
        className={styles.weatherIcons}
      />
    </div>
  );
}
export default Icons;
