import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddCourse from "./pages/AddCourse";
import './App.css';
import CoursePage from "./pages/CoursePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add-course" element={<AddCourse />} />
        <Route exact path="/course" element={<CoursePage />} />
      </Routes>
    </Router>
  );
}

export default App;
