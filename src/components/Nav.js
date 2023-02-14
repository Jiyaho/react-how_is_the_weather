import { Link } from "react-router-dom";
import styles from "../css/App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRainbow, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Nav() {
  const [toggleBtn, setToggleBtn] = useState(false);

  const handleToggleBtn = () => {
    setToggleBtn(!toggleBtn);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_titleLogoWrap}>
        <FontAwesomeIcon icon={faRainbow} className={styles.navbar_svg} />
        <span className={styles.navbar_logo}>
          <Link to={`/react-how_is_the_weather`} className={styles.navLink}>
            날씨어때
          </Link>
        </span>
      </div>
      <ul
        className={!toggleBtn ? styles.navbar_menu : styles.navbar_menuToggle}
      >
        <li>
          <Link
            to={`/react-how_is_the_weather/forecast`}
            className={styles.navLink}
          >
            FORECAST
          </Link>
        </li>
        <li>
          <Link
            to={`/react-how_is_the_weather/outfit`}
            className={styles.navLink}
          >
            OUTFIT
          </Link>
        </li>
      </ul>

      <Link to={`#`}>
        <FontAwesomeIcon
          onClick={handleToggleBtn}
          icon={faBars}
          className={styles.navbar_toggleBtn}
        />
      </Link>
    </div>
  );
}
export default Nav;
