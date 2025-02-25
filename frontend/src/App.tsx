import "leaflet/dist/leaflet.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExplorePage from "./pages/ExplorePage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExplorePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
