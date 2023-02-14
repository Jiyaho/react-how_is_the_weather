import styles from "../css/App.module.css";
import Nav from "../components/Nav";
import Background from "../components/Background";
import Footer from "../components/Footer";

function Outfit() {
  return (
    <div>
      <div className={styles.container}>
        <Nav />
        <h1>Today's outfit</h1>
      </div>
      <Footer />
      <Background />
    </div>
  );
}

export default Outfit;
