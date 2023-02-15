import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../css/App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHashtag,
  faDroplet,
  faNoteSticky,
  faTemperatureHalf,
  faWind,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";

function WeatherApi() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState();
  const [weathers, setWeathers] = useState();
  const [icons, setIcons] = useState();
  const apiKey = process.env.REACT_APP_API_KEY;

  function handleGeoSucc(position) {
    console.log("포지션: " + position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = { latitude, longitude };
    setCoords(coordsObj);
    getWeather(latitude, longitude);
  }

  function handleGeoErr(err) {
    console.log("Geolocation is error! " + err);
    setError(err);
  }

  function requestCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
  }

  const getWeather = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = response.data;
      console.log(data);
      setWeathers(data);
      setIcons(data.weather[0].icon);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  function windSpeed() {
    if (weathers.wind.speed < 4) {
      return "약한 바람";
    } else if (3 < weathers.wind.speed < 9) {
      return "약간 강한 바람";
    } else if (8 < weathers.wind.speed < 14) {
      return "강한 바람";
    } else if (13 < weathers.wind.speed) {
      return "매우 강한 바람";
    }
  }

  //날씨 상태에 따른 메세지 출력
  //#. 풍속 기준 (4미만, 4~8: 약간강, 9~13: 강, 14이상: 매우강
  const stateMessageWind = () => {
    const windSpd = weathers.wind.speed;
    if (windSpd < 4) {
      return "바람은 잔잔하고 🍃";
    } else if (3 < windSpd < 9) {
      return "약간 바람이 불고 🍃";
    } else if (8 < windSpd < 14) {
      return "바람이 강하게 불고 💨";
    } else if (windSpd > 13) {
      return "바람이 미친듯이 불고 🌪️";
    }
  };
  //#. 최저 기온 기준 (-10도 이하, 영하7~영하1도, 0~5도...)
  const stateMessageTemp = () => {
    const temp = weathers.main.temp;
    const tempMax = weathers.main.temp_max;
    if (temp < -9) {
      return "너어어무 추워... 롱패딩 입는게 좋을 것 같아.";
    } else if (-10 < temp && temp < -5) {
      return "추워.. 롱패딩도 Okay, 최소 숏패딩이라도 입어!";
    } else if (-4 < temp && temp < 1) {
      return "꽤 쌀쌀해, 숏패딩이나 두터운 점퍼 추천해.";
    } else if (0 < temp < 7) {
      return "약간 쌀쌀해. 어쩌구저쩌구 저쩌구하니까.!!";
    } else if (6 < temp < 11) {
      return "아직은 쌀쌀한 날씨야, 아침 저녁으로는 추우니 옷을 잘 챙기도록 해.";
    } else if (10 < temp < 19) {
      return "아침, 저녁에는 선선하니 자켓이나 가디건을 챙겨.";
    } else if (tempMax > 28) {
      return "최고 기온이 30도 안팍이야 더워ㅠㅠ";
    } else if (tempMax > 29) {
      return "최고 기온이 30도 이상이야 너무 더워!!";
    }
  };

  const stateMessageRainSnow = () => {
    if (weathers.rain) {
      return "☔️ 비온다!";
    } else if (weathers.snow) {
      return "❄️ 눈온다!";
    } else if (weathers.rain && weathers.snow) {
      return "🌧️ 눈비 온다!";
    }
  };

  useEffect(() => {
    requestCoords();
  }, []);

  if (error) return <div>Error...</div>;
  if (loading)
    return (
      <div
        style={{
          textAlign: "center",
          fontSize: "2.5em",
          color: "white",
          margin: "20px",
        }}
      >
        Loading...
      </div>
    );

  return (
    <div className={styles.apiContainer}>
      <div className={styles.weatherDetailWrap1}>
        <ul>
          <FontAwesomeIcon
            icon={faLocationCrosshairs}
            className={styles.i_location}
          />
          <li className={styles.city}>{weathers.name}</li>
          <li className={styles.temp}>{Math.round(weathers.main.temp)}℃</li>
          <li className={styles.feelsLike}>
            (체감온도 {Math.round(weathers.main.feels_like)}℃)
          </li>
        </ul>
        <div className={styles.weatherIconDiv}>
          <img
            src={`https://jiyaho.github.io/react-how_is_the_weather/assets/icons/${weathers.weather[0].icon}.svg`}
            // src={`/assets/icons/${weathers.weather[0].icon}.svg`}
            alt="iconImg"
            className={styles.weatherIcons}
          />
        </div>
      </div>
      <div className={styles.stateMessageWrap}>
        <FontAwesomeIcon icon={faNoteSticky} className={styles.i_message} />
        <ul>
          <li className={styles.stateMessageRainSnow}>
            {stateMessageRainSnow()}
          </li>
          <li className={styles.stateMessageTemp}>
            '{weathers.name}'의 현재 기온은,{" "}
            <b>{Math.round(weathers.main.temp)}℃</b>
          </li>
          <li className={styles.stateMessageWind}>{stateMessageWind()}</li>
          <li className={styles.stateMessageTemp}>{stateMessageTemp()}</li>
        </ul>
      </div>

      <div className={styles.weatherDetailContainer}>
        <div className={styles.weatherDetailWrap2}>
          <ul>
            <li className={styles.desc}>
              <FontAwesomeIcon icon={faHashtag} className={styles.i_hashtag} />
              {weathers.weather[0].description}
            </li>
            <li className={styles.tempMinMax}>
              <FontAwesomeIcon
                icon={faTemperatureHalf}
                className={styles.i_temp}
              />
              <span>
                최저{" "}
                <b style={{ color: "blue" }}>
                  {Math.round(weathers.main.temp_min)}℃
                </b>
              </span>
              <span>
                최고{" "}
                <b style={{ color: "red" }}>
                  {Math.round(weathers.main.temp_max)}℃
                </b>
              </span>
            </li>
            <li className={styles.windSpeed}>
              <FontAwesomeIcon icon={faWind} className={styles.i_wind} />
              {windSpeed()}
              <br /> {weathers.wind.speed}m/s
            </li>
            <li className={styles.humidity}>
              <FontAwesomeIcon icon={faDroplet} className={styles.i_humidity} />
              {weathers.main.humidity}%
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WeatherApi;
