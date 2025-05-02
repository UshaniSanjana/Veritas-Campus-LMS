import React from 'react';
import { Route, Routes } from "react-router-dom";
import Footer from './components/Footer';
import Home from "./pages/static/Home";
import Navbar from "./components/Navbar";
import WhoWeAre from "./pages/static/WhoWeAre";
import Programmes from "./pages/static/Programmes";
import News from "./pages/static/News";
import ContactUs from "./pages/static/ContactUs";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AddQuiz from "./pages/instructor/AddQuiz";
import QuizList from "./pages/instructor/QuizList";
import 'bootstrap-icons/font/bootstrap-icons.css';
import UpdateQuiz from "./pages/instructor/UpdateQuiz";


function App() {
  return (
    <div>
      <Navbar/>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whoweare" element={<WhoWeAre />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/news" element={<News />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/addquiz" element={<AddQuiz />} />
        <Route path="/quizlist" element={<QuizList />} />
        <Route path="/updatequiz/:id" element={<UpdateQuiz />} />
      </Routes>
      
    
      <Footer />
    </div>
  );
}

export default App;
