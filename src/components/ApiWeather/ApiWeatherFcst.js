import axios from "axios";
import { useState, useEffect } from "react";
import "../../App.css";

function ApiWeatherFcst() {
  const [weathers, setWeathers] = useState([]);
  const [error, setError] = useState(null);
  const ApiName = "getVilageFcst"; //단기예보: baseTime 02시부터 조회 가능 (당일 조회 obj.length: 254)
  const URL = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/${ApiName}?serviceKey=`;
  const API_KEY = process.env.REACT_APP_KOR_WEATHER_API_KEY;
  const newDate = new Date();
  const numOfRows = "254"; //시간당 측정 obj데이터 12개 * 21시간 + 2개(최저,최고기온) = 254
  const baseDate = getNewDate(newDate);
  // const baseDate = "0200";
  const baseTime = getNewTime(newDate);
  const parameter = `&numOfRows=${numOfRows}&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=55&ny=127`;
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  function getNewDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month >= 10 ? month : "0" + month; //month 두자리로 출력
    day = day >= 10 ? day : "0" + day; //day 두자리로 출력
    return year + month + day; //yyyymmdd
  }

  function getNewTime(time) {
    let hour = time.getHours() - 2; //초단기예보가 1시간 단위로 측정됨
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
      const ascendingData = data.sort(function (a, b) {
        let ascDate = a.fcstDate - b.fcstDate;
        let ascTime = a.fcstTime - b.fcstTime;
        return ascDate || ascTime;
      }); //측정날짜와 측정시간 기준 오름차순 정렬
      console.log(ascendingData);
      setWeathers(ascendingData);
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
    <div className="weatherWrap">
      {weathers.map((obj, idx) => {
        //=====하늘 상태 (0-5:맑음, 6-8:구름많음, 9-10:흐림)=====
        if (obj.category === "SKY") {
          let objYear = obj.fcstDate.substring(0, 4);
          let objMonth = obj.fcstDate.substring(4, 6);
          let objDay = obj.fcstDate.substring(6, 8);
          let objDate = objYear + "-" + objMonth + "-" + objDay; //yyyy-mm-dd
          let objHour = obj.fcstTime.substring(0, 2);
          let objMinute = obj.fcstTime.substring(2, 4);
          let objTime = objHour + ":" + objMinute; //hh:mm
          let dayOfWeek = week[new Date(objDate).getDay()]; //요일 구하기
          if (-1 < (obj.category === "SKY") < 6) {
            return (
              <div key={idx} className="skyObj">
                <span>
                  {objDate} ({dayOfWeek}) {objTime}
                </span>
                <br />
                <span>☀️ 맑음</span>
              </div>
            );
          } else if (5 < (obj.category === "SKY") < 9) {
            return (
              <div key={idx} className="skyObj">
                <span>
                  {objDate} ({dayOfWeek}) {objTime}
                </span>
                <br />
                <span>🌥️ 구름 많음</span>
              </div>
            );
          } else if (8 < (obj.category === "SKY")) {
            return (
              <div key={idx} className="skyObj">
                <span>
                  {objDate} ({dayOfWeek}) {objTime}
                </span>
                <br />
                <span>☁️ 흐림</span>
              </div>
            );
          }
        }

        //=====1시간 기온=====
        if (obj.category === "T1H") {
          return (
            <div key={idx} className="tempObj">
              🌡️{obj.fcstValue}℃
            </div>
          );
        }

        //=====습도=====
        if (obj.category === "REH") {
          return (
            <div key={idx} className="humidityObj">
              💧{obj.fcstValue}%
            </div>
          );
        }

        //=====강수 형태=====
        if (obj.category === "PTY") {
          if ((obj.category === "PTY") === 1) {
            return (
              <div key={idx} className="ptyObj">
                ☔️ 비
              </div>
            );
          } else if ((obj.category === "PTY") === 2) {
            return (
              <div key={idx} className="ptyObj">
                🌨️ 눈/비
              </div>
            );
          } else if ((obj.category === "PTY") === 3) {
            return (
              <div key={idx} className="ptyObj">
                🌨️ 눈
              </div>
            );
          } else if ((obj.category === "PTY") === 5) {
            return (
              <div key={idx} className="ptyObj">
                💧 빗방울
              </div>
            );
          } else if ((obj.category === "PTY") === 6) {
            return (
              <div key={idx} className="ptyObj">
                💧❄️ 빗방울/눈날림
              </div>
            );
          } else if ((obj.category === "PTY") === 7) {
            return (
              <div key={idx} className="ptyObj">
                ❄️ 눈날림
              </div>
            );
          }
        }

        //=====풍속 (4미만:약함, 4~8:약간강, 9~13:강, 14이상:매우강)=====
        if (obj.category === "WSD") {
          if (-1 < (obj.category === "WSD") < 4) {
            return (
              <div key={idx} className="windSpeedObj">
                🍃약한 바람({obj.fcstValue}m/s)<hr></hr>
              </div>
            );
          } else if (3 < (obj.category === "WSD") < 9) {
            return (
              <div key={idx} className="windSpeedObj">
                🍃약간 강한 바람({obj.fcstValue}m/s)
              </div>
            );
          } else if (8 < (obj.category === "WSD") < 14) {
            return (
              <div key={idx} className="windSpeedObj">
                💨강한 바람({obj.fcstValue}m/s)
              </div>
            );
          } else if (13 < (obj.category === "WSD")) {
            return (
              <div key={idx} className="windSpeedObj">
                🌪️매우 강한 바람({obj.fcstValue}m/s)
              </div>
            );
          }
        }
      })}
    </div>
  );
}

export default ApiWeatherFcst;
