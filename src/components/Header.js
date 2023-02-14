import { Link } from "react-router-dom";
import styles from "../css/App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRainbow } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const newDate = new Date();
  const dayOfWeek = week[new Date().getDay()]; //요일 구하기
  const getDate = getNewDate(newDate);
  const getTime = getNewTime(newDate);

  function getNewDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    // month = month >= 10 ? month : "0" + month; //month 두자리로 출력
    // day = day >= 10 ? day : "0" + day; //day 두자리로 출력
    return year + "년 " + month + "월 " + day + "일"; //yyyy년 m월 d일
  }
  function getNewTime(time) {
    let hour = time.getHours();
    let minute = time.getMinutes();
    hour = hour >= 10 ? hour : "0" + hour; //hour 두자리로 출력
    minute = minute >= 10 ? minute : "0" + minute; //minute 두자리로 출력
    return hour + "시 " + minute + "분"; //hh : mm
  }

  return (
    <div className={styles.titleWrap}>
      <Link to={`/`} className={styles.titleLink}>
        <ul>
          <div className={styles.logoWrap}>
            <li>
              <FontAwesomeIcon icon={faRainbow} className={styles.logo} />
            </li>
            <li className={styles.titleKo}>날씨어때</li>
          </div>
          <li className={styles.titleEn}>How's the weather?</li>
        </ul>
      </Link>
      <h3 className={styles.DateTime}>
        {getDate} ({dayOfWeek}) {getTime}
      </h3>
    </div>
  );
}

export default Header;
