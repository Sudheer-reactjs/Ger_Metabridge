import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../Components/Header";
import Home from "../Pages/Home";

export default function   AppRoutes() { 
  return (
    <Router>
      <Header />
      <main>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      </main>
    </Router>
  );
}
