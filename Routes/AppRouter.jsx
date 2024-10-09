import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "../Components/Main";
import Project from "../Components/Project";

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
