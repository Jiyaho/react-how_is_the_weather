import styles from "../css/App.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

//배경 동영상 겹치는 시간대 동영상 많은 것들은 랜덤 표출시키기

function Background() {
  const newDate = new Date();
  const getHour = getNewTime(newDate);
  const [coords, setCoords] = useState();
  const [weathers, setWeathers] = useState();
  const apiKey = process.env.REACT_APP_API_KEY;
  const videoRef = useRef();
  const videoSrc = "/assets/videos/";

  //동영상 재생 속도 조절
  const setPlayBackRate = () => {
    videoRef.current.playbackRate = 0.6;
  };

  function handleGeoSucc(position) {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = { latitude, longitude };
    setCoords(coordsObj);
    getWeather(latitude, longitude);
  }

  function handleGeoErr(err) {
    console.log("Geolocation is error! " + err);
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
    } catch (e) {
      console.log(e);
    }
  };

  function getNewTime(time) {
    let hour = time.getHours(); //초단기예보가 1시간 단위로 측정됨
    return hour; //
  }

  function bgChangeByHour() {
    if (getHour > -1 && getHour < 6) {
      return videoSrc + "starry_night02.mp4";
    } else if (getHour > 5 && getHour < 19) {
      return videoSrc + "clear_sky.mp4";
    } else if (getHour > 18 && getHour < 21) {
      return videoSrc + "sunset.mp4";
    } else if (getHour > 20 && getHour < 24) {
      return videoSrc + "starry_night01.mp4";
    }
  }

  function bgChangeByClimate() {
    if (weathers?.rain) {
      return videoSrc + "rain.mp4";
    } else if (weathers?.snow || (weathers?.rain && weathers?.snow)) {
      return videoSrc + "snow.mp4";
    } else return bgChangeByHour();
  }

  useEffect(() => {
    requestCoords();
  }, []);

  return (
    <div className={styles.jb_box}>
      <video
        muted
        autoPlay
        loop
        ref={videoRef}
        onCanPlay={() => setPlayBackRate()}
      >
        <source src={bgChangeByClimate()} type="video/mp4" />
        <strong>Your browser does not support the video tag.</strong>
      </video>
    </div>
  );
}

export default Background;
