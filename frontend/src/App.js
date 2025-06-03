import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Home from "./pages/static/Home";
import Navbar from "./components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
