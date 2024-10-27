import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "../src/Pages/Main";
import Project from "../src/Pages/Project";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
