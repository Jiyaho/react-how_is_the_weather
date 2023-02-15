import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./routes/Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/react-how_is_the_weather" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
