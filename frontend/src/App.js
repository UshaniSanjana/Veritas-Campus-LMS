import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import InstructorNavbar from "./components/instructorNavbar";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Button from "./components/Button";
import Footer from "./components/Footer";

// Static Pages
import Home from "./pages/static/Home";
import WhoWeAre from "./pages/static/WhoWeAre";
import Programmes from "./pages/static/Programmes";
import News from "./pages/static/News";
import ContactUs from "./pages/static/ContactUs";
import SupportDesk from "./pages/static/SupportDesk";
import SuccessfullyRequest from "./pages/static/SuccessfullyRequest";

// Auth Pages
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Courses from "./pages/admin/CoursesPage";
import CourseDetails from "./pages/admin/CourseDetails";
import EditCourse from "./pages/admin/EditCourse";
import AddCourse from "./pages/admin/AddCourse";
import AdminSupportDashboard from "./pages/admin/AdminSupportDashboard";
import SingleViewSupport from "./pages/admin/SingleViewSupport";
import AdminReportPage from "./pages/admin/AdminReportPage";
import AdminSupport from "./pages/admin/AdminSupport";

// Student Pages
import SupportForm from "./pages/student/SupportForm";
import SupportList from "./pages/student/SupportList";
import ModulePage from "./pages/student/ModulePage";

// Instructor Features
import AddAnnouncement from "./components/AddAnnouncement";
import AddedAnnouncement from "./components/AddedAnnouncement";
import UpdateAnnouncement from "./components/UpdateAnnouncement";
import AddQuiz from "./pages/instructor/AddQuiz";
import QuizList from "./pages/instructor/QuizList";
import UpdateQuiz from "./pages/instructor/UpdateQuiz";
import QuizPerformance from "./pages/instructor/QuizPerformance";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import AddAssignment from "./pages/instructor/AddAssignment";
import AddedAssignment from "./pages/instructor/AddedAssignment";
import EditAssignment from "./pages/instructor/EditAssignment";
import StudentRoutes from "./routes/StudentRoutes";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        {/* Authentication */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Static Pagess */}
        <Route path="/" element={<Home />} />
        <Route path="/whoweare" element={<WhoWeAre />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/news" element={<News />} />
        <Route path="/contactus" element={<ContactUs />} />

        <Route path="/addquiz" element={<AddQuiz />} />
        <Route path="/quizlist" element={<QuizList />} />
        <Route path="/updatequiz/:id" element={<UpdateQuiz />} />
        <Route path="/addassignment" element={<AddAssignment />} />
        <Route
          path="/instructor/added-assignment"
          element={<AddedAssignment />}
        />
        <Route
          path="/instructor/edit-assignment/:id"
          element={<EditAssignment />}
        />

        <Route path="/support-request" element={<SupportForm />} />
        <Route path="/support-list" element={<SupportList />} />
        <Route path="/admin/support" element={<AdminSupportDashboard />} />
        <Route path="/supportdesk" element={<SupportDesk />} />
        <Route path="/successfully-request" element={<SuccessfullyRequest />} />
        <Route
          path="/admin/singleViewSupport/:id"
          element={<SingleViewSupport />}
        />
        <Route path="/admin/adminReportPage" element={<AdminReportPage />} />
        <Route path="/admin/courses" element={<Courses />} />
        <Route path="/admin/courses/:id" element={<CourseDetails />} />
        <Route path="/admin/courses/edit/:id" element={<EditCourse />} />
        <Route path="/admin/courses/add" element={<AddCourse />} />
        <Route path="/admin/adminSupport" element={<AdminSupport />} />
        {/* Instructor - Announcement */}
        <Route path="/addannouncement" element={<AddAnnouncement />} />
        <Route path="/addedannouncement" element={<AddedAnnouncement />} />
        <Route
          path="/updateannouncement/:id"
          element={<UpdateAnnouncement />}
        />
        {StudentRoutes()}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
