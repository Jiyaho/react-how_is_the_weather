import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./routes/Main";
import Forecast from "./routes/Forecast";
import Outfit from "./routes/Outfit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/react-how_is_the_weather" element={<Main />} />
        <Route
          path="/react-how_is_the_weather/forecast"
          element={<Forecast />}
        />
        <Route path="/react-how_is_the_weather/outfit" element={<Outfit />} />
      </Routes>
    </Router>
  );
}

export default App;
