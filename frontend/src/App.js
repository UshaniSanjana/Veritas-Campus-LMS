import React from 'react';
import { Route, Routes } from "react-router-dom";
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from "./pages/static/Home";
import Navbar from "./components/Navbar";
import WhoWeAre from "./pages/static/WhoWeAre";
import Programmes from "./pages/static/Programmes";
import News from "./pages/static/News";
import ContactUs from "./pages/static/ContactUs";
import SupportForm from './pages/student/SupportForm';
import SupportList from './pages/student/SupportList';
import AdminSupportDashboard from './pages/admin/AdminSupportDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import SupportDesk from './pages/static/SupportDesk';
import SuccessfullyRequest from './pages/static/SuccessfullyRequest';


function App() {  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whoweare" element={<WhoWeAre />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/news" element={<News />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/support-request" element={<SupportForm />} />
        <Route path="/support-list" element={<SupportList />} />
        <Route path="/admin/support" element={<AdminSupportDashboard />} />
        <Route path="/supportdesk" element={<SupportDesk />} />
        <Route path="/successfully-request" element={<SuccessfullyRequest />} />
      </Routes>
      
      <Footer />
    </div>  );
}

export default App;
