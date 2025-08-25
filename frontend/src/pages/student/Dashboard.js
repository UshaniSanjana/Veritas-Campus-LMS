import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useGetNotifications } from "../../Services/notificationService"; // Import API hook
import bbImage from "../../assets/bb.png"; // bb image for sidebar
import "./Dashboard.css";

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

  const { data: notificationsData, loading, error } = useGetNotifications(); // Fetch notifications

  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]); // Store events in state
  const [event, setEvent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // File state
  const [enrolledModules, setEnrolledModules] = useState([]); // State to store enrolled courses
  const studentId = localStorage.getItem("studentId");

  // Fetch enrolled courses
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(
          `https://veritas-campus-lms-production.up.railway.app/api/student/enrolled/${studentId}`
        );
        setEnrolledModules(response.data);
      } catch (err) {
        console.error("Error fetching enrolled modules", err);
      }
    };

    if (studentId) fetchModules();
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

  const handleDeleteEvent = (id) =>
    setEvents(events.filter((event) => event.id !== id));
  const handleToggleComplete = (id) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, completed: !event.completed } : event
      )
    );
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "https://veritas-campus-lms-production.up.railway.app/student/upload-file", // Adjust URL as per your backend
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("File uploaded successfully");
      console.log(response.data); // Log the file info returned by the backend
      setSelectedFile(null); // Clear the selected file
    } catch (error) {
      console.error("Error uploading file", error);
      alert("Error uploading file");
    }
  };

  // Handle file download
  const handleFileDownload = (fileUrl) => {
    window.open(
      `https://veritas-campus-lms-production.up.railway.app${fileUrl}`,
      "_blank"
    );
  };

  // Handle navigation to Enrolled Courses page
  const handleEnrolledCourses = () => {
    navigate("/student/enrolledcourses"); // Navigate to the Enrolled Courses page
  };

  // Handle navigation to Programme page when clicking on Recently Accessed Program
  const handleRecentlyAccessedProgram = () => {
    navigate("/student/programme"); // Navigate to the Programme page
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
                  <div
                    className="program-card"
                    key={`program-${program.id}`}
                    onClick={handleRecentlyAccessedProgram} // Navigate to programme page
                  >
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
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enrolled Courses Section */}
          <div className="rectangle-2143">
            <div className="rectangle-content">
              <h2 className="section-title">Enrolled Modules</h2>
              {enrolledModules.length > 0 ? (
                <div className="course-grid">
                  {enrolledModules.map((module, index) => (
                    <div
                      key={index}
                      className="course-card"
                      onClick={() => {
                        const courseId = module.course?._id;
                        const moduleId = module._id;
                        navigate(
                          `/student/courses/${courseId}/modules/${moduleId}/${studentId}`
                        );
                      }}
                    >
                      <h3 className="course-title">{module.title}</h3>
                      <p className="course-instructor">
                        Course: {module.course?.title || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No enrolled modules found.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="sidebar">
          {/* Notifications Section */}
          <div className="sidebar-section1">
            <h3>Timeline</h3>
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

          {/* Private Files Section */}
          <div className="sidebar-section2">
            <h3>Private files</h3>
            <ul className="file-list">
              {dashboardData.privateFiles.map((file, index) => (
                <li key={`file-${index}`}>
                  <div className="file-info">
                    <span className="file-name">{file.name}</span>
                    <span className="file-meta">
                      {file.date} • {file.size}
                    </span>
                  </div>
                  <button
                    className="file-download"
                    onClick={() => handleFileDownload(file.fileUrl)}
                  >
                    Download
                  </button>
                </li>
              ))}
            </ul>

            {/* File Upload */}
            <h4>Upload a File</h4>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload File</button>
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
