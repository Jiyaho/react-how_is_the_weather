import axios from "axios";
import { useState, useEffect } from "react";
// import "../App.css";

function ApiWeatherLive() {
  const [weathers, setWeathers] = useState([]);
  const [error, setError] = useState(null);
  const [dataTime, setDataTime] = useState("");
  const [dataDate, setDataDate] = useState("");
  const ApiName = "getUltraSrtNcst"; //초단기실황
  // const 단기예보 = "getVilageFcst";
  // const 초단기예보 = "getUltraSrtFcst"; //baseTime부터 6시간 예보
  const URL = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/${ApiName}?serviceKey=`;
  const API_KEY = process.env.REACT_APP_KOR_WEATHER_API_KEY;
  const newDate = new Date();
  const numOfRows = "8"; //시간당 측정 obj데이터 10개 * 최대 6시간 예보 = 60
  const baseDate = getNewDate(newDate);
  const baseTime = getNewTime(newDate);
  const parameter = `&numOfRows=${numOfRows}&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=55&ny=127`;
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  let objYear = dataDate.substring(0, 4);
  let objMonth = dataDate.substring(4, 6);
  let objDay = dataDate.substring(6, 8);
  let objDate = objYear + "-" + objMonth + "-" + objDay; //yyyy-mm-dd
  let objHour = dataTime.substring(0, 2);
  let objMinute = dataTime.substring(2, 4);
  let objTime = objHour + ":" + objMinute; //hh:mm
  let dayOfWeek = week[new Date(objDate).getDay()]; //요일 구하기

  function getNewDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month >= 10 ? month : "0" + month; //month 두자리로 출력
    day = day >= 10 ? day : "0" + day; //day 두자리로 출력
    return year + month + day; //yyyymmdd
  }

  function getNewTime(time) {
    let hour = time.getHours() - 1; //초단기예보가 1시간 단위로 측정됨
    let minute = time.getMinutes();
    hour = hour >= 10 ? hour : "0" + hour; //hour 두자리로 출력
    minute = minute >= 10 ? minute : "0" + minute; //minute 두자리로 출력
    return hour + "" + minute; //hhmm
  }

  const fetchWeathers = async () => {
    try {
      setError(null);
      setWeathers([]);
      const response = await axios.get(URL + API_KEY + parameter);
      const data = response.data.response.body.items.item;
      console.log(data);
      setWeathers(data);
      setDataTime(data[0].baseTime);
      setDataDate(data[0].baseDate);
    } catch (e) {
      setError(e);
      console.log(e);
    }
  };

  useEffect(() => {
    fetchWeathers();
  }, []);

  if (error) return <div>Error...</div>;

  return (
    <div>
      <h3>
        {objDate} ({dayOfWeek}) {objTime} 기준
      </h3>
      {weathers.map((obj, idx) => {
        //=====1시간 기온=====
        if (obj.category === "T1H") {
          return (
            <div key={idx} className="live__tempObj">
              🌡️{obj.obsrValue}℃
            </div>
          );
        }
        //=====강수 형태=====
        if (obj.category === "PTY") {
          if ((obj.category === "PTY") === 1) {
            return (
              <div key={idx} className="live__ptyObj">
                ☔️ 비
              </div>
            );
          } else if ((obj.category === "PTY") === 2) {
            return (
              <div key={idx} className="live__ptyObj">
                🌨️ 눈/비
              </div>
            );
          } else if ((obj.category === "PTY") === 3) {
            return (
              <div key={idx} className="live__ptyObj">
                🌨️ 눈
              </div>
            );
          } else if ((obj.category === "PTY") === 5) {
            return (
              <div key={idx} className="live__ptyObj">
                💧 빗방울
              </div>
            );
          } else if ((obj.category === "PTY") === 6) {
            return (
              <div key={idx} className="live__ptyObj">
                💧❄️ 빗방울/눈날림
              </div>
            );
          } else if ((obj.category === "PTY") === 7) {
            return (
              <div key={idx} className="live__ptyObj">
                ❄️ 눈날림
              </div>
            );
          }
        }
        //=====풍속 (4미만:약함, 4~8:약간강, 9~13:강, 14이상:매우강)=====
        if (obj.category === "WSD") {
          if (-1 < (obj.category === "WSD") < 4) {
            return (
              <div key={idx} className="live__windSpeedObj">
                🍃약한 바람({obj.obsrValue}m/s)<hr></hr>
              </div>
            );
          } else if (3 < (obj.category === "WSD") < 9) {
            return (
              <div key={idx} className="live__windSpeedObj">
                🍃약간 강한 바람({obj.obsrValue}m/s)
              </div>
            );
          } else if (8 < (obj.category === "WSD") < 14) {
            return (
              <div key={idx} className="live__windSpeedObj">
                💨강한 바람({obj.obsrValue}m/s)
              </div>
            );
          } else if (13 < (obj.category === "WSD")) {
            return (
              <div key={idx} className="live__windSpeedObj">
                🌪️매우 강한 바람({obj.obsrValue}m/s)
              </div>
            );
          }
        }
      })}
    </div>
  );
}

export default ApiWeatherLive;
