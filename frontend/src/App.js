import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import InstructorNavbar from './components/instructorNavbar';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Button from './components/Button';
import Footer from './components/Footer';

// Static Pages
import Home from './pages/static/Home';
import WhoWeAre from './pages/static/WhoWeAre';
import Programmes from './pages/static/Programmes';
import News from './pages/static/News';
import ContactUs from './pages/static/ContactUs';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import Courses from './pages/admin/CoursesPage';
import CourseDetails from './pages/admin/CourseDetails';
import EditCourse from './pages/admin/EditCourse';
import AddCourse from './pages/admin/AddCourse';

// Instructor Features
import AddAnnouncement from './components/AddAnnouncement';
import AddedAnnouncement from './components/AddedAnnouncement';
import UpdateAnnouncement from './components/UpdateAnnouncement';
import AddQuiz from './pages/instructor/AddQuiz';
import QuizList from './pages/instructor/QuizList';
import UpdateQuiz from './pages/instructor/UpdateQuiz';
import QuizPerformance from './pages/instructor/QuizPerformance';

function App() {
  const [courses, setCourses] = useState([
  { title: 'English Basics', instructor: 'John Doe', description: 'Learn English from scratch.' },
  { title: 'Marketing 101', instructor: 'Jane Smith', description: 'Introduction to Marketing principles.' },
]);

  

  return (
    <div>
      <Navbar />

      <Routes>
        {/* Static Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/whoweare" element={<WhoWeAre />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/news" element={<News />} />
        <Route path="/contactus" element={<ContactUs />} />

        {/* Announcements */}
        <Route path="/addannouncement" element={<AddAnnouncement />} />
        <Route path="/addedannouncement" element={<AddedAnnouncement />} />
        <Route path="/updateannouncement/:id" element={<UpdateAnnouncement />} />

        {/* Quizzes */}
        <Route path="/addquiz" element={<AddQuiz />} />
        <Route path="/quizlist" element={<QuizList />} />
        <Route path="/updatequiz/:id" element={<UpdateQuiz />} />
        <Route path="/performance/:id" element={<QuizPerformance />} />

        {/* Admin Pages */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/courses" element={<Courses courses={courses} setCourses={setCourses} />} />
        <Route path="/admin/courses/:courseName" element={<CourseDetails courses={courses} />} />
        <Route path="/admin/courses/edit/:category" element={<EditCourse courses={courses} setCourses={setCourses} />} />
        <Route path="/admin/courses/add" element={<AddCourse courses={courses} setCourses={setCourses} />} />
      </Routes>

      <Button />
      <Footer />
    </div>
  );
}

export default App;
