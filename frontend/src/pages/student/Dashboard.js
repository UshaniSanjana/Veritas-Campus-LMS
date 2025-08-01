import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useGetNotifications } from "../../Services/notificationService"; // Import API hook
import "./Dashboard.css";

// Static list for demonstration (can be fetched dynamically in a real app)
const dashboardData = {
  recentlyAccessedPrograms: [
    {
      id: 1,
      title: "Diploma in Business Administration",
      description:
        "Learn core business concepts including management, marketing, and finance.",
      lastAccessed: "2 days ago",
      progress: 65,
    },
    {
      id: 2,
      title: "Diploma in Human Resource Management",
      description:
        "Master HR skills such as recruitment, training, and performance management.",
      lastAccessed: "1 day ago",
      progress: 40,
    },
    {
      id: 3,
      title: "Diploma in English",
      description:
        "Improve your English language skills for academic and professional use.",
      lastAccessed: "5 hours ago",
      progress: 85,
    },
    {
      id: 4,
      title: "Diploma in Sales & Marketing",
      description:
        "Develop strategies for customer engagement and successful selling.",
      lastAccessed: "3 days ago",
      progress: 50,
    },
  ],
  privateFiles: [
    { name: "1 (1).c", date: "2023-10-15", size: "24KB" },
    { name: "1.c", date: "2023-10-10", size: "18KB" },
    { name: "2.c", date: "2023-09-28", size: "32KB" },
  ],
};

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize navigate

  // Fetch notifications from API using a hook
  const { data: notificationsData, loading, error } = useGetNotifications();

  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]); // Store events in state
  const [event, setEvent] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [selectedFile, setSelectedFile] = useState(null); // File state
  const [courses, setCourses] = useState([]); // State to store enrolled courses
  const studentId = localStorage.getItem("studentId");

  // Fetch Enrolled Courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/student/enrolled/${studentId}`
        );
        setCourses(response.data);
      } catch (err) {
        console.error("Error fetching enrolled courses", err);
      }
    };
    if (studentId) {
      fetchCourses();
    }
  }, [studentId]);

  // Event-related functions
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  const handleDateClick = (date) => setDate(date);
  const handleAddEvent = () => {
    if (event.trim()) {
      const newEvent = {
        id: Date.now(),
        date: date.toDateString(),
        text: event,
        completed: false,
      };
      setEvents([...events, newEvent]);
      setEvent("");
    }
  };
  const handleDeleteEvent = (id) => setEvents(events.filter((event) => event.id !== id));
  const handleToggleComplete = (id) => {
    setEvents(events.map((event) =>
      event.id === id ? { ...event, completed: !event.completed } : event
    ));
  };

  // Handle continue button click
  const handleContinue = () => {
    navigate("/student/programme"); // Navigate to the given path
  };

  // Handle navigation to Enrolled Courses page
  const handleEnrolledCourses = () => {
    navigate("/student/enrolledcourses"); // Navigate to the Enrolled Courses page
  };

  return (
    <div className="dashboard">
      <div className="main-content">
        {/* Left Content Section */}
        <div className="left-content">
          {/* Recently Accessed Programs */}
          <div className="rectangle-2142">
            <div className="rectangle-content">
              <h2 className="section-title">Recently accessed programs</h2>
              <div className="program-grid">
                {dashboardData.recentlyAccessedPrograms.map((program) => (
                  <div className="program-card" key={`program-${program.id}`}>
                    <h3 className="program-name">{program.title}</h3>
                    <p className="program-desc">{program.description}</p>
                    <div className="program-meta">
                      <span>Last accessed: {program.lastAccessed}</span>
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${program.progress}%` }}
                          ></div>
                        </div>
                        <span>{program.progress}% complete</span>
                      </div>
                    </div>
                    <button className="program-button" onClick={handleContinue}>
                      Continue
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enrolled Courses Section */}
          <div className="rectangle-2143">
            <div className="rectangle-content">
              <h2 className="section-title">Enrolled Courses</h2>
              {courses.length > 0 ? (
                <div className="course-list">
                  {courses.map((course, index) => (
                    <div 
                      key={index} 
                      className="course-card" 
                      onClick={handleEnrolledCourses} // Navigate when clicked
                    >
                      <div className="course-name">{course.title}</div>
                      <div className="course-instructor">Instructor: {course.instructor}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No enrolled courses found.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="sidebar">
          {/* Notifications Section */}
          <div className="sidebar-section1">
            <h3>Notifications</h3>
            {loading && <p>Loading notifications...</p>}
            {error && <p>Error loading notifications</p>}
            <ul className="notification-list">
              {notificationsData?.data?.map((notification) => (
                <li key={notification.id} className="notification-item">
                  {notification.message}
                </li>
              ))}
            </ul>
          </div>

          {/* Calendar Section */}
          <div className="sidebar-section calendar">
            <h3>Calendar</h3>
            <Calendar
              onChange={handleDateClick}
              value={date}
              className="react-calendar"
            />
            <div className="upcoming-events">
              <h3>Upcoming Events</h3>
              <div className="event-input">
                <input
                  type="text"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  placeholder="Add new event"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddEvent()}
                />
                <button onClick={handleAddEvent}>Add</button>
              </div>
              {events.length > 0 ? (
                <ul className="events-list">
                  {events.map((ev) => (
                    <li key={ev.id} className={ev.completed ? "completed" : ""}>
                      <input
                        type="checkbox"
                        checked={ev.completed}
                        onChange={() => handleToggleComplete(ev.id)}
                      />
                      <div className="event-details">
                        <span className="event-date">{ev.date}</span>
                        <span className="event-text">{ev.text}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(ev.id)}
                        className="delete-event"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-events">No events scheduled</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
