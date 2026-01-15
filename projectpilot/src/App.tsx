import { BrowserRouter, NavLink, Route, Routes } from "react-router";
import ProjectPage from "./project/ProjectPage";
import HomePage from "./home/HomePage";
import ProjectDetail from "./project/ProjectDetail";
//import ProjectDetail from "./project/ProjectDetail";

function App() {
  return (
    <BrowserRouter>
      <header className="sticky">
        <span className="logo">
          <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
        </span>
        <NavLink to="/" className="button rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to="/projects" className="button rounded">
          <span className="icon-home"></span>
          Projects
        </NavLink>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
