import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../Components/Header";
import Home from "../Pages/Home";
import Footer from "../Components/Footer";

export default function   AppRoutes() { 
  return (
    <Router>
      <div className="overflow-y-hidden">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
