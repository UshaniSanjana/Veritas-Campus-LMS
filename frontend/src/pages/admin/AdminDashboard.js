import React from 'react';
import Sidebar from '../../components/Sidebar';
import '../../css/adminDashboard.css';
import adminIcon from '../../assets/admin.png';
import progress from '../../assets/progress.jpg';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />

      <div className="dashboard-main">
        <h3>Quick Overview</h3>
        <div className="dashboard-top">
          <div className="quick-overview">
            <div className="overview-box">Total Courses: 04</div>
            <div className="overview-box">Total Instructors: 50</div>
            <div className="overview-box">Total Students: 1000</div>
            <div className="overview-box">Total Exams: 60</div>
            <div className="overview-box">Total Quizzes: 100</div>
            <div className="overview-box">Total Certificates: 60</div>
          </div>
          <div className="admin-profile">
            <img src={adminIcon} alt="Admin" className="admin-icon" />
            <p className="admin-label">Admin</p>
          </div>
        </div>

        {/* Popular + Progress in single row */}
        <div className="popular-progress-row">
          <div className="popular-section">
            <h3>Most Popular</h3>
            <ul>
              <li>900 Users </li><p>Diploma in Human Resource Management</p>
              <li>500 Users </li><p>Diploma in Business Administration</p>
              <li>400 Users </li><p>Diploma in English</p>
              <li>100 Users </li><p>Diploma in Internal Sales & Marketing</p>
            </ul>
          </div>

          <div className="course-progress">
            <h3>Course Progress</h3>
            <img src={progress} alt="progress" className="progress" />
          </div>
        </div>

        <div className="recent-activities">
          <h3>Recent Activities</h3>
          <ul>
            <li>Student completed all quizzes in Diploma in English</li>
            <li>New assignment uploaded in Business Administration</li>
            <li>Live session scheduled for HR Management</li>
            <li>Marketing diploma updated with new modules</li>
            <li>Feedback submitted by 30 users</li>
            <li>Admin published announcement for all users</li>
            <li>Top-performing student this week</li>
            <li>Deadline reminder: Internal Sales quiz closes in 2 days</li>
            <li>Certificate issued to 10 students in past 24 hours</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
