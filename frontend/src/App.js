import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CoursePage from "./pages/CoursePage";
import AddCourse from "./pages/AddCourse";
import Payment from "./pages/Payment";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/course" element={<CoursePage />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add-course" element={<AddCourse />} />
        <Route exact path="/upgrade" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
