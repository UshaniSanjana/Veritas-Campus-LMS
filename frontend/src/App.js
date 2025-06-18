import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Import components and pages
import Footer from './components/Footer';
import Home from './pages/static/Home';
import SignIn from './pages/auth/SignIn';  // Import SignIn page
import SignUp from './pages/auth/SignUp';  // Import SignUp page
import InstructorNavbar from './components/instructorNavbar'; // Instructor Navbar

// Static Pages
import WhoWeAre from './pages/static/WhoWeAre';
import Programmes from './pages/static/Programmes';
import News from './pages/static/News';
import ContactUs from './pages/static/ContactUs';

// Announcement Routes
import AddAnnouncement from './components/AddAnnouncement';
import AddedAnnouncement from './components/AddedAnnouncement';
import UpdateAnnouncement from './components/UpdateAnnouncement';

// Quiz Routes
import AddQuiz from './pages/instructor/AddQuiz';
import QuizList from './pages/instructor/QuizList';
import UpdateQuiz from './pages/instructor/UpdateQuiz';
import QuizPerformance from './pages/instructor/QuizPerformance';

// Student Dashboard
import StudentDashboard from './pages/student/Dashboard'; // Import Student Dashboard

function App() {
  return (
    <div>
      {/* Navbar for Instructor */}
      <InstructorNavbar /> {/* The Instructor Navbar will appear on all pages */}
      <Routes>
        {/* Static Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/whoweare" element={<WhoWeAre />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/news" element={<News />} />
        <Route path="/contactus" element={<ContactUs />} />

        {/* SignUp and SignIn Routes */}
        <Route path="/signup" element={<SignUp />} /> {/* Add SignUp route */}
        <Route path="/signin" element={<SignIn />} />  {/* SignIn route */}

        {/* Announcement Routes */}
        <Route path="/addannouncement" element={<AddAnnouncement />} />
        <Route path="/addedannouncement" element={<AddedAnnouncement />} />
        <Route path="/updateannouncement/:id" element={<UpdateAnnouncement />} />

        {/* Quiz Routes */}
        <Route path="/addquiz" element={<AddQuiz />} />
        <Route path="/quizlist" element={<QuizList />} />
        <Route path="/updatequiz/:id" element={<UpdateQuiz />} />
        <Route path="/performance/:id" element={<QuizPerformance />} />

        {/* Student Dashboard */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Routes>

      {/* Footer that will be displayed on all pages */}
      <Footer />
    </div>
  );
}

export default App;
