import React from 'react';
import { Route, Routes } from "react-router-dom";
<<<<<<< HEAD
//import Button from './components/Button';
=======
>>>>>>> 24f76d267dfbb8ff8e5749aa2d60bf311f7b5f93
import Footer from './components/Footer';
import Home from "./pages/static/Home";
//import Navbar from "./components/Navbar";
import InstructorNavbar from "./components/instructorNavbar";
import WhoWeAre from "./pages/static/WhoWeAre";
import Programmes from "./pages/static/Programmes";
import News from "./pages/static/News";
import ContactUs from "./pages/static/ContactUs";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
<<<<<<< HEAD
import AddAnnouncement from './components/AddAnnouncement';
import AddedAnnouncement from './components/AddedAnnouncement';
import UpdateAnnouncement from './components/UpdateAnnouncement';
=======
import AddQuiz from "./pages/instructor/AddQuiz";
import QuizList from "./pages/instructor/QuizList";
import 'bootstrap-icons/font/bootstrap-icons.css';
import UpdateQuiz from "./pages/instructor/UpdateQuiz";
import QuizPerformance from './pages/instructor/QuizPerformance';

>>>>>>> 24f76d267dfbb8ff8e5749aa2d60bf311f7b5f93

function App() {
  return (
    <div>
      <InstructorNavbar/>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whoweare" element={<WhoWeAre />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/news" element={<News />} />
        <Route path="/contactus" element={<ContactUs />} />
<<<<<<< HEAD
        <Route path="/addannouncement" element={<AddAnnouncement />} />
        <Route path="/addedannouncement" element={<AddedAnnouncement />} />
        <Route path="/updateannouncement/:id" element={<UpdateAnnouncement />} />
      </Routes>
=======
        <Route path="/addquiz" element={<AddQuiz />} />
        <Route path="/quizlist" element={<QuizList />} />
        <Route path="/updatequiz/:id" element={<UpdateQuiz />} />
        <Route path="/performance/:id" element={<QuizPerformance />} />

      </Routes>
      
    
>>>>>>> 24f76d267dfbb8ff8e5749aa2d60bf311f7b5f93
      <Footer />
    </div>
  );
}

export default App;
