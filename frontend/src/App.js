import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddCourse from "./pages/AddCourse";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add-course" element={<AddCourse />} />
      </Routes>
    </Router>
  );
}

export default App;
