import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "../src/Components/Main"; // 경로 수정
import Project from "../src/Components/Project"; // 경로 수정

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
