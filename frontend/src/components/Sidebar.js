import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/sidebar.css'; // Adjust the path as necessary


import { FaTachometerAlt, FaChartBar, FaBook, FaChalkboardTeacher, FaUsers, FaBullhorn, FaCertificate, FaLifeRing, FaCog } from 'react-icons/fa';


const Sidebar = () => {
  return (
    <div className="sidebar">
      <h5 className="logo">Admin Dashboard</h5>
      <ul className="nav-list">
        <li><FaTachometerAlt /> Dashboard</li>
        <li><FaChartBar /> Reports</li>
        <li>
       <NavLink
          to="/admin/courses"
          className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
    <FaBook /> Courses
  </NavLink>
</li>


        <li>
          <FaChalkboardTeacher /> Instructor manage
          <ul>
            <li>Add Instructor</li>
            <li>View all Instructor</li>
          </ul>
        </li>
        <li>
          <FaUsers /> Student manage
          <ul>
            <li>Add Student</li>
            <li>View all Student</li>
          </ul>
        </li>

        <li>
          <NavLink
            to="/admin/announcements"
            className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
          >
          <FaBullhorn /> Announcement
          </NavLink>
        </li>
        
        
        <li><FaCertificate /> Exams & certification</li>
        <li><FaLifeRing /> Support</li>
        <li>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
          >
          <FaCog /> Settings
          </NavLink>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
